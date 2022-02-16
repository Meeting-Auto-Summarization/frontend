import { Grid, Box } from "@mui/material";
import { MeetingScripts } from "../components/meeting/meeting-scripts";
import { MeetingVideo } from "../components/meeting/meeting-video";
import { ProgrssInfo } from "../components/meeting/progress-info";
import { AppLayout } from "../components/app-layout";
import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../utils/context/context';
import { io } from "socket.io-client";
import Peer from 'peerjs';

const MeetingProgress = () => {
    const { isLogin } = useContext(UserContext);

    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    if (!isLogin) {
        return null;
    }

    //화상회의 관련
    const socket = io.connect('http://localhost:3001',
        { cors: { origin: 'http://localhost:3001' } });//서버랑 연결
    const peer = new Peer();
    const [peers, setPeers] = useState([]);//peers
    const video = useRef();
    const { userNick } = useContext(UserContext);
    const [messageList, setMessageList] = useState([]);
    const connectToNewUser = (userId, stream, remoteNick) => {//중간에 누군가 들어옴
        const call = peer.call(userId, stream, { metadata: { "receiverNick": remoteNick, "senderNick": userNick } });
        //call객체 생성(dest-id,my-mediaStream)
        //들어온 상대방에게 call요청 보냄
        console.log(call);
        call.on('stream', (userVideoStream) => {
            //새로 들어온 사람이 answer했을 때 stream이벤트 발생함
            setPeers(arr => {
                if (arr.findIndex(v => v.id === userId) < 0)
                    return [...arr, { id: userId, nick: call.metadata.receiverNick, call: call, stream: userVideoStream }];
                else {
                    arr[arr.findIndex(v => v.id === userId)] = { id: userId, nick: call.metadata.receiverNick, call: call, stream: userVideoStream };
                    return [...arr];
                }
            });
        });
        call.on('close', () => {
            //상대가 나가서 close 이벤트 발생
            console.log("close");
        });
    }
    const disconnectUser = () => {
        console.log("방나감");
    }
    useEffect(() => {
        socket.on("msg", (userNick, msg) => {
            //stt메시지 받음
            setMessageList(arr => [...arr, { isCheck: false, nick: userNick, message: msg }])
            console.log(msg);
        });
        // peer서버와 정상적으로 통신이 된 경우 open event 발생
        peer.on('open', (id) => {//userid가 peer로 인해 생성됨
            console.log("open");
            socket.emit('join-room', '1234', id, userNick);
            console.log(userNick);
        });
        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            })
            /* socket.on("stopStream", () => {
                 console.log("stop_stream");
                 stream.getTracks().forEach(function (track) {
                     track.stop();
                 });
             })*/
            video.current.srcObject = stream;//내 비디오 넣어줌
            peer.on('call', (call) => {
                //중간에 입장했을때 방에 있던 사람에게 call요청 받았을 때
                call.answer(stream);//call요청 수락

                // answer가 발생하면 stream이라는 이벤트를 통해 다른 유저의 stream 받아옴
                call.on('stream', (userVideoStream) => {
                    //중간에 입장하여 상대방 받아옴
                    //상대방의 stream을 내 브라우저에 추가 
                    setPeers(arr => {
                        if (arr.findIndex(v => v.id === call.peer) < 0)
                            return [...arr, { id: call.peer, nick: call.metadata.senderNick, call: call, stream: userVideoStream }];
                        else {
                            arr[arr.findIndex(v => v.id === call.peer)] = { id: call.peer, nick: call.metadata.receiverNick, call: call, stream: userVideoStream };
                            return [...arr];
                        }
                    });
                });
            });

            //내가 있는 방에 새로운 유저 접속하면 server가 user-connected 입장한 userid와 함께 emit함
            socket.on('user-connected', (userId, remoteNick) => {
                //새로운 user 연결하는 작업
                connectToNewUser(userId, stream, remoteNick);
            });
        });
        //disconnect 받으면 -> call object를 peers에서 가져와 해당 call close()함
        socket.on('user-disconnected', (userId) => {
            console.log("user-disconnected ");
            setPeers(arr => {
                return (arr.filter((e) => {
                    if (e.id === userId) {
                        e.call.close();
                        return false;
                    } else return true;
                }))
            });
        });
    }, [])
    //장치 관련
    const handleCameraChange = (deviceId) => {
        const camerasConstraint = {
            audio: true,
            video: { deviceId: { exact: deviceId } }
        };
        navigator.mediaDevices.getUserMedia(camerasConstraint).then((stream) => {
            video.current.srcObject = stream;
        });
    }
    const handleAudioChange = (deviceId) => {
        const audioConstraint = {
            audio: { deviceId: { exact: deviceId } },
            video: true
        };
        navigator.mediaDevices.getUserMedia(audioConstraint).then((stream) => {
            video.current.srcObject = stream;
            const audioTrack = stream.getAudioTracks()[0];
            /*this.call.peerConnection.getSenders()[0].replaceTrack()
            const audioSender = this.call.peerConnection.getSenders().find((sender) => sender.track.kind === "audio");
            console.log(videoSender);
            audioSender.replaceTrack(audioTrack);*/
        });

    }
    useEffect(() => {
        console.log(peers);
    }, [peers])

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <ProgrssInfo
                myVideo={video}
                handleCameraChange={handleCameraChange}
                handleAudioChange={handleAudioChange}
                disconnectUser={disconnectUser}
            />
            <Grid container spacing={2} sx={{ height: "100%", flex: "1" }}>
                <MeetingVideo peers={peers} myVideo={video} />
                <MeetingScripts messageList={messageList} />
            </Grid>
        </Box>
    );
};

MeetingProgress.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingProgress;

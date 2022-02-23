import { Grid, Box } from "@mui/material";
import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { MeetingScripts } from "../components/meeting/meeting-scripts";
import { MeetingVideo } from "../components/meeting/meeting-video";
import { ProgrssInfo } from "../components/meeting/progress-info";
import { UserContext } from '../utils/context/context';
import axios from 'axios';

const MeetingProgress = () => {
    const router = useRouter();
    const [meetingId, setMeetingId] = useState(''); 
    const [isHost, setIsHost] = useState(null);
    const { isLogin, userNick } = useContext(UserContext);

    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    if (!isLogin) {
        return null;
    }

    // 화상회의 관련
    const socket = io.connect('http://localhost:3001',
        { cors: { origin: 'http://localhost:3001' } }); // 서버랑 연결
    if (typeof navigator !== "undefined") {
        const Peer = require("peerjs").default
        const peer = new Peer();
    }
    const [peers, setPeers] = useState([]); // peers
    const video = useRef();
    const [messageList, setMessageList] = useState([
        {
            isCheck: false,
            nick: '고건준',
            message: '안녕'
        },
        {
            isCheck: false,
            nick: '권기준',
            message: '안녕'
        },
        {
            isCheck: false,
            nick: '주영환',
            message: '안녕'
        },
    ]);

    useEffect(() => {
        axios.get(`http://localhost:3001/db/currentMeeting`, { withCredentials : true }).then(res => {
            const mid = res.data;
            setMeetingId(mid);

            peer.on('open', (id) => { // userid가 peer로 인해 생성됨
                console.log("open");
                socket.emit('join-room', mid, id, userNick);
            });
        });

        axios.get(`http://localhost:3001/db/isHost`, { withCredentials: true }).then(res => {
            setIsHost(res.data);
            console.log(res.data);
        });
    });
    
    const connectToNewUser = (userId, stream, remoteNick) => {
        const call = peer.call(userId, stream, { metadata: { "receiverNick": remoteNick, "senderNick": userNick } });
        // call객체 생성(dest-id,my-mediaStream)
        // 들어온 상대방에게 call요청 보냄
        call.on('stream', (userVideoStream) => {
            // 새로 들어온 사람이 answer했을 때 stream이벤트 발생함
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
            // 상대가 나가서 close 이벤트 발생
            console.log("close");
        });
    }
    
    useEffect(() => {
        socket.on("msg", (userNick, msg) => {
            // stt메시지 받음
            setMessageList(arr => [...arr, { isCheck: false, nick: userNick, message: msg }])
            console.log(msg);
        });

        // peer서버와 정상적으로 통신이 된 경우 open event 발생
        console.log('open');

        navigator.mediaDevices.getUserMedia({ video: true, audio: false }).then((stream) => {
            stream.getVideoTracks().forEach((track) => {
                track.enabled = !track.enabled;
            })
            video.current.srcObject = stream; // 내 비디오 넣어줌
            peer.on('call', (call) => {
                // 중간에 입장했을때 방에 있던 사람에게 call요청 받았을 때
                call.answer(stream); // call요청 수락

                // answer가 발생하면 stream이라는 이벤트를 통해 다른 유저의 stream 받아옴
                call.on('stream', (userVideoStream) => {
                    // 중간에 입장하여 상대방 받아옴
                    // 상대방의 stream을 내 브라우저에 추가 
                    setPeers(arr => {
                        if (arr.findIndex(v => v.id === call.peer) < 0)
                            return [...arr, { id: call.peer, nick: call.metadata.senderNick, call: call, stream: userVideoStream }];
                        else {
                            arr[arr.findIndex(v => v.id === call.peer)] = { id: call.peer, nick: call.metadata.senderNick, call: call, stream: userVideoStream };
                            return [...arr];
                        }
                    });
                });
            });

            // 내가 있는 방에 새로운 유저 접속하면 server가 user-connected 입장한 userid와 함께 emit함
            socket.on('user-connected', (userId, remoteNick) => {
                // 새로운 user 연결하는 작업
                connectToNewUser(userId, stream, remoteNick);
            });
        });

        // disconnect 받으면 -> call object를 peers에서 가져와 해당 call close()함
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

    // 장치 관련
    const handleCameraChange = (deviceId) => {
        const camerasConstraint = {
            audio: true,
            video: { deviceId: deviceId  }
        };
        const myStream = video.current.srcObject;
        navigator.mediaDevices.getUserMedia(camerasConstraint).then((stream) => {
            video.current.srcObject = stream;
            if(!myStream.getVideoTracks()[0].enabled){
                stream.getVideoTracks().forEach((track)=>{
                    track.enabled=false;
                })
            }
            if(!myStream.getAudioTracks()[0].enabled){
                stream.getAudioTracks().forEach((track)=>{
                    track.enabled=false;
                })
            }
            for(let i=0;i<peers.length;i++){
                console.log(peers[i].call.peerConnection.getSenders())
                const cameraSender=peers[i].call.peerConnection.getSenders().find((sender)=>sender.track.kind==="video");
                cameraSender.replaceTrack(stream.getVideoTracks()[0]);
                console.log(cameraSender);
            }
        });
    }

    const handleAudioChange = (deviceId) => {
        const audioConstraint = {
            audio: { deviceId: deviceId },
            video: true
        };
        const myStream = video.current.srcObject;

        navigator.mediaDevices.getUserMedia(audioConstraint).then((stream) => {
            video.current.srcObject = stream;
            if(!myStream.getVideoTracks()[0].enabled){
                stream.getVideoTracks().forEach((track) => {
                    track.enabled=false;
                })
            }
            if(!myStream.getAudioTracks()[0].enabled){
                stream.getAudioTracks().forEach((track) => {
                    track.enabled=false;
                })
            }
            for(let i = 0; i < peers.length; i++){
                console.log(peers[i].call.peerConnection.getSenders())
                const audioSender=peers[i].call.peerConnection.getSenders().find((sender)=>sender.track.kind==="audio");
                console.log(stream.getAudioTracks());
                audioSender.replaceTrack(stream.getAudioTracks()[0]);
                console.log(audioSender);
            }
        });
    }

    const handleLeaveRoom = ()=>{
        video.current.srcObject.getTracks().forEach((track)=>{
            track.stop();
        });
        opener.goSummaryStep();
        self.close();
    }

    useEffect(() => {
        console.log(peers);
    }, [peers]);

    const handleSubmitScript = (time) => {
        var submitList = messageList;

        for (var i = 0; i < messageList.length; i++) {
            const line = submitList[i];

            const newLine = {
                isCheck: line.isCheck,
                nick: line.nick,
                time: '00:00',
                content: line.message
            };

            submitList[i] = newLine;
        }

        console.log(submitList);

        axios.post(`http://localhost:3001/db/submitMeeting`, {
            time: time,
            text: submitList
        }, { withCredentials: true }).then(res => {
            console.log(res);
            handleLeaveRoom();
        });

        axios.get(`http://localhost:3001/db/setIsMeetingFalse`, { withCredentials: true }).then(res => {
            console.log(res.data);
        });
    };

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
                isHost={isHost}
                parentCallback={handleSubmitScript}
            />
            <Grid container spacing={2} sx={{ height: "100%", flex: "1" }}>
                <MeetingVideo peers={peers} myVideo={video} />
                <MeetingScripts messageList={messageList} />
            </Grid>
        </Box>
    );
};

export default MeetingProgress;

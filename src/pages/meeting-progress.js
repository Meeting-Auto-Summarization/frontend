import { Grid, Box } from "@mui/material";
import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { MeetingScripts } from "../components/meeting/meeting-scripts";
import { MeetingVideo } from "../components/meeting/meeting-video";
import { ProgressInfo } from "../components/meeting/progress-info";
import { UserContext } from '../utils/context/context';
import axios from 'axios';

const socket = io.connect('http://localhost:3001',
{ cors: { origin: 'http://localhost:3001' } }); // 서버랑 연결
const MeetingProgress = () => {
    const router = useRouter();
    const [isHost, setIsHost] = useState();
    const [userNick, setUserNick] = useState('');
    const [summaryFlag, setSummaryFlag] = useState(false);
    const [time, setTime] = useState(0);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const { isLogin } = useContext(UserContext);
    


    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    if (!isLogin) {
        return null;
    }
    
     // 화상회의 관련        
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
            content: '안녕',
            time: 30
        },
        {
            isCheck: true,
            nick: '권기준',
            content: 'asdfasdfasdfdasfasdfasdfadsdsafasdfasdfasdasdfasdfasdfdasfasdfasdfadsdsafasdfasdfasd',
            time: 30
        },
        {
            isCheck: false,
            nick: '주영환',
            content: '안녕',
            time: 30
        },
    ]);

    // 1초마다 회의 시간 갱신
    useEffect(() => {
        const countdown = setInterval(() => {
            setTime(time += 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, [time]);

    useEffect(() => {
        axios.get('http://localhost:3001/db/currentMeeting', { withCredentials: true }).then(res => {
            console.log(res.data);
            const meeting = res.data.meeting;

            console.log(meeting)

            setCode(meeting.code);
            setTitle(meeting.title);

            const createDate = new Date(Date.parse(meeting.date));
            const nowDate = new Date();
            const diff = parseInt((nowDate.getTime() - createDate.getTime()) / 1000);

            setTime(diff);
        });

        axios.get(`http://localhost:3001/db/isHost`, { withCredentials: true }).then(res => {
            setIsHost(res.data);
        });

      
        peer.on('open', (id) => { // userid가 peer로 인해 생성됨
            console.log("open");
            axios.get('http://localhost:3001/auth/meeting-info', { withCredentials: true }).then(res => {
                const {currentMeetingId}=res.data;
                const nick = res.data.name;
                setUserNick(nick);
                console.log("debug");
                console.log(currentMeetingId);
                socket.emit('join-room', currentMeetingId, id, nick);
            }).catch(err => {
                console.log(err);
            });
        });
    }, []);

    useEffect(() => {
        axios.get(`http://localhost:3001/db/currentMeetingScript`, { withCredentials: true }).then(res => {
            setMessageList(res.data);
            console.log(res.data);
        });
    }, []);

    useEffect(() => {
   
        socket.on("summaryOffer", (summaryFlag) => {
            setSummaryFlag(summaryFlag);
        });
        socket.on("initSummaryFlag", (flag) => {
            setSummaryFlag(flag);
        });

        socket.on("msg", (userNick,time, msg) => {
            // stt메시지 받음
            setMessageList(arr => [...arr, {
                isCheck: false,
                nick: userNick,
                content: msg,
                time: time
            }])
            console.log(msg);
        });

        // peer서버와 정상적으로 통신이 된 경우 open event 발생
        console.log('open');

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
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


    useEffect(() => {
        axios.get(`http://localhost:3001/db/isMeeting`, { withCredentials: true }).then(res => {    
            if (!res.data) {
                self.close();
            }
      });
    }, [peers]);
    
    const connectToNewUser = async(userId, stream, remoteNick) => {
        const {data}=await axios.get('http://localhost:3001/auth/meeting-info', { withCredentials: true });
        const call = peer.call(userId, stream, { metadata: { "receiverNick": remoteNick, "senderNick": data.name } });
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

    // 장치 관련
    const handleCameraChange = (deviceId) => {
        const camerasConstraint = {
            audio: true,
            video: { deviceId: deviceId }
        };
        const myStream = video.current.srcObject;
        navigator.mediaDevices.getUserMedia(camerasConstraint).then((stream) => {
            video.current.srcObject = stream;
            if (!myStream.getVideoTracks()[0].enabled) {
                stream.getVideoTracks().forEach((track) => {
                    track.enabled = false;
                })
            }
            if (!myStream.getAudioTracks()[0].enabled) {
                stream.getAudioTracks().forEach((track) => {
                    track.enabled = false;
                })
            }
            for (let i = 0; i < peers.length; i++) {
                console.log(peers[i].call.peerConnection.getSenders())
                const cameraSender = peers[i].call.peerConnection.getSenders().find((sender) => sender.track.kind === "video");
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
            if (!myStream.getVideoTracks()[0].enabled) {
                stream.getVideoTracks().forEach((track) => {
                    track.enabled = false;
                })
            }
            if (!myStream.getAudioTracks()[0].enabled) {
                stream.getAudioTracks().forEach((track) => {
                    track.enabled = false;
                })
            }
            for (let i = 0; i < peers.length; i++) {
                console.log(peers[i].call.peerConnection.getSenders())
                const audioSender = peers[i].call.peerConnection.getSenders().find((sender) => sender.track.kind === "audio");
                console.log(stream.getAudioTracks());
                audioSender.replaceTrack(stream.getAudioTracks()[0]);
                console.log(audioSender);
            }
        });
        socket.emit("deviceChange",summaryFlag,deviceId);    
    
  
    }

    const handleLeaveRoom = () => {
        video.current.srcObject.getTracks().forEach((track)=>{
            track.stop();
        });
        opener.goSummaryStep();
        self.close();
    }

    useEffect(() => {
        console.log(peers);
    }, [peers]);

    const handleSubmitScript = (isHost) => {
        opener.location.reload();

        if (!isHost) {
            opener.endMeeting();
            self.close();
            return;
        }

        axios.get(`http://localhost:3001/db/setIsMeetingAllFalse`, { withCredentials: true }).then(res => {
            console.log(res.data);
        });

        axios.post(`http://localhost:3001/db/submitMeeting`, {
            time: time,
            text: messageList
        }, { withCredentials: true }).then(res => {
            console.log(res);
            handleLeaveRoom();
        });
    };

    function handleSummaryOnOff(summaryFlag) {
        socket.emit("summaryAlert", summaryFlag);
    }
    function handleMute(micStatus){
        if(summaryFlag)
        socket.emit("micOnOff",micStatus);
    }

    return (
        <Box
            sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column"
            }}
        >
            <style global jsx>
                {`html, body, body > div:first-child, div#__next, div#__next > div { height: 100%; }`}
            </style>
            <ProgressInfo
                myVideo={video}
                handleCameraChange={handleCameraChange}
                handleAudioChange={handleAudioChange}
                isHost={isHost}
                time={time}
                code={code}
                parentCallback={handleSubmitScript}
                handleMute={handleMute}
            />
            <Grid
                container
                sx={{
                    height: "calc(100% - 90px)",
                    flex: "1"
                }}
            >
                <Grid item xs={8.5}>
                    <MeetingVideo
                        peers={peers}
                        myVideo={video}
                    />
                </Grid>
                <Grid item xs={3.5}>
                    <MeetingScripts
                        messageList={messageList}
                        handleSummaryOnOff={handleSummaryOnOff} 
                        summaryFlag={summaryFlag}
                        setSummaryFlag={setSummaryFlag}
                        title={title}
                    />
                </Grid>
            </Grid>
        </Box>
    );
};

export default MeetingProgress;
import { useContext, useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { io } from "socket.io-client";
import { Box, styled, useMediaQuery, Drawer, IconButton } from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material';
import { MeetingScripts } from "../components/meeting/meeting-scripts";
import { MeetingVideo } from "../components/meeting/meeting-video";
import { ProgressInfo } from "../components/meeting/progress-info";
import { UserContext } from '../utils/context/context';
import axios from 'axios';

const socket = io.connect('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com:3001',
    { cors: { origin: 'https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com:3001' } }); // 서버랑 연결

const ProcessLayoutRoot = styled('div')({
    display: 'flex',
    flex: '1 1 auto',
    maxWidth: '100%',
    paddingTop: 90,
});

let bufferSize = 2048,
    AudioContext = null,
    context = null,
    processor = null,
    input = null,
    globalStream;

const constraints = {
    audio: true,
    video: false
};
if (typeof navigator !== "undefined") {
    const Peer = require("peerjs").default
    const peer = new Peer({
        host: 'ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com',
        port: 443,
        path: '/peerjs',
        debug: 3,
    });
}


const MeetingProgress = () => {
    const router = useRouter();
    const [isHost, setIsHost] = useState();
    const [isSidebarOpen, setSidebarOpen] = useState(true);
    const [mid, setMid] = useState('');
    const [summaryFlag, setSummaryFlag] = useState(undefined);
    const [time, setTime] = useState(0);
    const [code, setCode] = useState('');
    const [title, setTitle] = useState('');
    const [members, setMembers] = useState([]);
    const { isLogin } = useContext(UserContext);
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
        defaultMatches: true,
        noSsr: false
    });

    if (isLogin === false) {
        router.push('/not-login');
    }

    useEffect(() => {
        if (lgUp) {
            setSidebarOpen(true);
        }
        else {
            setSidebarOpen(false);
        }
    }, [lgUp]);

    // 화상회의 관련        

    const [peers, setPeers] = useState([]); // peers
    const video = useRef();
    const [messageList, setMessageList] = useState([]);

    // 1초마다 회의 시간 갱신
    useEffect(() => {
        const countdown = setInterval(() => {
            setTime(time += 1);
        }, 1000);
        return () => clearInterval(countdown);
    }, [time]);

    useEffect(() => {
        axios.get('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/currentMeeting', { withCredentials: true }).then(res => {
            console.log(res.data);
            const meeting = res.data.meeting;
            setMembers(res.data.members);

            setMid(meeting._id)
            setCode(meeting.code);
            setTitle(meeting.title);

            const createDate = new Date(Date.parse(meeting.date));
            const nowDate = new Date();
            const diff = parseInt((nowDate.getTime() - createDate.getTime()) / 1000);

            setTime(diff);
        });

        axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/isHost`, { withCredentials: true }).then(res => {
            setIsHost(res.data);
        });

        peer.on('open', (id) => { // userid가 peer로 인해 생성됨
            console.log("open");
            axios.get('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/auth/meeting-info', { withCredentials: true }).then(res => {
                const { currentMeetingId } = res.data;
                const nick = res.data.name;
                console.log("debug");
                console.log(currentMeetingId);
                socket.emit('join-room', currentMeetingId, id, nick);
            }).catch(err => {
                console.log(err);
            });
        });
    }, []);

    useEffect(() => {
        socket.on("initScripts", (scripts) => {
            setMessageList(scripts);
        });//들어왔을때 client script 추가
        /*axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/currentMeetingScript`, { withCredentials: true }).then(res => {
            setMessageList(res.data);
            console.log(res.data);
        });*/
    }, []);


    useEffect(() => {
        socket.on("checkChange", (scripts) => {
            /*let newMessageList = messageList;
            console.log("메시지List: " + messageList);
            console.log("new" + newMessageList);
            newMessageList[index].isChecked = isChecked;
            setMessageList(newMessageList);*/
            console.log(scripts);
            setMessageList(scripts);
        });

        socket.on("summaryOffer", (summaryFlag) => {
            setSummaryFlag(summaryFlag);
            if (summaryFlag) {
                if (AudioContext === null) {
                    initRecording((error) => {
                        console.error('Error when recording', error);
                    });
                }
            } else {
                closeRecording();
            }
        });
        socket.on("initSummaryFlag", (flag) => {
            setSummaryFlag(flag);
            if (flag) {
                if (AudioContext === null) {
                    initRecording((error) => {
                        console.error('Error when recording', error);
                    });
                }
            }
        });

        socket.on("msg", (userNick, time, msg) => {
            // stt메시지 받음
            setMessageList(arr => [...arr, {
                isChecked: false,
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
            socket.emit('ready');
            // 내가 있는 방에 새로운 유저 접속하면 server가 user-connected 입장한 userid와 함께 emit함
            socket.on('user-connected', (userId, remoteNick) => {
                // 새로운 user 연결하는 작업
                connectToNewUser(userId, stream, remoteNick);
            });
        });
        socket.on('user-disconnected', (userId) => {
            console.log("user-disconnected ");
            closeRecording();//audio input를 진행하는 context 종료
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
        axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/isMeeting`, { withCredentials: true }).then(res => {
            if (!res.data) {
                self.close();
            }
        });
    }, [peers]);
    const handleSuccess = function (stream) {
        console.log("현재 스트림 : ", stream);

        globalStream = stream;
        input = context.createMediaStreamSource(stream);
        input.connect(processor);

        processor.onaudioprocess = function (e) {
            microphoneProcess(e);
        };
    };
    const initRecording = (onError) => {
        console.log('recording check2')
        AudioContext = window.AudioContext || window.webkitAudioContext;
        context = new AudioContext();
        processor = context.createScriptProcessor(bufferSize, 1, 1);
        processor.connect(context.destination);
        context.resume();

        handleSuccess(video.current.srcObject);
        //navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess);

        socket.on('googleCloudStreamError', (error) => {
            if (onError) {
                onError('error');
            }
            // We don't want to emit another end stream event
            closeAll();
        });
    }

    function microphoneProcess(e) {
        var left = e.inputBuffer.getChannelData(0);
        //var left16 = convertFloat32ToInt16(left); //old ver
        var left16 = downsampleBuffer(left, 44100, 16000);
        socket.emit('binaryAudioData', left16);
    }

    /**
     * Converts a buffer from float32 to int16. Necessary for streaming.
     * sampleRateHertz of 1600.
     * 
     * @param {object} buffer Buffer being converted
     */
    function downsampleBuffer(buffer, sampleRate, outSampleRate) {
        if (outSampleRate == sampleRate) {
            return buffer;
        }
        if (outSampleRate > sampleRate) {
            throw 'downsampling rate show be smaller than original sample rate';
        }
        var sampleRateRatio = sampleRate / outSampleRate;
        var newLength = Math.round(buffer.length / sampleRateRatio);
        var result = new Int16Array(newLength);
        var offsetResult = 0;
        var offsetBuffer = 0;
        while (offsetResult < result.length) {
            var nextOffsetBuffer = Math.round((offsetResult + 1) * sampleRateRatio);
            var accum = 0,
                count = 0;
            for (var i = offsetBuffer; i < nextOffsetBuffer && i < buffer.length; i++) {
                accum += buffer[i];
                count++;
            }

            result[offsetResult] = Math.min(1, accum / count) * 0x7fff;
            offsetResult++;
            offsetBuffer = nextOffsetBuffer;
        }
        return result.buffer;
    }
    //회의 종료할때 호출!!!
    function closeRecording() {
        // Clear the listeners (prevents issue if opening and closing repeatedly)
        //socket.off('speechData');
        socket.off('googleCloudStreamError');
        let tracks = globalStream ? globalStream.getTracks() : null;
        /*let track = tracks ? tracks[0] : null;
        if (track) {
            track.stop();
        }*/

        if (processor) {
            if (input) {
                try {
                    input.disconnect(processor);
                } catch (error) {
                    console.warn('Attempt to disconnect input failed.')
                }
            }
            processor.disconnect(context.destination);
        }
        if (context) {
            context.close().then(function () {
                input = null;
                processor = null;
                context = null;
                AudioContext = null;
            });
        }
    }
    ///

    const connectToNewUser = async (userId, stream, remoteNick) => {
        const { data } = await axios.get('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/auth/meeting-info', { withCredentials: true });
        const call = peer.call(userId, stream, { metadata: { "receiverNick": remoteNick, "senderNick": data.name } });

        axios.get('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/currentMeeting',
            { withCredentials: true }
        ).then(res => {
            setMembers(res.data.members);
        });

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
            //
            if (summaryFlag)//요약중이면 기존것 종료하고, 재시작
            {
                closeRecording();
                initRecording();
            }

        });
    }
    const handleLeaveRoom = () => {
        video.current.srcObject.getTracks().forEach((track) => {
            track.stop();
        });

        if (!opener) {
            router.push('/meeting-list');
        } else {
            opener.location.href = `/summarizer?mid=${mid}`;
        }

        self.close();
    }

    // useEffect(() => {
    //     console.log(peers);
    // }, [peers]);

    const handleSubmitScript = async (isHost) => {
        if (!opener) {
            router.push('/meeting-list');
        } else {
            opener.location.reload();
        }

        if (!isHost) {
            await axios.get('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/exitMeeting',
                { withCredentials: true }
            ).then(res => {
                console.log(res.data);
            });

            await axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/setIsMeetingFalse`, { withCredentials: true }).then(res => {
                console.log(res.data);
                self.close();
            });

            return;
        }

        socket.emit("meetingEnd", isHost);
        axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/setIsMeetingAllFalse`, { withCredentials: true }).then(res => {
            console.log(res.data);
        });

        axios.post(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/submitMeeting`, {
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
    function handleMute(micStatus) {
        if (micStatus) {//켜야함
            if (summaryFlag) {
                initRecording();
                socket.emit("micOnOff", micStatus);
            }
        } else {//꺼야함
            if (summaryFlag) {
                closeRecording();
                socket.emit("micOnOff", micStatus);
            }
        }
    }
    function handleServerScript(index, isChecked) {
        socket.emit("handleCheck", index, isChecked);
    }

    return (
        <>
            {isLogin &&
                <>
                    {/* <style global jsx>
                    {`html, body, body > div:first-child, div#__next, div#__next > div { height: 100%; }`}
                </style> */}
                    <ProcessLayoutRoot>
                        <Box
                            sx={{
                                position: 'relative',
                                display: 'flex',
                                flex: '1 1 auto',
                                flexDirection: 'column',
                                ...(isSidebarOpen && {
                                    paddingRight: '450px'
                                })
                            }}
                        >
                            <MeetingVideo
                                peers={peers}
                                myVideo={video}
                            />
                            <IconButton
                                onClick={() => setSidebarOpen(!isSidebarOpen)}
                                sx={{
                                    position: "fixed",
                                    right: 0,
                                    height: '100px',
                                    backgroundColor: "#202020",
                                    borderRadius: "12px 0 0 12px",
                                    p: 1.5,
                                    mt: 1,
                                    ...(isSidebarOpen && {
                                        mr: '450px'
                                    })
                                }}
                            >
                                {isSidebarOpen
                                    ? <ArrowForwardIos />
                                    : <ArrowBackIosNew />
                                }
                            </IconButton>
                        </Box>
                    </ProcessLayoutRoot>
                    <ProgressInfo
                        myVideo={video}
                        handleCameraChange={handleCameraChange}
                        handleAudioChange={handleAudioChange}
                        isHost={isHost}
                        time={time}
                        code={code}
                        members={members}
                        parentCallback={handleSubmitScript}
                        handleMute={handleMute}
                    />
                    <Drawer
                        anchor="right"
                        open={isSidebarOpen}
                        PaperProps={{
                            sx: {
                                pt: '90px',
                                width: '450px',
                                border: 'none',
                                boxShadow: (theme) => theme.shadows[7],
                            }
                        }}
                        sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
                        variant="persistent"
                    >
                        <MeetingScripts
                            messageList={messageList}
                            handleSummaryOnOff={handleSummaryOnOff}
                            summaryFlag={summaryFlag}
                            setSummaryFlag={setSummaryFlag}
                            title={title}
                            handleServerScript={handleServerScript}
                        />
                    </Drawer>
                </>
            }
        </>
    );
};

export default MeetingProgress;
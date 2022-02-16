import {
    Button,
    styled,
    Box,
    Typography,
    Grid,
    IconButton,
    Menu,
    MenuItem,
} from "@mui/material";
import {
    Mic,
    VideoCameraFront,
    MoreHoriz,
    KeyboardArrowUp,
    MicOff,
    VideocamOff,
} from "@mui/icons-material";
import { useState, useContext, useEffect } from 'react';
import Link from 'next/link';
import { UserContext } from '../../utils/context/context';
import { meetings } from '../../__mocks__/meetings';

const ProgressInfoButton = styled(Button)({
    background: "#E63946",
    borderColor: "#E63946",
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "12px",
    "&:hover": {
        backgroundColor: "#E63946",
        color: "#808080",
    },
});

export function ProgrssInfo({myVideo,handleCameraChange, handleAudioChange ,handleLeaveRoom} ) {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [microphones, setMicrophones] = useState([]);
    const [currentCamera,setCurrentCamera]=useState(0);
    const [currentMic,setCurrentMic]=useState(0);
    const handleMicOnOff = () => {
        const myStream = myVideo.current.srcObject;
        myStream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        setMicOn(!micOn);
    };
    const handleCameraOnOff = () => {
        const myStream = myVideo.current.srcObject;
        myStream.getVideoTracks().forEach((track) => {
            track.enabled = !track.enabled;
        })
        setCameraOn(!cameraOn);
    };
    const [micMenu, setMicMenu] = useState(null);
    const [cameraMenu, setCameraMenu] = useState(null);
    const openMicMenu = Boolean(micMenu);
    const openCameraMenu = Boolean(cameraMenu);
    const handleMicMenuClose = (idx) => {
        setMicMenu(null);
        if(idx>-1){
            handleAudioChange(microphones[idx].deviceId);
            setCurrentMic(idx);
        }
    };
    const handleMicMenu = (event) => {
        setMicMenu(event.currentTarget);
    };


    const handleCameraMenuClose = () => {
        setCameraMenu(null);
        if(idx>-1){
            handleCameraChange(microphones[idx].deviceId);
            setCurrentCamera(idx);
        }
    };
    const handleCameraMenu = (event) => {
        setCameraMenu(event.currentTarget);
    };

    const { meetingID } = useContext(UserContext);
    const getDevices = () => {
        try {
            navigator.mediaDevices.enumerateDevices().then((devices) => {
                setCameras(devices.filter((device) => device.kind === "videoinput"));
                setMicrophones(devices.filter((device) => device.kind === "audioinput"));
            })
            navigator.mediaDevices.ondevicechange = (event) => {
                navigator.mediaDevices.enumerateDevices().then((devices) => {
                    setCameras(devices.filter((device) => device.kind === "videoinput"));
                    setMicrophones(devices.filter((device) => device.kind === "audioinput"));
                })
            }
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        getDevices();
    }, []);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    useEffect(() => {
        const countdown = setInterval(() => {
            if (parseInt(seconds) < 59) {
                setSeconds(parseInt(seconds) + 1);
            }
            if (parseInt(seconds) === 59) {
                if (parseInt(minutes) === 59) {
                    setHours(parseInt(hours) + 1);
                    setMinutes(0);
                    setSeconds(0);
                } else {
                    setMinutes(parseInt(minutes) + 1);
                    setSeconds(0);
                }
            }
        }, 1000);
        return () => clearInterval(countdown);
    }, [minutes, seconds]);

    return (
        <Box>
            <Box display="flex" sx={{}}>
                <Box
                    component="span"
                    align="left"
                    sx={{ display: "inlineBlock", flexGrow: 1, textAlign: "left" }}
                >
                    <Grid container>
                        <Grid sx={{ mx: 1 }}>
                            <Grid item>
                                <IconButton
                                    color="inherit"
                                    onClick={handleMicOnOff}
                                    sx={{ px: 0 }}
                                >
                                    {micOn ? (
                                        <Mic sx={{ fontSize: 40, m: 0 }} />
                                    ) : (
                                        <MicOff sx={{ fontSize: 40, m: 0 }} />
                                    )}
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-controls={openMicMenu ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openMicMenu ? "true" : undefined}
                                    onClick={handleMicMenu}
                                    sx={{ p: 0 }}
                                >
                                    <KeyboardArrowUp sx={{ fontSize: 20, p: 0 }} />
                                </IconButton>
                            </Grid>
                            <Grid item xs={12} align="center">
                                {micOn ? (
                                    <Typography
                                        variant="button"
                                        color="text.primary"
                                        sx={{ display: "inline" }}
                                    >
                                        Mic On
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="button"
                                        color="text.primary"
                                        sx={{ display: "inline" }}
                                    >
                                        Mic Off
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Menu
                            id="basic-menu"
                            anchorEl={micMenu}
                            open={openMicMenu}
                            onClose={handleMicMenuClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {
                                microphones.map((item, idx) => {
                                    if(currentMic===idx){
                                    return (<MenuItem onClick={(e) => {
                                        handleMicMenuClose(idx);
                                    }} selected={true} >{item.label}</MenuItem>);
                                }else{
                                    return (<MenuItem onClick={(e) => {
                                        handleMicMenuClose(idx);
                                    }} >{item.label}</MenuItem>);
                                }
                                })
                            }
                        </Menu>

                        <Grid sx={{ mx: 1 }}>
                            <Grid item align="center">
                                <IconButton
                                    color="inherit"
                                    onClick={handleCameraOnOff}
                                    sx={{ px: 0 }}
                                >
                                    {cameraOn ? (
                                        <VideoCameraFront sx={{ fontSize: 40, m: 0 }} />
                                    ) : (
                                        <VideocamOff sx={{ fontSize: 40, m: 0 }} />
                                    )}
                                </IconButton>
                                <IconButton
                                    color="inherit"
                                    aria-controls={openCameraMenu ? "basic-menu" : undefined}
                                    aria-haspopup="true"
                                    aria-expanded={openCameraMenu ? "true" : undefined}
                                    onClick={handleCameraMenu}
                                    sx={{ p: 0 }}
                                >
                                    <KeyboardArrowUp sx={{ fontSize: 20, p: 0 }} />
                                </IconButton>
                            </Grid>
                            <Grid item>
                                {cameraOn ? (
                                    <Typography
                                        variant="button"
                                        color="text.primary"
                                        sx={{ display: "inline" }}
                                    >
                                        Camera On
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="button"
                                        color="text.primary"
                                        sx={{ display: "inline" }}
                                    >
                                        Camera Off
                                    </Typography>
                                )}
                            </Grid>
                        </Grid>
                        <Menu
                            id="basic-menu"
                            anchorEl={cameraMenu}
                            open={openCameraMenu}
                            onClose={handleCameraMenuClose}
                            MenuListProps={{
                                "aria-labelledby": "basic-button",
                            }}
                        >
                            {
                                cameras.map((item, idx) => {
                                    if(currentCamera===idx){
                                    return (<MenuItem onClick={(e) => {
                                        handleCameraMenuClose(idx);
                                    }} selected={true}>{item.label}</MenuItem>)
                                }else{
                                    return (<MenuItem onClick={(e) => {
                                        handleCameraMenuClose(idx);
                                    }}>{item.label}</MenuItem>)
                                }
                                })
                            }
                        </Menu>

                        <Grid sx={{ mx: 1 }}>
                            <Grid item>
                                <IconButton color="inherit" sx={{ px: 0 }}>
                                    <MoreHoriz sx={{ fontSize: 40 }} />
                                </IconButton>
                            </Grid>

                            <Grid item>
                                <Typography
                                    variant="button"
                                    color="text.primary"
                                    sx={{ display: "inline" }}
                                >
                                    More
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>
                <Box
                    component="span"
                    sx={{ flexGrow: 1, textAlign: "right", margin: "auto" }}
                >
                    <Typography display="inline" sx={{ my: 1, mx: 1.5 }}>
                        {hours != 0 && `${hours}:`}
                        {minutes < 10 ? `0${minutes}` : minutes}
                        :
                        {seconds < 10 ? `0${seconds}` : seconds}
                    </Typography>
                    <Link
                        href={{
                            pathname: `/script-edit`, // 라우팅 id
                            query: {
                                mid: meetingID,
                                time: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
                            } // props 
                        }}
                        as={`/script-edit`}
                    >
                        <ProgressInfoButton
                            variant="text"
                            sx={{ my: 1, mx: 1.5 }}
                            onClick={handleLeaveRoom}
                        >
                            회의 종료
                        </ProgressInfoButton>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}
import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import {
    AppBar,
    Toolbar,
    Button,
    Box,
    Typography,
    IconButton,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText
} from "@mui/material";
import {
    Mic,
    VideoCameraFront,
    MoreHoriz,
    KeyboardArrowUp,
    KeyboardArrowDown,
    MicOff,
    VideocamOff,
    ContentCopy,
    Share,
    ExpandMore
} from "@mui/icons-material";
import axios from 'axios';

const MeetingNavBar = styled(AppBar)(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[9],
    zIndex: theme.zIndex.drawer + 1 
}));

const ProgressInfoButton = styled(Button)(({ theme }) => ({
    background: "#ed5353",
    color: "#000000",
    minWidth: "96px",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "15px",
    marginLeft: "auto",
    boxShadow: theme.shadows[5],
    "&:hover": {
        color: "#ffffff",
    },
}));

export function ProgressInfo({ myVideo, handleCameraChange, handleAudioChange, isHost, time, code, members, parentCallback,handleMute }) {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(false);
    const [cameras, setCameras] = useState([]);
    const [microphones, setMicrophones] = useState([]);
    const [currentCamera,setCurrentCamera] = useState(0);
    const [currentMic, setCurrentMic] = useState(0);
    const [hours, setHours] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        const newSec = parseInt(time % 60);
        const newMin = parseInt((time / 60) % 60);
        const newHours = parseInt(time / 3600);

        setSeconds(newSec);
        setMinutes(newMin);
        setHours(newHours);
    }, [time]);

    const handleMicOnOff = () => {
        const myStream = myVideo.current.srcObject;
        myStream.getAudioTracks().forEach((track) => {
            track.enabled = !track.enabled;
        });
        handleMute(!micOn);
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
    const [moreMenu, setMoreMenu] = useState(null);
    const [codeMenu, setCodeMenu] = useState(null);
    const [memberMenu, setMemberMenu] = useState(null);
    const openMicMenu = Boolean(micMenu);
    const openCameraMenu = Boolean(cameraMenu);
    const openMoreMenu = Boolean(moreMenu);
    const openCodeMenu = Boolean(codeMenu);
    const openMemberMenu = Boolean(memberMenu);
    
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

    const handleCameraMenuClose = (idx) => {
        setCameraMenu(null);
        if(idx>-1){
            handleCameraChange(microphones[idx].deviceId);
            setCurrentCamera(idx);
        }
    };

    const handleCameraMenu = (event) => {
        setCameraMenu(event.currentTarget);
    };

    const handleMoreMenuClose = (idx) => {
        setMoreMenu(null);
        if(idx>-1){
            // handleCameraChange(microphones[idx].deviceId);
            setMoreMenu(idx);
        }
    };

    const handleMoreMenu = (event) => {
        setMoreMenu(event.currentTarget);
    };

    const handleCodeMenuClose = (idx) => {
        setCodeMenu(null);

        if (idx >- 1) {
            if (idx === 1) {
                navigator.clipboard.writeText(code);
            }
            else if (idx === 2) {
                
            }
            setMoreMenu(null);
        }
    };

    const handleCodeMenu = (event) => {
        setCodeMenu(event.currentTarget);
    };

    const handleMemberMenuClose = () => {
        setMemberMenu(null);
        setMoreMenu(null);
    };

    const handleMemberMenu = (event) => {
        setMemberMenu(event.currentTarget);
    };

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

    return (
        <MeetingNavBar
            sx={{
                height: "90px"
            }}
        >
            <Toolbar
                disableGutters
                sx={{
                    left: 0,
                    px: 2,
                    py: 0.5
                }}
            >
                <IconButton
                    onClick={handleMicOnOff}
                    sx={{
                        color: "#6e9163",
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    {micOn
                        ? <Mic sx={{ fontSize: 40, m: 0 }} />
                        : <MicOff sx={{ fontSize: 40, m: 0 }} />
                    }
                    <Typography
                        variant="button"
                        color="text.primary"
                        sx={{ fontSize: 15 }}
                    >
                        {micOn
                            ? "Mic On"
                            : "Mic Off"
                        }
                    </Typography>
                </IconButton>
                <IconButton
                    aria-controls={openMicMenu ? "mic-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMicMenu ? "true" : undefined}
                    onClick={handleMicMenu}
                    sx={{
                        color: "#6e9163",
                        p: 0
                    }}
                >
                    {!openMicMenu
                        ? <KeyboardArrowUp sx={{ fontSize: 20, p: 0 }} />
                        : <KeyboardArrowDown sx={{ fontSize: 20, p: 0 }} />
                    }
                </IconButton>
                <IconButton
                    onClick={handleCameraOnOff}
                    sx={{
                        color: "#6e9163",
                        display: "flex",
                        flexDirection: "column"
                    }}
                >
                    {cameraOn
                        ? <VideoCameraFront sx={{ fontSize: 40, m: 0 }} />
                        : <VideocamOff sx={{ fontSize: 40, m: 0 }} />
                    }
                    <Typography
                        variant="button"
                        color="text.primary"
                        sx={{ fontSize: 15 }}
                    >
                        {cameraOn
                            ? "Camera On"
                            : "Camera Off"
                        }
                    </Typography>
                </IconButton>
                <IconButton
                    aria-controls={openCameraMenu ? "camera-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openCameraMenu ? "true" : undefined}
                    onClick={handleCameraMenu}
                    sx={{
                        color: "#6e9163",
                        p: 0
                    }}
                >
                    {!openCameraMenu
                        ? <KeyboardArrowUp sx={{ fontSize: 20, p: 0 }} />
                        : <KeyboardArrowDown sx={{ fontSize: 20, p: 0 }} />
                    }
                </IconButton>
                <IconButton
                    aria-controls={openMoreMenu ? "more-menu" : undefined}
                    aria-haspopup="true"
                    aria-expanded={openMoreMenu ? "true" : undefined}
                    onClick={handleMoreMenu}
                    sx={{
                        color: "#6e9163",
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                >
                    <MoreHoriz sx={{ fontSize: 40 }} />
                    <Typography
                        variant="button"
                        color="text.primary"
                        sx={{ fontSize: 15 }}
                    >
                        More
                    </Typography>
                </IconButton>
                <Box sx={{ flexGrow: 1 }} />
                <Typography
                    variant="h4"
                    color="#000000"
                    sx={{
                        mx: 3
                    }}
                >
                    {hours != 0 && (hours < 10 ? `0${hours} : ` : `${hours} : `)}
                    {minutes < 10 ? `0${minutes}` : minutes}
                    &nbsp;:&nbsp;
                    {seconds < 10 ? `0${seconds}` : seconds}
                </Typography>
                <ProgressInfoButton
                    variant="text"
                    onClick={()=> parentCallback(isHost)}
                    sx={{ px: 2.5 }}
                >
                    {isHost
                        ? '회의 종료'
                        : '회의 나가기'
                    }
                </ProgressInfoButton>
            </Toolbar>
            <Menu
                id="mic-menu"
                anchorEl={micMenu}
                open={openMicMenu}
                onClose={handleMicMenuClose}
                MenuListProps={{
                    "aria-labelledby": "mic-button",
                }}
            >
                {microphones.map((item, idx) => {
                    if (currentMic === idx) {
                        return(
                            <MenuItem
                                key={item.deviceId}
                                onClick={() => handleMicMenuClose(idx)}
                                selected={true}
                            >
                                {item.label}
                            </MenuItem>
                        );
                    } else {
                        return(
                            <MenuItem
                                key={item.deviceId}
                                onClick={() => handleMicMenuClose(idx)}
                            >
                                {item.label}
                            </MenuItem>
                        );
                    }
                })}
            </Menu>
            <Menu
                id="camera-menu"
                anchorEl={cameraMenu}
                open={openCameraMenu}
                onClose={handleCameraMenuClose}
                MenuListProps={{
                    "aria-labelledby": "camera-menu",
                }}
            >
                {cameras.map((item, idx) => {
                    if (currentCamera === idx) {
                        return(
                            <MenuItem
                                key={item.deviceId}
                                onClick={() => handleCameraMenuClose(idx)}
                                selected={true}
                            >
                                {item.label}
                            </MenuItem>
                        );
                    } else {
                        return(
                            <MenuItem
                                key={item.deviceId}
                                onClick={() => handleCameraMenuClose(idx)}
                            >
                                {item.label}
                            </MenuItem>
                        );
                    }
                })}
            </Menu>
            <Menu
                id="more-menu"
                anchorEl={moreMenu}
                open={openMoreMenu}
                onClose={handleMoreMenuClose}
                MenuListProps={{
                    "aria-labelledby": "more-menu",
                }}
            >
                <MenuItem
                    onClick={handleCodeMenu}
                >
                    {`회의 코드: ${code}`}
                    <ExpandMore />
                </MenuItem>
                <MenuItem
                    onClick={handleMemberMenu}
                >
                    회의 참여 인원
                    <ExpandMore />
                </MenuItem>
            </Menu>
            <Menu
                id="code-menu"
                anchorEl={codeMenu}
                open={openCodeMenu}
                onClose={handleCodeMenuClose}
                MenuListProps={{
                    "aria-labelledby": "code-menu",
                }}
            >
                <MenuItem onClick={() => handleCodeMenuClose(1)}>
                    <ListItemIcon>
                        <ContentCopy />
                    </ListItemIcon>
                    <ListItemText>Paste</ListItemText>
                </MenuItem>
                <MenuItem onClick={() => handleCodeMenuClose(2)}>
                    <ListItemIcon>
                        <Share />
                    </ListItemIcon>
                    <ListItemText>Share</ListItemText>
                </MenuItem>
            </Menu>
            <Menu
                id="member-menu"
                anchorEl={memberMenu}
                open={openMemberMenu}
                onClose={handleMemberMenuClose}
                MenuListProps={{
                    "aria-labelledby": "member-menu",
                }}
            >
                {members.map((mem, idx) => (
                    <MenuItem
                        key={idx}
                        onClick={handleMemberMenuClose}
                    >
                        {mem}
                    </MenuItem>
                ))}
            </Menu>
        </MeetingNavBar>
    );
}
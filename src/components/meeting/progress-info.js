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
import { useState } from "react";

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

export function ProgrssInfo() {
    const [micOn, setMicOn] = useState(true);
    const [cameraOn, setCameraOn] = useState(false);
    const handleMicOnOff = () => {
        if (micOn) {
        setMicOn(false);
        } else {
        setMicOn(true);
        }
    };
    const handleCameraOnOff = () => {
        if (cameraOn) {
        setCameraOn(false);
        } else {
        setCameraOn(true);
        }
    };
    const [micMenu, setMicMenu] = useState(null);
    const [cameraMenu, setCameraMenu] = useState(null);
    const openMicMenu = Boolean(micMenu);
    const openCameraMenu = Boolean(cameraMenu);
    const handleMicMenuClose = () => {
        setMicMenu(null);
    };
    const handleMicMenu = (event) => {
        setMicMenu(event.currentTarget);
    };

    const handleCameraMenuClose = () => {
        setCameraMenu(null);
    };
    const handleCameraMenu = (event) => {
        setCameraMenu(event.currentTarget);
    };

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
                        <MenuItem onClick={handleMicMenuClose}>기기1</MenuItem>
                        <MenuItem onClick={handleMicMenuClose}>기기2</MenuItem>
                        <MenuItem onClick={handleMicMenuClose}>기기3</MenuItem>
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
                        <MenuItem onClick={handleCameraMenuClose}>기기1</MenuItem>
                        <MenuItem onClick={handleCameraMenuClose}>기기22</MenuItem>
                        <MenuItem onClick={handleCameraMenuClose}>기기3</MenuItem>
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
                        00:15
                    </Typography>
                    <ProgressInfoButton
                        href="#!"
                        variant="text"
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        회의 종료
                    </ProgressInfoButton>
                </Box>
            </Box>
        </Box>
    );
}

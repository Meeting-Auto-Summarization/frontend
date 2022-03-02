import { Box, Grid, Paper, Typography } from "@mui/material";
import { useRef, useEffect } from 'react';

function Video({text, stream}) {
    const ref = useRef();

    useEffect(() => {
        ref.current.srcObject = stream;
    }, [stream]);

    return (
        <Paper
            sx={{
                display: "flex",
                width: "100%",
                height: "100%",
                backgroundColor: "#000000",
                boxSizing: "border-box",
                border: "2px solid black",
                borderRadius: 0,
                overflow: "hidden"
            }}
        >
            <video
                ref={ref}
                width="100%"
                autoPlay
                playsInline
            />
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    height: "7%",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    px: 1,
                    backgroundColor: "rgba( 0, 0, 0, 0.7 )",
                }}
            >
                <Typography
                    variant="h6"
                    color="#ffffff"
                    align="left"
                >
                    {text}
                </Typography>
            </Box>
        </Paper>
    );
}

export function MeetingVideo({peers, myVideo}) {
    return(
        <Box
            sx={{
                display: "flex",
                alignItems: "center",
                height: "100%",
                position: "relative"
            }}
        >
            <Grid
                container
            >
                {peers.length <= 4
                    ? peers.map((item, idx) => {
                        return (
                            <Grid
                                item
                                key={idx}
                                xs={6}
                                sx={{ position: "relative" }}
                            >
                                <Video text={item.nick} stream={item.stream} />
                            </Grid>
                        );
                    })
                    : peers.length <= 9
                        ? peers.map((item, idx) => (
                            <Grid
                                item
                                key={idx}
                                md={4}
                                xs={6}
                            >
                                <Video text={item.nick} stream={item.stream} />
                            </Grid>
                        ))
                        : peers.map((item, idx) => (
                            <Grid
                                item
                                key={idx}
                                md={3}
                                xs={6}
                            >
                                <Video text={item.nick} stream={item.stream} />
                            </Grid>
                        ))}
            </Grid>
            <Paper
                sx={{
                    display: "flex",
                    width: "24%",
                    minWidht: '150px',
                    backgroundColor: "#000000",
                    position: "absolute",
                    right: 0,
                    bottom: 0,
                    float: "right",
                    overflow: "hidden"
                }}
            >
                <video
                    ref={myVideo}
                    width="100%"
                    autoPlay
                    playsInline
                />
            </Paper>
        </Box>
    );
}

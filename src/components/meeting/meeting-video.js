import { Grid, Paper } from "@mui/material";
import { useRef, useEffect } from 'react';

function Video({text, stream}) {
    const ref = useRef();

    useEffect(() => {
        ref.current.srcObject = stream;
    }, [stream]);
    return (
        <Paper sx={{ height: "100%" }}>
            {text}
            <video
                ref={ref}
                width="100%"
                height="100%"
                autoPlay
                playsInline
            /></Paper>
    );
}

export function MeetingVideo({peers, myVideo}) {
    return(
        <Grid container item xs={8} spacing={1}>
            <Grid container item sx={{ height: "100%" }} spacing={0.5}>
                {peers.length <= 4
                    ? peers.map((item, idx) => {
                        return (
                            <Grid item xs={6}>
                                <Video text={item.nick} stream={item.stream}></Video>
                            </Grid>
                        );
                    })
                    : peers.length <= 9
                        ? peers.map((item, idx) => (
                            <Grid item md={4} xs={6}>
                                <Video text={item.nick} stream={item.stream}></Video>
                            </Grid>
                        ))
                        : peers.map((item, idx) => (
                            <Grid item md={3} xs={6}>
                                <Video text={item.nick} stream={item.stream}></Video>
                            </Grid>
                        ))}
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Paper sx={{ height: "80%", width: "30%", float: "right" }}>
                        <video
                            ref={myVideo}
                            width="100%"
                            height="100%"
                            autoPlay
                            playsInline
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

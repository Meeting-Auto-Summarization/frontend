import { Box, Typography } from "@mui/material";
import { useState, useEffect } from 'react';
import axios from 'axios';

export function MeetingResultToolbar({ mid }) {
    const [meeting, setMeeting] = useState();

    useEffect(() => {
        axios.get(`http://localhost:3001/db/meeting/${mid}`, { withCredentials: true }).then(res => {
            const tempMeeting = res.data.meeting;
            const members = res.data.members;

            const time = tempMeeting.time;
            const sec = parseInt(time % 60);
            const min = parseInt((time / 60) % 60);
            const hours = parseInt(time / 3600);

            tempMeeting.time = `${`${hours}:`}${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
            tempMeeting.date = new Date(Date.parse(tempMeeting.date)).toLocaleString();
            tempMeeting.members = members;

            setMeeting(tempMeeting);
        });
    }, []);

    return (
        <Box
            sx={{
                height: '100%',
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            {meeting &&
                <Box
                    sx={{ 
                        width: '100%',
                        m: 1,
                        mb: 4.5
                    }}
                >
                    <Box marginBottom={1.5} sx={{ float: 'left' }}>
                        <Typography variant="h4">
                            {meeting.title}
                        </Typography>
                    </Box>
                    <Box paddingTop={1} sx={{ float: 'right' }}>
                        <Typography variant="h6" align="right">
                            {meeting.members.join(', ')}
                        </Typography>
                        <Box sx={{ display: 'flex' }}>
                            <Typography variant="h5" marginRight={1.5}>
                                {meeting.date}
                            </Typography>
                            <Typography variant="h5">
                                {meeting.time}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    );
}

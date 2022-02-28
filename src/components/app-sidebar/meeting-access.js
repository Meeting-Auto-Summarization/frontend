import { Box, Typography, Button } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

export const MeetingAccess = ({callback}) => {
    const [title, setTitle] = useState('');

    axios.get('http://localhost:3001/db/currentMeetingTitle', { withCredentials: true }).then(res => {
        setTitle(res.data);
    });

    return (
        <Box
            sx={{
                px: 2,
                py: 3
            }}
        >
            <Typography
                color="neutral.100"
                variant="subtitle1"
            >
                진행 중인 회의
            </Typography>
            <Typography
                color="neutral.300"
                variant="body2"
                sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis'
                }}
            >
                {title}
            </Typography>
            <Box
                sx={{
                    display: 'flex',
                    mt: 2,
                    mx: 'auto',
                    width: '160px',
                    '& img': {
                        width: '100%'
                    }
                }}
            >
                <img
                    alt="Go to pro"
                    src="/static/images/sidebar_pro.png"
                />
            </Box>
            <Button
                color="secondary"
                component="a"
                fullWidth
                sx={{ mt: 2, fontSize: 18 }}
                variant="contained"
                onClick={callback}
            >
                회의 접속
                </Button>
        </Box>
    );
};
import { Box, Typography, Button } from '@mui/material';
import { useContext } from 'react';
import { UserContext } from '../../utils/context/context';
import { meetings } from '../../__mocks__/meetings';
import { useRouter } from 'next/router';

export const MeetingAccess = ({callback}) => {
    const { meetingID } = useContext(UserContext);
    const router = useRouter();

    window.handleShowResult = function handleShowResult(meetingID,hours,minutes,seconds){
        //if, host면=결과페이지로
        router.push({
            pathname: `/script-edit`, // 라우팅 id
            query: {
                mid: meetingID,
                time: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
            } // props 
        })
    }

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
            >
                {meetings.filter(meeting => meeting.id === meetingID)[0].title}
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
import { Box, Typography, Button } from '@mui/material';
import NextLink from 'next/link';
import { useContext } from 'react';
import { UserContext } from '../../utils/context/context';
import { meetings } from '../../__mocks__/meetings';

export const MeetingAccess = () => {
    const { meetingID } = useContext(UserContext);

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
                {meetings.filter(meeting => meeting.id === meetingID)[0].meetingName}
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
            <NextLink
                href="/meeting-progress"
                passHref
            >
                <Button
                    color="secondary"
                    component="a"
                    fullWidth
                    sx={{ mt: 2, fontSize: 18 }}
                    variant="contained"
                >
                    회의 접속
                </Button>
            </NextLink>
        </Box>
    );
};
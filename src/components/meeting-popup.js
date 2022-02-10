import { Box } from '@mui/material';

export const MeetingPopup = () => {
    return (
        <Box
            sx={{
                display: 'fixed',
                right: '0',
                bottom: '0'
            }}
        >
            진행 중이 회의
        </Box>
    );
};

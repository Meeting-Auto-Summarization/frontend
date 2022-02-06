import { Box, Typography } from '@mui/material';

export const MeetingListToolbar = () => {
    return(
    <Box>
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Typography variant="h4" sx={{ m: 1 }}>
                Meeting List
            </Typography>
        </Box>
    </Box>
    );
};
  
import { Box, Typography } from '@mui/material';

export const MeetingListToolbar = () => (
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
        <Typography
            sx={{ m: 1 }}
            variant="h4"
        >
            Meeting List
        </Typography>
        </Box>
    </Box>
);
  
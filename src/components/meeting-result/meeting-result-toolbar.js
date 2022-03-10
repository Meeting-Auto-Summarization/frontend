import { Box, Typography } from "@mui/material";

export function MeetingResultToolbar({ meeting }) {
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

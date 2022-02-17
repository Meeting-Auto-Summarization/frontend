import { Box, Typography } from '@mui/material';
import { meetings } from 'src/__mocks__/meetings';

export const ScriptEditToolbar = ({mid, description}) => {
    const meeting = meetings.find(m => m.id === mid);

    return (
        <Box
            sx={{
                alignItems: 'center',
                display: 'flex',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                m: -1
            }}
        >
            <Box
                sx={{ 
                    width: '100%',
                    m: 1
                }}
            >
                <Box marginBottom={1.5} sx={{ float: 'left' }}>
                    <Typography variant="h4">
                        {meeting.title}
                    </Typography>
                    <Typography variant="h6" >
                        {description}
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
        </Box>
    );
};
import { Dialog, DialogContent, DialogActions, Box, Typography, TextField, Slider, Button } from '@mui/material';

export const MeetingCodeDialog = (props) => {
    const { onClose, code, open } = props;

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogContent>
                <Box
                    m={1}
                    sx={{
                        px: 3,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography variant="h3" mb={3}>회의 코드</Typography>
                    <Typography variant="h5" mb={3}>{code}</Typography>
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={() => onClose()}>확인</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

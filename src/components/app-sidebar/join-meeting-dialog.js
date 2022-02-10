import { Dialog, DialogContent, DialogActions, Box, Typography, TextField, Button } from '@mui/material';
import { useRef } from 'react';

export const JoinMeetingDialog = (props) => {
    const { onClose, onSubmit, open } = props;
    const meetingCodeRef = useRef('');

    const handleSubmit = () => {
        const meetingCode = meetingCodeRef.current.value;
        onSubmit(meetingCode);
        onClose();
    };

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogContent>
                <Box m={1}>
                    <Typography>회의 코드</Typography>
                    <TextField
                        label="회의 코드"
                        variant="outlined"
                        sx={{ mt: '10px' }} 
                        inputRef={meetingCodeRef} />
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={handleSubmit}>회의 참여</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
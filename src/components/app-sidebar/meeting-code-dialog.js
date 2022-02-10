import { Dialog, DialogContent, DialogActions, Box, Typography, TextField, Slider, Button } from '@mui/material';

export const MeetingCodeDialog = (props) => {
    const { onClose, code, open } = props;

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogContent>
                <Box m={1}>
                    <Typography>회의 제목</Typography>
                    <TextField
                        label="회의 제목"
                        variant="outlined"
                        sx={{ mt: '10px' }} 
                        inputRef={meetingNameRef} />
                </Box>
                <Box m={1}>
                    <Typography>인원 제한</Typography>
                    <Slider
                        defaultValue={4}
                        valueLabelDisplay="auto"
                        min={2}
                        max={10} 
                        marks={marks}
                        sx={{ mt: '10px' }}
                        onChangeCommitted={(e, val) => setLimitNum(val)} />
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={handleSubmit}>확인</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};

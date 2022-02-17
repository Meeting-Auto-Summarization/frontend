import { Dialog, DialogContent, DialogActions, Box, Typography, TextField, Slider, Button } from '@mui/material';
import { useState, useRef } from 'react';

const marks = [
	{ value: 2, label: '2명' },
	{ value: 4, label: '4명' },
	{ value: 6, label: '6명' },
	{ value: 8, label: '8명' },
	{ value: 10, label: '10명' },
];

export const CreateMeetingDialog = (props) => {
    const { onClose, onSubmit, open } = props;
    const titleRef = useRef('');
    const [limitNum, setLimitNum] = useState(4);

    const handleSubmit = () => {
        const title = titleRef.current.value;
        onSubmit(title, limitNum);
        onClose();
    };

    return (
        <Dialog open={open} onClose={() => onClose()}>
            <DialogContent>
                <Box m={1}>
                    <Typography>회의 제목</Typography>
                    <TextField
                        label="회의 제목"
                        variant="outlined"
                        sx={{ mt: '10px' }} 
                        inputRef={titleRef} />
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
                    <Button variant="contained" onClick={handleSubmit}>회의 생성</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    );
};
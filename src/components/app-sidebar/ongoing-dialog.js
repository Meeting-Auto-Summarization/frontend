import { Dialog, DialogContent, Box, Typography, DialogActions, Button } from '@mui/material';

export const OngoingDialog = (props) => {
    const { onClose, open } = props;

    return (
        <Dialog open={open}>
            <DialogContent>
                <Box m={2}>
                    <Typography variant="h6">이미 참여 중인 회의가 있습니다.</Typography>
                </Box>
                <DialogActions>
                    <Button variant="contained" onClick={() => onClose()}>확인</Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    )
};
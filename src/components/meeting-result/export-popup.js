import {
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Description, Close } from "@mui/icons-material";
import { WordIcon } from "../../icons/word";
import axios from "axios";
import qs from "qs";

export function ExportPopup(props) {
    const { handleClose, open, meetings, reports } = props;
    return (
        <Dialog onClose={handleClose} open={open}>
            <DialogTitle>양식 선택</DialogTitle>
                {open ? (
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                        }}
                    >
                        <Close />
                    </IconButton>
                ) : null}
            <DialogContent>
                <IconButton
                    onClick={() => {                
                        axios({
                            url: 'http://localhost:3001/py/docx', //your url
                            method: 'GET',
                            responseType: 'blob', // important
                            params: {
                                data: reports
                            },
                            paramsSerializer: params => {
                                return qs.stringify(params)
                            }
                        },
                        { withCredentials: true })
                        .then(res => {
                            console.log(res)
                            const url = window.URL.createObjectURL(new Blob([res.data]));
                            const link = document.createElement('a');
                            link.href = url;
                            link.setAttribute('download', 'file.docx'); //or any other extension
                            document.body.appendChild(link);
                            link.click();
                        });
                    }}
                >
                    <Grid>
                        <Grid item>
                            <WordIcon sx={{ fontSize: 80 }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="button"
                                color="text.primary"
                                sx={{ display: "inline" }}
                            >
                                {`\u00a0\u00a0\u00a0\u00a0`}docx
                            </Typography>
                        </Grid>
                    </Grid>
                </IconButton>
                <IconButton>
                    <Grid>
                        <Grid item>
                            <Description sx={{ fontSize: 100 }} />
                        </Grid>
                        <Grid item>
                            <Typography
                                variant="button"
                                color="text.primary"
                                sx={{ display: "inline" }}
                            >
                                txt
                            </Typography>
                        </Grid>
                    </Grid>
                </IconButton>
            </DialogContent>
        </Dialog>
    );
}

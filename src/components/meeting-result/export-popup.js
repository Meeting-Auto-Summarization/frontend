import {
  Typography,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { WordIcon } from "../../icons/word";
import { TXTIcon } from "../../icons/txt"
import axios from "axios";

export function ExportPopup({ isScript, handleClose, open, meeting, script, report }) {

    const downloadScriptDocx = () => {
        axios.post('http://127.0.0.1:5000/script-docx',
            { meeting: meeting, script: script },
            { responseType: 'blob' },
        ).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_report.docx`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadReportDocx = () => {
        axios.post('http://127.0.0.1:5000/report-docx',
            { meeting: meeting, report: report },
            { responseType: 'blob' },
        ).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_report.docx`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadScriptTxt = () => {
        axios.post('http://127.0.0.1:5000/script-txt',
            { meeting: meeting, script: script },
            { responseType: 'blob' },
        ).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_script.txt`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadReportTxt = () => {
        axios.post('http://127.0.0.1:5000/report-txt',
            { meeting: meeting, report: report },
            { responseType: 'blob' },
        ).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_report.txt`);
            document.body.appendChild(link);
            link.click();
        });
    };

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
            <DialogContent
                sx={{
                    display: 'flex',
                    flexDirection: 'row'
                }}
            >
                <IconButton
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={() => {
                        isScript
                            ? downloadScriptDocx()
                            : downloadReportDocx()
                    }}
                >
                    <WordIcon sx={{ fontSize: 100 }} />
                    <Typography
                        variant="button"
                        color="text.primary"
                        fontSize={18}
                    >
                        docx
                    </Typography>
                </IconButton>
                <IconButton
                    sx={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}
                    onClick={() => {
                        isScript
                            ? downloadScriptTxt()
                            : downloadReportTxt()
                    }}
                >
                    <TXTIcon sx={{ fontSize: 100 }} />
                    <Typography
                        variant="button"
                        color="text.primary"
                        fontSize={18}
                    >
                        txt
                    </Typography>
                </IconButton>
            </DialogContent>
        </Dialog>
    );
}

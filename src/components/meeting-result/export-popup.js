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
<<<<<<< HEAD
        axios.post('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/py/script-docx',
=======
        axios.post('http://203.252.166.225:8000/script-docx',
>>>>>>> front2
            { meeting: meeting, script: script },
            { responseType: 'blob' },
        ).then(res => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_script.docx`);
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadReportDocx = () => {
<<<<<<< HEAD
        axios.post('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/py/report-docx',
=======
        axios.post('http://203.252.166.225:8000/report-docx',
>>>>>>> front2
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
<<<<<<< HEAD
        axios.post('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/py/script-txt',
=======
        axios.post('http://203.252.166.225:8000/script-txt',
>>>>>>> front2
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
<<<<<<< HEAD
        axios.post('https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com:8000/report-txt',
=======
        axios.post('http://203.252.166.225:8000/report-txt',
>>>>>>> front2
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

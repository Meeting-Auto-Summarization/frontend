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
import qs from "qs";

export function ExportPopup({ isScript, handleClose, open, meeting, script, report }) {
    const downloadScriptDocx = () => {
        axios({
            url: 'https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/py/script-docx', //your url
            method: 'GET',
            responseType: 'blob', // important
            params: {
                meeting: meeting,
                script: script
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }, { withCredentials: true }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_script.docx`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadReportDocx = () => {
        axios({
            url: 'https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/py/report-docx', //your url
            method: 'GET',
            responseType: 'blob', // important
            params: {
                meeting: meeting,
                report: report
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }, { withCredentials: true }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_report.docx`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadScriptTxt = () => {
        axios({
            url: 'https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/py/script-txt', //your url
            method: 'GET',
            responseType: 'blob', // important
            params: {
                meeting: meeting,
                script: script
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }, { withCredentials: true }).then(res => {
            console.log(res)
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_script.txt`); //or any other extension
            document.body.appendChild(link);
            link.click();
        });
    };

    const downloadReportTxt = () => {
        axios({
            url: 'https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/py/report-txt', //your url
            method: 'GET',
            responseType: 'blob', // important
            params: {
                meeting: meeting,
                report: report
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }, { withCredentials: true }).then(res => {
            const url = window.URL.createObjectURL(new Blob([res.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${meeting.title}_report.txt`); //or any other extension
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

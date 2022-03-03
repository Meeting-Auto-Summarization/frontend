import {
    Button,
    styled,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { ExportPopup } from "./export-popup";

const SummaryCard = styled(Card)({
    background: "#FEFEEE",
    color: "#000000",
});

const SummaryCardButton = styled(Button)({
    background: "#FFFFD4",
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "20px",
    marginLeft: "auto", // card버튼 오른쪽으로 보냄
    "&:hover": {
        backgroundColor: "#FFFFD4",
        color: "#808080",
    },
});

export function SummaryResultCard() {
    const [titleList, setTitleList] = useState([]);
    const [summaryList, setSummaryList] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/db/currentMeetingReport`, { withCredentials: true }).then(res => {
            const report = res.data;
            const tempTitleList = new Array(report.length);
            const tempSummaryList = new Array(report.length);

            for (var i = 0; i < report.length; i++) {
                tempTitleList[i] = new Array(report[i].length);
                tempSummaryList[i] = new Array(report[i].length);
            }

            for (var i = 0; i < tempTitleList.length; i++) {
                for (var j = 0; j < tempTitleList[i].length; j++) {
                    tempTitleList[i][j] = report[i][j].title;
                    tempSummaryList[i][j] = report[i][j].summary;
                }
            }

            setTitleList(tempTitleList);
            setSummaryList(tempSummaryList);
        });
    }, []);
    
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SummaryCard sx={{ mt: 1 }}>
            <CardHeader
                title="Summary"
                align="center"
                titleTypographyProps={{
                    variant: "h4"
                }}
            />
            <CardContent
                sx={{
                    paddingTop: 0,
                    paddingX: 5,
                    height: '50vh',
                    overflow: 'auto'
                }}
            >
                {titleList.map((headTitle, idx) => {
                    return(
                        <>
                            {headTitle.map((subTitle, subidx) => {
                                return(
                                    <>
                                        {subidx === 0
                                            ? <Typography variant="h5">{`${idx + 1}. ${subTitle}`}</Typography>
                                            : <Typography variant="h6" ml={4}>{`${String.fromCharCode(subidx + 97)}. ${subTitle}`}</Typography>
                                        }
                                        {/* {subidx === 0
                                            ? <Typography variant="subtitle1" ml={4} mb={1}>{`${summaryList[idx][subidx]}`}</Typography>
                                            : <Typography variant="subtitle1" ml={8} mb={1}>{`${summaryList[idx][subidx]}`}</Typography>
                                        } */}
                                    </>
                                );
                            })}
                        </>
                    );
                })}
            </CardContent>
            <CardActions>
                <SummaryCardButton onClick={handleClickOpen}>Export</SummaryCardButton>
            </CardActions>
            <ExportPopup handleClose={handleClose} open={open} />
        </SummaryCard>
    );
}

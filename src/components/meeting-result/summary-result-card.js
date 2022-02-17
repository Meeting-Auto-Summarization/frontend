import {
    Button,
    styled,
    Typography,
    Grid,
    Card,
    CardContent,
    CardHeader,
    CardActions,
} from "@mui/material";
import { useState } from "react";
import { meetings } from "../../__mocks__/meetings";
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

export function SummaryResultCard({mid}) {
    const reports = meetings.find(m => m.id === mid).reports;
    const titleList = reports.title;
    const summaryList = reports.summary;
    
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
                    console.log(headTitle)
                    return(
                        <>
                            {headTitle.map((subTitle, subidx) => {
                                return(
                                    <>
                                        {subidx === 0
                                            ? <Typography variant="h5">{`${idx + 1}. ${subTitle}`}</Typography>
                                            : <Typography variant="h6" ml={4}>{`${String.fromCharCode(subidx + 97)}. ${subTitle}`}</Typography>
                                        }
                                        {subidx === 0
                                            ? <Typography variant="subtitle1" ml={4} mb={1}>{`${summaryList[idx][subidx]}`}</Typography>
                                            : <Typography variant="subtitle1" ml={8} mb={1}>{`${summaryList[idx][subidx]}`}</Typography>
                                        }
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

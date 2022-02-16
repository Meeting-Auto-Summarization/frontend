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
import { v4 as uuid } from 'uuid';

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

    console.log(titleList)
    console.log(summaryList)

    return (
        <SummaryCard sx={{ mt: 1 }}>
            <CardHeader title="Summary" />
            <CardContent>
                <Grid align="left" sx={{ overflow: "auto", height: "25vh" }}>
                    {titleList.map((title, idx) => (
                        <Grid
                            key={idx}
                            item
                        >
                            <Grid
                                key={uuid()}
                            >
                                <Typography variant="h6">
                                    {`${idx + 1}. ${title}`}
                                </Typography>
                            </Grid>
                            {summaryList[idx].map((content, num) => (
                                <Grid
                                    key={uuid()}
                                >
                                    <Typography variant="value">
                                        {/* {`\u00a0\u00a0\u00a0${num + 1}) ${content}`} */}
                                        {`\u00a0\u00a0\u00a0 ${content}`}
                                    </Typography>
                                </Grid>
                            ))}
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
            <CardActions>
                <SummaryCardButton onClick={handleClickOpen}>Export</SummaryCardButton>
            </CardActions>
            <ExportPopup handleClose={handleClose} open={open} />
        </SummaryCard>
    );
}

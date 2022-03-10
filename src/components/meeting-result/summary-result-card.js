import { useState } from "react";
import {
    Box,
    Button,
    styled,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
} from "@mui/material";
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

export function SummaryResultCard({ meeting, report }) {   
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
                {report && report.map((head, index) => {
                    return (
                        <Box key={head[0]._id} mb={3}>
                            {head.map((tail, subIndex) => {
                                return (
                                    <Box key={tail._id}>
                                        {subIndex === 0
                                            ? <Typography variant="h4">{`${index + 1}. ${tail.title}`}</Typography>
                                            : <Typography variant="h5" ml={4}>{`${String.fromCharCode(subIndex + 96)}. ${tail.title}`}</Typography>
                                        }
                                        {subIndex !== 0 &&
                                            <Typography variant="h6" ml={8}>{`${tail.summary}`}</Typography>
                                        }
                                    </Box>
                                );
                            })}
                        </Box>
                    )
                })}
            </CardContent>
            <CardActions>
                <SummaryCardButton onClick={handleClickOpen}>Export</SummaryCardButton>
            </CardActions>
            <ExportPopup isScript={false} handleClose={handleClose} open={open} meeting={meeting} report={report} />
        </SummaryCard>
    );
}

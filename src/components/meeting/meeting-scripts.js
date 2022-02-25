import { Box, Typography, Grid, Checkbox, Button, styled } from "@mui/material";
import { useState, useCallback, useEffect } from "react";

const SummaryButton = styled(Button)({
    background: "#F1FAEE",
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "15px",
    marginLeft: "auto",
    "&:hover": {
        backgroundColor: "#F1FAEE",
        color: "#808080",
    },
});

export function MeetingScripts({messageList, handleSummaryOnOff, summaryFlag, setSummaryFlag}) {
    const handleSummaryButton = () => {
        if (summaryFlag) {
            handleSummaryOnOff(false);
            setSummaryFlag(false);
        } else {
            handleSummaryOnOff(true);
            setSummaryFlag(true);
        }
    };
    const [checkedList, setCheckedLists] = useState([]);
    const onCheckedElement = useCallback(
        (checked, list) => {
            if (checked) {
                setCheckedLists([...checkedList, list]);
            } else {
                setCheckedLists(checkedList.filter((el) => el !== list));
            }
        },
        [checkedList]
    );

    useEffect(() => {
        // console.log(messageList);
    }, [messageList])

    return (
        <Grid item container spacing={1} xs={4}>
            <Box>
                <Box display="flex">
                    <Typography
                        variant="h6"
                        align="left"
                        sx={{ m: 2, flexGrow: 1, display: "inline" }}
                    >
                        회의 명
                    </Typography>
                    <SummaryButton
                        href="#!"
                        variant="contained"
                        onClick={handleSummaryButton}
                        sx={{ my: 1, mx: 1.5 }}
                    >
                        {summaryFlag
                            ? "요약중지"
                            : "요약시작"
                        }
                    </SummaryButton>
                </Box>
                <Box
                    backgroundColor="#F1FAEE"
                >
                    <Grid
                        item
                        container
                        sx={{
                            overflow: "auto",
                            height: "100%",
                            minHeight: "100px"
                        }}
                    >
                        {messageList.map((item) => {
                            const time = item.time;
                            const seconds = parseInt(time % 60);
                            const minutes = parseInt((time / 60) % 60);
                            const hours = parseInt(time / 3600);
                            
                            return(
                                <Grid
                                    container
                                    xs={12}
                                >
                                    <Grid item xs={2} md={1}>
                                        <Checkbox
                                            onChange={(e) => onCheckedElement(e.target.checked, item)}
                                            checked={!!checkedList.includes(item)}
                                            inputProps={{
                                                "aria-label": "controlled",
                                            }}
                                            sx={{ padding: 0 }}
                                        />
                                    </Grid>
                                    <Grid item xs={3} md={2}>
                                        <Typography
                                            variant="value"
                                            color="text.primary"
                                            sx={{ display: "inline" }}
                                        >
                                            {hours != 0 && `${hours}:`}
                                            {minutes < 10 ? `0${minutes}` : minutes}
                                            :
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} md={2}>
                                        <Typography
                                            variant="value"
                                            color="text.primary"
                                            sx={{ display: "inline" }}
                                        >
                                            {item.nick}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={4} md={6} align="left">
                                        <Typography
                                            variant="value"
                                            color="text.primary"
                                            sx={{
                                                display: "inline",
                                            }}
                                        >
                                            {item.message}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Box>
            </Box>
        </Grid>
    );
}

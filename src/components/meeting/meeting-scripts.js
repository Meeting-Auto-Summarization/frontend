import {
    styled,
    Box,
    Typography,
    Checkbox,
    Button,
    Card,
    CardContent,
    Table,
    TableHead,
    TableRow,
    TableCell,
    tableCellClasses,
    TableBody,
} from "@mui/material";
import { useState, useCallback } from "react";

const SummaryButton = styled(Button)(({ theme }) => ({
    background: "#c4e3ba",
    color: "#000000",
    minWidth: "96px",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "15px",
    marginLeft: "auto",
    boxShadow: theme.shadows[5],
    "&:hover": {
        backgroundColor: "#e4f5df",
    },
}));

const ScriptsCard = styled(Card)(({ theme }) => ({
    background: "#F1FAEE",
    color: "#000000",
    boxShadow: theme.shadows[10]
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#70a17b",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "#e4f5df",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#c4e3ba",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
}));

export function MeetingScripts({messageList, handleSummaryOnOff, summaryFlag, setSummaryFlag, title}) {
    const [checkedList, setCheckedLists] = useState([]);

    const handleSummaryButton = () => {
        if (summaryFlag) {
            handleSummaryOnOff(false);
            setSummaryFlag(false);
        } else {
            handleSummaryOnOff(true);
            setSummaryFlag(true);
        }
    };
    
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

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
                py: 2
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center"                    
                }}
            >
                <Typography
                    variant="h4"
                    align="left"
                    sx={{
                        ml: 1,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {`회의 명 : ${title}`}
                </Typography>
                <Box sx={{ flexGrow: 1 }} />
                <SummaryButton
                    variant="contained"
                    onClick={handleSummaryButton}
                    sx={{ my: 1, mr: 3, ml: 1 }}
                >
                    {summaryFlag
                        ? "요약 중지"
                        : "요약 시작"
                    }
                </SummaryButton>
            </Box>
            <ScriptsCard
                sx={{
                    height: "100%",
                    mt: 1
                }}
            >
                <CardContent
                    sx={{
                        overflow: 'auto'
                    }}
                >
                    <Table>
                        <TableHead
                            sx={{
                                background: '#FF7BA9'
                            }}
                        >
                            <TableRow>
                                <StyledTableCell>
                                    
                                </StyledTableCell>
                                <StyledTableCell>
                                    Time
                                </StyledTableCell>
                                <StyledTableCell>
                                    Name
                                </StyledTableCell>
                                <StyledTableCell>
                                    Content
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {messageList.map((line) => {
                                const time = line.time;
                                const seconds = parseInt(time % 60);
                                const minutes = parseInt((time / 60) % 60);
                                const hours = parseInt(time / 3600);

                                return(
                                    <StyledTableRow
                                        // key={line.id}
                                    >
                                        <StyledTableCell sx={{ paddingY: 1 }}>
                                            <Checkbox
                                                onChange={(e) => onCheckedElement(e.target.checked, line)}
                                                checked={!!checkedList.includes(line)}
                                                inputProps={{
                                                    "aria-label": "controlled",
                                                }}
                                                sx={{ padding: 0 }}
                                            />
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ paddingY: 1 }}>
                                            <Typography
                                                variant="subtitle1"
                                                color="text.primary"
                                                sx={{ display: "inline" }}
                                            >
                                                {hours != 0 && `${hours}:`}
                                                {minutes < 10 ? `0${minutes}` : minutes}
                                                :
                                                {seconds < 10 ? `0${seconds}` : seconds}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell sx={{ paddingY: 1 }}>
                                            <Typography
                                                variant="subtitle1"
                                                color="text.primary"
                                                sx={{ display: "inline", whiteSpace: "nowrap" }}
                                            >
                                                {line.nick}
                                            </Typography>
                                        </StyledTableCell>
                                        <StyledTableCell
                                            
                                            sx={{
                                                overflow: 'hidden',
                                                paddingY: 1
                                            }}
                                        >
                                            <Typography
                                                variant="body1"
                                                color="text.primary"
                                                sx={{ display: "inline", wordBreak: "break-all" }}
                                            >
                                                {line.content}
                                            </Typography>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                );
                            })}
                        </TableBody>
                    </Table>  
                </CardContent>
            </ScriptsCard>
        </Box>
    );
}

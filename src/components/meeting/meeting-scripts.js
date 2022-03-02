
import {
    styled,
    Box,
    Typography,
    Checkbox,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    tableCellClasses,
    TableBody,
} from "@mui/material";
import axios from 'axios';

const SummaryButton = styled(Button)(({ theme }) => ({
    background: "#c4e3ba",
    color: "#000000",
    minWidth: "96px",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "15px",
    boxShadow: theme.shadows[5],
    "&:hover": {
        backgroundColor: "#e4f5df",
    },
}));

const ScriptsBox = styled(Box)({
    display: "flex",
    flexDirection: "column",
    height: "100%",
    py: 2,
    background: "#F1FAEE",
    color: "#000000",
    
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#70a17b",
        color: theme.palette.common.white,
        fontSize: 14
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)({
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
});

export function MeetingScripts({ messageList, handleSummaryOnOff, summaryFlag, setSummaryFlag, title }) {
    const handleSummaryButton = () => {
        if (summaryFlag) {
            handleSummaryOnOff(false);
            setSummaryFlag(false);
        } else {
            handleSummaryOnOff(true);
            setSummaryFlag(true);
        }
    };

    const handleCheck = (e, index) => {
        axios.post('http://localhost:3001/db/scriptChecked',
            { index: index, isChecked: e.target.checked },
            { withCredentials: true })
        .then(res => {
            console.log(res.data);
        });
    };

    return (
        <ScriptsBox>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center" ,
                    p: 2,                   
                }}
            >
                <Typography
                    variant="h4"
                    align="left"
                    sx={{
                        fontSize: 30,
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
                >
                    {summaryFlag
                        ? "요약 중지"
                        : "요약 시작"
                    }
                </SummaryButton>
            </Box>
            <Box sx={{ overflow: 'auto' }}>
                <Table>
                    <TableHead>
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
                        {messageList.map((line, index) => {
                            const time = line.time;
                            const seconds = parseInt(time % 60);
                            const minutes = parseInt((time / 60) % 60);
                            const hours = parseInt(time / 3600);

                            return(
                                <StyledTableRow
                                    key={index}
                                >
                                    <StyledTableCell sx={{ paddingY: 1 }}>
                                        <Checkbox
                                            defaultChecked={line.isChecked}
                                            onChange={(e) => handleCheck(e, index)}
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
            </Box>
        </ScriptsBox>
    );
}

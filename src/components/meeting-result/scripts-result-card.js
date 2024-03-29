import {
    styled,
    Typography,
    Card,
    CardContent,
    CardHeader,
    CardActions,
    Button,
    Table,
    TableHead,
    TableRow,
    TableCell,
    tableCellClasses,
    TableBody,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from "@mui/material";
import { useState } from "react";
import { ExportPopup } from "./export-popup";
import Link from 'next/link';

const ScriptsCard = styled(Card)({
    background: "#FFF3FF",
    color: "#000000",
});

const ScriptsCardButton = styled(Button)({
    background: "#FEDDFE",
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "12px",
    fontSize: "20px",
    marginLeft: "auto",
    "&:hover": {
        backgroundColor: "#FEDDFE",
        color: "#808080",
    },
});

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#cfa1cf",
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)({
    '&:nth-of-type(odd)': {
        backgroundColor: "#ffe8ff",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#ffdbff",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
});

export const ScriptsResultCard = ({ mid, meeting, script }) => {
    const [open, setOpen] = useState(false);
    const [member, setMember] = useState(0);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChangeMember = (e) => {
        setMember(e.target.value);
    };
    
    return (
        <ScriptsCard sx={{ mt: 1 }}>
            <CardHeader
                title="Scripts"
                align="center"
                titleTypographyProps={{
                    variant: "h4"
                }}
            />
            <CardContent
                sx={{
                    paddingTop: 0,
                    height: '50vh',
                    overflow: 'auto'
                }}
            >
                <FormControl fullWidth>
                    <InputLabel>Members</InputLabel>
                    <Select
                        value={member}
                        onChange={handleChangeMember}
                    >
                        <MenuItem value={0}>All Members</MenuItem>
                        {meeting && meeting.members.map((member, index) => {
                            return (
                                <MenuItem key={index} value={index + 1}>{member}</MenuItem>
                            );
                        })}
                    </Select>
                </FormControl>
                <Table>
                    <TableHead
                        sx={{
                            background: '#FF7BA9'
                        }}
                    >
                        <TableRow>
                            <StyledTableCell>
                                Name
                            </StyledTableCell>
                            <StyledTableCell>
                                Time
                            </StyledTableCell>
                            <StyledTableCell>
                                Content
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {script && script.map((line) => {
                            if (member !== 0 && line.nick !== meeting.members[member - 1]) {
                                return;
                            }
                            const time = line.time;
                            const seconds = parseInt(time % 60);
                            const minutes = parseInt((time / 60) % 60);
                            const hours = parseInt(time / 3600);
                            
                            return(
                                <StyledTableRow
                                    hover
                                    key={line._id}
                                >
                                    <StyledTableCell width="16%" sx={{ paddingY: 1 }}>
                                        <Typography
                                            variant="h6"
                                            color="text.primary"
                                            sx={{ display: "inline" }}
                                        >
                                            {line.nick}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell width="16%" sx={{ paddingY: 1 }}>
                                        <Typography
                                            variant="subtitle1"
                                            color="text.primary"
                                            sx={{ display: "inline" }}
                                        >
                                            {hours !== 0 && `${hours}:`}
                                            {minutes < 10 ? `0${minutes}` : minutes}
                                            :
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell width="68%" sx={{ paddingY: 1 }}>
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
            <CardActions>
                <Link
                    href={{
                        pathname: `/summarizer`, // 라우팅 id
                        query: { mid: mid }
                    }}
                >
                    <ScriptsCardButton>Modify</ScriptsCardButton>
                </Link>
                <ScriptsCardButton onClick={handleClickOpen}>Export</ScriptsCardButton>
            </CardActions>
            <ExportPopup isScript handleClose={handleClose} open={open} meeting={meeting} script={script} />
        </ScriptsCard>
    );
}

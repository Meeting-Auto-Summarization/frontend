import {
    styled,
    Typography,
    Grid,
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
    TableBody
} from "@mui/material";
import { useState } from "react";
import { meetings } from "../../__mocks__/meetings";
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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
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
}));

export const ScriptsResultCard = ({mid}) => {
    const scripts = meetings.find(m => m.id === mid).scripts;
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        {scripts.map((line) => {
                            return(
                                <StyledTableRow
                                    hover
                                    key={line.id}
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
                                            {line.time}
                                        </Typography>
                                    </StyledTableCell>
                                    <StyledTableCell width="68%" sx={{ paddingY: 1 }}>
                                        <Typography
                                            variant="body1"
                                            color="text.primary"
                                            sx={{ display: "inline" }}
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
                        pathname: `/script-edit`, // 라우팅 id
                        query: { mid: mid }, // props 
                    }}
                    as={`/script-edit`}
                >
                    <ScriptsCardButton>Modify</ScriptsCardButton>
                </Link>
                <ScriptsCardButton onClick={handleClickOpen}>Export</ScriptsCardButton>
            </CardActions>
            <ExportPopup handleClose={handleClose} open={open} />
        </ScriptsCard>
    );
}

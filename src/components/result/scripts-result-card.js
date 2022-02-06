import {
  styled,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Button,
  Box,
} from "@mui/material";
import { useState } from "react";
import { scripts } from "../../__mocks__/scripts";
import { ExportPopup } from "./export-popup";

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

export const ScriptsResultCard = (mid) => {
    console.log(scripts.filter(meeting => meeting.id === mid.mid)[0])
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    
    return (
        <ScriptsCard sx={{ mt: 1 }}>
            <CardHeader title="Scripts" align="center" />
                <CardContent>
                    <Grid container>
                        <Grid item container>
                            <Grid item xs={2}>
                                <Typography
                                    variant="h6"
                                    color="text.primary"
                                    sx={{ display: "inline" }}
                                >
                                Name
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <Typography
                                variant="h6"
                                color="text.primary"
                                sx={{ display: "inline" }}
                                >
                                Time
                                </Typography>
                            </Grid>
                            <Grid item xs={8}>
                                <Typography
                                    variant="h6"
                                    color="text.primary"
                                    sx={{ display: "inline" }}
                                >
                                Contents
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item container sx={{ overflow: "auto", height: "25vh" }}>
                            <Box width="100%">
                                {scripts.filter(meeting => meeting.id === mid.mid)[0].script.map((script) => {
                                    return(
                                        <Grid
                                            key={script.id}
                                            container
                                            display="flex"
                                        >
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant="value"
                                                    color="text.primary"
                                                    sx={{ display: "inline" }}
                                                >
                                                    {script.name}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Typography
                                                    variant="value"
                                                    color="text.primary"
                                                    sx={{ display: "inline" }}
                                                >
                                                    {`\u00a0`}
                                                    {script.time}
                                                </Typography>
                                            </Grid>
                                            <Grid item xs={8} align="left">
                                                <Typography
                                                    variant="value"
                                                    color="text.primary"
                                                    sx={{ display: "inline" }}
                                                >
                                                    {script.content}
                                                </Typography>
                                            </Grid>
                                        </Grid>
                                    );
                                })}
                            </Box>
                        </Grid>
                    </Grid>
                </CardContent>
            <CardActions>
                <ScriptsCardButton>Modify</ScriptsCardButton>
                <ScriptsCardButton onClick={handleClickOpen}>Export</ScriptsCardButton>
            </CardActions>
            <ExportPopup handleClose={handleClose} open={open} />
        </ScriptsCard>
    );
}

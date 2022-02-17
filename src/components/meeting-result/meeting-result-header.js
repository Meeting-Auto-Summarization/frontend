import { Typography, Grid } from "@mui/material";
import { meetings } from '../../__mocks__/meetings';

export function MeetingResultHeader({mid}) {
    const meeting = meetings.find(meeting => meeting.id === mid)

    return (
        <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6} align="left">
                <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ display: "inline" }}
                >
                    {meeting.title}
                </Typography>
            </Grid>
            <Grid item xs={6} align="right">
                <Typography
                    variant="h4"
                    color="text.primary"
                    sx={{ display: "inline" }}
                >
                    {meeting.date}
                </Typography>
            </Grid>
            <Grid item xs={6} align="left">
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ display: "inline" }}
                >
                    {meeting.members.join(', ')}
                </Typography>
            </Grid>
            <Grid item xs={6} align="right">
                <Typography
                    variant="h6"
                    color="text.primary"
                    sx={{ display: "inline" }}
                >
                    {meeting.time}
                </Typography>
            </Grid>
        </Grid>
    );
  }

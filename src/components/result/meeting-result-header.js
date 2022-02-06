import { Typography, Grid } from "@mui/material";

export function MeetingResultHeader() {
  return (
    <Grid container spacing={2} sx={{ mt: 1 }}>
      <Grid item xs={6} align="left">
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ display: "inline" }}
        >
          My First Meeting
        </Typography>
      </Grid>
      <Grid item xs={6} align="right">
        <Typography
          variant="h4"
          color="text.primary"
          sx={{ display: "inline" }}
        >
          20210123
        </Typography>
      </Grid>
      <Grid item xs={6} align="left">
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ display: "inline" }}
        >
          김민수 이민수 신민수
        </Typography>
      </Grid>
      <Grid item xs={6} align="right">
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ display: "inline" }}
        >
          30:01
        </Typography>
      </Grid>
    </Grid>
  );
}

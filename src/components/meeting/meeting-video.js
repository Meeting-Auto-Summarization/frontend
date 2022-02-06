import { Grid, Paper } from "@mui/material";

export function MeetingVideo() {
    const member = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const len = member.length;
    return (
        <Grid item xs={8} spacing={1}>
            <Grid container item sx={{ height: "100%" }} spacing={0.5}>
                {len <= 4
                ? member.map((_item, idx) => (
                    <Grid item xs={6}>
                        <Paper sx={{ height: "100%" }}>참가자{idx}</Paper>
                    </Grid>
                ))
                : len <= 9
                ? member.map((item, idx) => (
                    <Grid item md={4} xs={6}>
                        <Paper sx={{ height: "100%" }}>참가자{idx}</Paper>
                    </Grid>
                ))
                : member.map((item, idx) => (
                    <Grid item md={3} xs={6}>
                        <Paper sx={{ height: "100%" }}>참가자{idx}</Paper>
                    </Grid>
                ))}
                <Grid item xs={12} sx={{ mb: 1 }}>
                    <Paper align sx={{ height: "100%", width: "25%", float: "right" }}>
                        본인
                    </Paper>
                </Grid>
            </Grid>
        </Grid>
    );
}

import { Grid, Box } from "@mui/material";
import { MeetingScripts } from "../components/meeting/meeting-scripts";
import { MeetingVideo } from "../components/meeting/meeting-video";
import { ProgrssInfo } from "../components/meeting/progress-info";
import { AppLayout } from "../components/app-layout";
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';

const MeetingProgrsssPage = () => {
    const { isLogin } = useContext(UserContext);

    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    if (!isLogin) {
        return null;
    }

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
            }}
        >
            <ProgrssInfo />
            <Grid container spacing={2} sx={{ height: "100%", flex: "1" }}>
                <MeetingVideo />
                <MeetingScripts />
            </Grid>
        </Box>
    );
};

MeetingProgrsssPage.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingProgrsssPage;

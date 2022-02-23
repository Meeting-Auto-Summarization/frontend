import { Box, Container, Grid } from "@mui/material";
import { MeetingResultToolbar } from "../components/meeting-result/meeting-result-toolbar";
import { ScriptsResultCard } from "../components/meeting-result/scripts-result-card";
import { SummaryResultCard } from "../components/meeting-result/summary-result-card";
import { AppLayout } from "../components/app-layout";
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';

const MeetingResult = () => {
    const router = useRouter();
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
        <>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    pt: 8
                }}
            >
                <Container maxWidth={false}>
                    <MeetingResultToolbar />
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            sm={12}
                            md={6}
                        >
                            <ScriptsResultCard />
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            md={6}
                        >
                            <SummaryResultCard />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

MeetingResult.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingResult;

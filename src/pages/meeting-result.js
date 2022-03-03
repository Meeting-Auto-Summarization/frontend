import { useContext, useEffect } from 'react';
import { Box, Container, Grid } from "@mui/material";
import { MeetingResultToolbar } from "../components/meeting-result/meeting-result-toolbar";
import { ScriptsResultCard } from "../components/meeting-result/scripts-result-card";
import { SummaryResultCard } from "../components/meeting-result/summary-result-card";
import { AppLayout } from "../components/app-layout";
import { useRouter } from 'next/router';
import { UserContext } from '../utils/context/context';
import queryString from 'query-string';

const MeetingResult = () => {
    const router = useRouter();
    const { isLogin } = useContext(UserContext);
    let mid = '';
    
    if (typeof window !== "undefined") {
        mid = queryString.parse(location.search).mid;
	}

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
                    <MeetingResultToolbar mid={mid} />
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            sm={12}
                            md={6}
                        >
                            <ScriptsResultCard mid={mid} />
                        </Grid>
                        <Grid
                            item
                            sm={12}
                            md={6}
                        >
                            <SummaryResultCard mid={mid} />
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

import { useContext, useEffect, useState } from 'react';
import { Box, Container, Grid } from "@mui/material";
import { MeetingResultToolbar } from "../components/meeting-result/meeting-result-toolbar";
import { ScriptsResultCard } from "../components/meeting-result/scripts-result-card";
import { SummaryResultCard } from "../components/meeting-result/summary-result-card";
import { AppLayout } from "../components/app-layout";
import { useRouter } from 'next/router';
import { UserContext } from '../utils/context/context';
import queryString from 'query-string';
import axios from 'axios';
import { SERVERURL } from 'src/config/config';

const MeetingResult = () => {
    const router = useRouter();
    const { isLogin } = useContext(UserContext);
    let mid = '';

    if (typeof window !== "undefined") {
        mid = queryString.parse(location.search).mid;
    }

    const [meeting, setMeeting] = useState();
    const [script, setScript] = useState();
    const [report, setReport] = useState();

    useEffect(() => {
        axios.get(`${SERVERURL.API_SERVER}/db/meetingResult/${mid}`, { withCredentials: true }).then(res => {
            const resMeeting = res.data.meeting;
            const resScript = res.data.script;
            const resReport = res.data.report;
            const members = res.data.members;

            resMeeting.date = new Date(Date.parse(resMeeting.date)).toLocaleString();
            resMeeting.members = members;

            const time = resMeeting.time;
            const sec = parseInt(time % 60);
            const min = parseInt((time / 60) % 60);
            const hours = parseInt(time / 3600);

            resMeeting.time = `${`${hours}:`}${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;

            setMeeting(resMeeting);
            setScript(resScript);
            setReport(resReport);
        });
    }, []);

    return (
        <>
            {isLogin &&
                <Box
                    component="main"
                    sx={{
                        flexGrow: 1,
                        pt: 8
                    }}
                >
                    <Container maxWidth={false}>
                        <MeetingResultToolbar meeting={meeting} />
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                sm={12}
                                md={6}
                            >
                                <ScriptsResultCard mid={mid} meeting={meeting} script={script} />
                            </Grid>
                            <Grid
                                item
                                sm={12}
                                md={6}
                            >
                                <SummaryResultCard meeting={meeting} report={report} />
                            </Grid>
                        </Grid>
                    </Container>
                </Box>
            }
        </>
    );
};

MeetingResult.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingResult;

import axios from 'axios';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { Box, Tabs, Tab, Container, Button, CircularProgress, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { UserContext } from '../utils/context/context';
import { AppLayout } from '../components/app-layout';
import { SummaryToolbar } from 'src/components/summary-step/summary-toolbar';
import { ScriptEdit } from 'src/components/summary-step/script-edit';
import { ReportForm } from '../components/summary-step/report-form';
import { ReportRange } from '../components/summary-step/report-range';
import queryString from 'query-string';

const StyledTabs = styled(Tabs)(({ theme }) => ({
    position: 'fixed',
    backgroundColor: '#F3F4F6',
    boxShadow: theme.shadows[8]
}));

const StyledTab = styled(Tab)({
    fontSize: 20,
    height: 70,
    whiteSpace: 'nowrap',
});

const BlockPage = styled(Box)({
    fontSize: 40,
    fontWeight: 'bold',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    paddingTop: 2
});

const Summarizer = () => {
    const router = useRouter();
    const { isLogin } = useContext(UserContext);
    const [page, setPage] = useState(0);
    const [description, setDescription] = useState("스크립트 내용 수정 및 삭제");

    const [meeting, setMeeting] = useState();
    const [sciptEditMember, setSciptEditMember] = useState(0);
    const [reportRangeMember, setReportRangeMember] = useState(0);

    const [script, setScript] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState([]);

    const [report, setReport] = useState([[]]);

    const [loading, setLoading] = useState(false);

    let mid = '';

    if (typeof window !== "undefined") {
        mid = queryString.parse(location.search).mid;
    }

    useEffect(() => {
        if (isLogin === false) {
            router.push('/not-login');
        }
    });

    useEffect(() => {
        axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/meetingResult/${mid}`, { withCredentials: true }).then(res => {
            const resMeeting = res.data.meeting;
            const resScript = res.data.script;
            let resReport = res.data.report;
            const members = res.data.members;

            const time = resMeeting.time;
            const sec = parseInt(time % 60);
            const min = parseInt((time / 60) % 60);
            const hours = parseInt(time / 3600);

            if (time >= 3600) {
                resMeeting.time = `${`${hours}:`}${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
            } else {
                resMeeting.time = `${min < 10 ? `0${min}` : min}:${sec < 10 ? `0${sec}` : sec}`;
            }

            resMeeting.date = new Date(Date.parse(resMeeting.date)).toLocaleString();
            resMeeting.members = members;

            for (let i = 0; i < resReport.length; i++) {
                for (let j = 0; j < resReport[i].length; j++) {
                    resReport[i][j].selected = [resScript[0]._id];
                }
            }

            setMeeting(resMeeting);
            setScript(resScript);
            setReport(resReport);
        });
    }, []);

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ mt: 3 }}>
                        {children}
                    </Box>
                )}
            </div>
        );
    }

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleChange = (e, newPage) => {
        if (newPage === 0) {
            setDescription("스크립트 내용 수정 및 삭제");
        } else if (newPage === 1) {
            setDescription("회의 요약 제목 및 형식 지정");
        } else {
            setDescription("보고서에 포함될 스크립트 범위 지정");
        }
        setPage(newPage);
    };

    const handleSubmit = async () => {
        setLoading(true);

        let temp = script;
        for (var del in deleted) {
            temp.slice(temp.findIndex(i => i._id === del), 1);
        }

        await axios.post(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/meetingResult`,
            { meetingId: mid, script: script, report: report },
            { withCredentials: true }).then(res => {
                console.log(res.data)
            }
            );

        await axios.post(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/py/summarize`,
            { meetingId: mid, report: report },
            { withCredentials: true }).then(res => {
                console.log(res.data)
                setLoading(false);
                router.push({
                    pathname: `/meeting-result`,
                    query: { mid: mid },
                });
            }
            );
    };

    return (
        <>
            <Head>
                <title>
                    Let's Summarizing | MAS
                </title>
            </Head>
            <Box component="main">
                {loading &&
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'fixed',
                            backgroundColor: 'black',
                            opacity: "0.7",
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            zIndex: 100000
                        }}
                    >
                        <Typography
                            color='violet'
                            fontSize={30}
                            mb={5}
                        >
                            요약 진행 중입니다...
                        </Typography>
                        <CircularProgress size={80} />
                    </Box>
                }
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <StyledTabs
                        value={page}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        variant="fullWidth"
                        sx={{
                            width: {
                                xs: '100%',
                                lg: 'calc(100% - 280px)'
                            }
                        }}
                    >
                        <StyledTab label="Edit Script" {...a11yProps(0)} />
                        <StyledTab label="Set Report Form" {...a11yProps(1)} />
                        <StyledTab label="Summarizing" {...a11yProps(2)} />
                    </StyledTabs>
                </Box>
                <Container
                    maxWidth={false}
                    sx={{
                        flexGrow: 1,
                        py: 3,
                        mt: '70px'
                    }}
                >
                    <SummaryToolbar meeting={meeting} description={description} />
                    <TabPanel value={page} index={0}>
                        <ScriptEdit
                            script={script}
                            selected={selected}
                            deleted={deleted}
                            setScript={setScript}
                            setSelected={setSelected}
                            setDeleted={setDeleted}
                            meeting={meeting}
                            member={sciptEditMember}
                            setMember={setSciptEditMember}
                        />
                    </TabPanel>
                    <TabPanel value={page} index={1}>
                        {script.length === 0
                            ? <BlockPage>스크립트가 존재하지 않습니다</BlockPage>
                            : <ReportForm
                                script={script}
                                report={report}
                                setReport={setReport}
                            />
                        }
                    </TabPanel>
                    <TabPanel value={page} index={2}>
                        {script.length === 0
                            ? <BlockPage>스크립트가 존재하지 않습니다</BlockPage>
                            : <ReportRange
                                script={script}
                                report={report}
                                setReport={setReport}
                                meeting={meeting}
                                member={reportRangeMember}
                                setMember={setReportRangeMember}
                            />
                        }
                    </TabPanel>
                </Container>
            </Box>
            <Button
                variant="contained"
                disabled={loading}
                size="large"
                sx={{
                    m: 3,
                    position: 'fixed',
                    right: 0,
                    bottom: 0
                }}
                onClick={handleSubmit}
            >
                Summarizing!!
            </Button>
        </>
    );
}

Summarizer.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default Summarizer;
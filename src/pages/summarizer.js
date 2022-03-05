import axios from 'axios';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect, useContext } from 'react';
import { Box, Tabs, Tab, Container, Button } from '@mui/material';
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

const Summarizer = () => {
    const router = useRouter();
    const { isLogin } = useContext(UserContext);
    const [page, setPage] = useState(0);
    const [description, setDescription] = useState("스크립트 내용 수정 및 삭제");
    // const [meeting, setMeeting] = useState([]);
    
    const [script, setScript] = useState([]);
    const [selected, setSelected] = useState([]);
    const [deleted, setDeleted] = useState([]);
    
    const [report, setReport] = useState([[]]);

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
        axios.get(`http://localhost:3001/db/meetingResult/${mid}`, { withCredentials: true }).then(res => {
            const resScript = res.data.script;
            let resReport = res.data.report;

            for (let i = 0; i < resReport.length; i++) {
                for (let j = 0; j < resReport[i].length; j++) {
                    resReport[i][j].selected = [resScript[0]._id];
                }
            }

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

    const handleSubmit = () => {
        let temp = script;
        for (var del in deleted) {
            temp.slice(temp.findIndex(i => i._id === del), 1);
        }

        axios.post(`http://localhost:3001/db/meetingResult`,
            { meetingId: mid, script: script, report: report },
            { withCredentials: true }).then(res => {
            console.log(res.data)
        });
    };

    return (
        <>
            <Head>
                <title>
                    Let's Summarizing | MAS
                </title>
            </Head>
            <Box component="main">
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
                    <SummaryToolbar description={description} />
                    <TabPanel value={page} index={0}>
                        <ScriptEdit
                            script={script}
                            selected={selected}
                            deleted={deleted}
                            setScript={setScript}
                            setSelected={setSelected}
                            setDeleted={setDeleted}
                        />
                    </TabPanel>
                    <TabPanel value={page} index={1}>
                        <ReportForm
                            script={script}
                            report={report}
                            setReport={setReport}
                        />
                    </TabPanel>
                    <TabPanel value={page} index={2}>
                        <ReportRange
                            script={script}
                            report={report}
                            setReport={setReport}
                        />
                    </TabPanel>
                </Container>
            </Box>
            <Link
                href={{
                    pathname: `/meeting-result`,
                    query: { mid: mid },
                }}
            >
                <Button
                    variant="contained"
                    size="large"
                    sx={{
                        m: 3,
                        position: 'fixed',
                        right: 0,
                        bottom: 0
                    }}
                    onClick={handleSubmit}
                >
                    Next Step
                </Button>
            </Link>
        </>
    );
}

Summarizer.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default Summarizer;
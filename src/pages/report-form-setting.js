import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { Box, Container, Button } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ReportFormResult } from '../components/summary-step/report-form-result';
import { AppLayout } from '../components/app-layout';
import { meetings } from '../__mocks__/meetings';
import { UserContext } from '../utils/context/context';

const ReportFormSetting = () => {
    const router = useRouter();
    const { mid } = router.query;
    const { isLogin } = useContext(UserContext);
    const [reportTitleList, setReportTitleList] = useState([[]]);
    
    if (!isLogin) {
        return null;
    }

    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    const genEmptyArray = (arr) => {
        var newArr = new Array(arr.length);

        for (let i = 0; i < arr.length; i++) {
            newArr[i] = new Array(arr[i].length);
            for (let j = 0; j < arr[i].length; j++) {
                newArr[i][j] = '';
            }
        }

        return newArr;
    };

    const handleCallback = (inputList) => {
        setReportTitleList(inputList);
    };

    const handleSubmit = () => {
        const reports = meetings.find(m => m.id === mid).reports;

        if (Object.keys(reports).length === 0) {
            reports.push({
                title: reportTitleList,
                summary: genEmptyArray(reportTitleList)
            });
        } else {
            reports.title = reportTitleList;
            reports.summary = genEmptyArray(reportTitleList);
        }
    }

    return(
        <>
            <Head>
                <title>
                    Edit Script | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth={false}>
                    <ScriptEditToolbar scriptID={mid} description={"Report Form 지정"}/>
                    <ReportFormResult
                        parentCallback={handleCallback}
                    />
                    <Box
                        sx={{
                            height: '80px',
                            background: 'none'
                        }}
                    />
                </Container>
                <Box sx={{
                        width: '100%',
                        height: 100,
                        background: 'white',
                        position: 'fixed',
                        left: 0,
                        bottom: 0,
                        zIndex: 1000,
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'center',
                        boxShadow: '0px -5px 3px 3px rgba(0, 0, 0, 0.1)'
                    }}
                >
                    <Button
                        variant="contained"
                        size="large"
                        sx={{ marginRight: 2 }}
                        onClick={() => router.back()}
                    >
                        Prev Step
                    </Button>
                    <Link
                        href={{
                            pathname: `/report-range-setting`, // 라우팅 id
                            query: { mid: mid }, // props 
                        }}
                        as={`/report-range-setting`}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ marginRight: 2 }}
                            onClick={handleSubmit}
                        >
                            Next Step
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
};

ReportFormSetting.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default ReportFormSetting;

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import { Box, Container, Button } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ReportFormResult } from '../components/summary-step/report-form-result';
import { AppLayout } from '../components/app-layout';
import { UserContext } from '../utils/context/context';
import axios from 'axios';

const ReportFormSetting = () => {
    const router = useRouter();
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

    const getReportList = (arr) => {
        var newArr = new Array(arr.length);

        for (var i = 0; i < arr.length; i++) {
            newArr[i] = new Array(arr[i].length);
        }

        for (var i = 0; i < newArr.length; i++) {
            for (var j = 0; j < newArr[i].length; j++) {
                newArr[i][j] = {
                    title: arr[i][j],
                    summary: ''
                }
            }
        }

        return newArr;
    };

    const handleCallback = (inputList) => {
        setReportTitleList(inputList);
    };

    const handleSubmit = () => {
        axios.post(`http://localhost:3001/db/currentMeetingReport`, {
            report: getReportList(reportTitleList)
        }, { withCredentials: true }).then(res => {
            console.log(res);
        });
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
                    <ScriptEditToolbar description={"Report Form 지정"} />
                    <ReportFormResult parentCallback={handleCallback} />
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
                        }}
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

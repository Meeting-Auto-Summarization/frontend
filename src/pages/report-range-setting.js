import Head from 'next/head';
import { Box, Container, Button } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ReportRangeResult } from '../components/summary-step/report-range-result';
import { AppLayout } from '../components/app-layout';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';

const ReportRangeSetting = () => {
    const router = useRouter();
    const { mid } = router.query;
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
            <Head>
                <title>
                    Set Report Range | MAS
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
                    <ScriptEditToolbar scriptID={mid} description={"보고서에 포함될 스크립트 범위 지정"}/>
                    <Box sx={{ mt: 3 }}>
                        <ReportRangeResult mid={mid} />
                    </Box>
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
                            pathname: `/meeting-result`, // 라우팅 id
                            query: { mid: mid }, // props 
                        }}
                        as={`/meeting-result`}
                    >
                        <Button
                            variant="contained"
                            size="large"
                            sx={{ marginRight: 2 }}
                        >
                            Summarizing!!
                        </Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
};

ReportRangeSetting.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default ReportRangeSetting;

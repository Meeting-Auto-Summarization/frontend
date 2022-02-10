import Head from 'next/head';
import { Box, Container, Button } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ReportFormSetting } from '../components/summary-step/report-form-setting';
import { AppLayout } from '../components/app-layout';
import { scripts } from '../__mocks__/scripts';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';


const ReportForm = () => {
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
                    <ScriptEditToolbar scriptID={scripts[0].id} description={"Report Form 지정"}/>
                    <ReportFormSetting />
                    <Box
                        sx={{
                            height: '80px',
                            background: 'none'
                        }}
                    />
                </Container>
                <Box sx={{
                        width: '100%',
                        height: '100px',
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
                    <Button variant="contained" size="large" sx={{ marginRight: 2 }}>Next Step</Button>
                </Box>
            </Box>
        </>
    );
};

ReportForm.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default ReportForm;

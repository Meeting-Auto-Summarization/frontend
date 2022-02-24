import Head from 'next/head';
import { Box, Container } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ScriptEditResult } from '../components/summary-step/script-edit-result';
import { AppLayout } from '../components/app-layout';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';

const ScriptEdit = () => {
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
                    <ScriptEditToolbar description={"Script 수정"} />
                    <Box sx={{ mt: 3 }}>
                        <ScriptEditResult />
                    </Box>
                </Container>
                
            </Box>
        </>
    );
};

ScriptEdit.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default ScriptEdit;

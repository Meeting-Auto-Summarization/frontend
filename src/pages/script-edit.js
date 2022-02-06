import Head from 'next/head';
import { Box, Container, Button } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ScriptEditResult } from '../components/summary-step/script-edit-result';
import { DashboardLayout } from '../components/dashboard-layout';
import { scripts } from '../__mocks__/scripts';
import { useRouter } from 'next/router';
import Link from 'next/link';


const ScriptEdit = () => {
    const router = useRouter();
    const { mid } = router.query;

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
                    <ScriptEditToolbar scriptID={mid} description={"Script 수정"}/>
                    <Box sx={{ mt: 3 }}>
                        <ScriptEditResult scripts={scripts.filter(meeting => meeting.id === mid)[0]} />
                    </Box>
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
                    <Link
                        href={{
                            pathname: `/report-form`, // 라우팅 id
                            query: { mid: mid }, // props 
                        }}
                        as={`/report-form`}
                    >
                        <Button variant="contained" size="large" sx={{ marginRight: 2 }}>Next Step</Button>
                    </Link>
                </Box>
            </Box>
        </>
    );
};

ScriptEdit.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ScriptEdit;

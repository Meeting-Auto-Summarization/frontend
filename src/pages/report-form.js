import Head from 'next/head';
import { Box, Container, Button, TextField } from '@mui/material';
import { ScriptEditToolbar } from '../components/summary-step/script-edit-toolbar';
import { ReportFormSetting } from '../components/summary-step/report-form-setting';
import { DashboardLayout } from '../components/dashboard-layout';
import { scripts } from '../__mocks__/scripts';

const ReportForm = () => {
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
                    <Button variant="contained" size="large" sx={{ marginRight: 2 }}>Next Step</Button>
                </Box>
            </Box>
        </>
    );
};

ReportForm.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default ReportForm;

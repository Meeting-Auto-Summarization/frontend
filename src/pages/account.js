import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { DashboardLayout } from '../components/dashboard-layout';
import { useContext } from 'react';
import { UserContext } from '../utils/context/context';


const Account = () => {
    const userContext = useContext(UserContext);

    return (
        <>
            <Head>
                <title>
                    Account | Material Kit
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    py: 8
                }}
            >
                <Container maxWidth="lg">
                    <Typography
                        sx={{ mb: 3 }}
                        variant="h4"
                    >
                        Account
                    </Typography>
                    <Grid
                        container
                        spacing={3}
                    >
                        <Grid
                            item
                            lg={4}
                            md={6}
                            xs={12}
                        >
                            <AccountProfile value={userContext} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails value={userContext} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Account.getLayout = (page) => (
    <DashboardLayout>
        {page}
    </DashboardLayout>
);

export default Account;

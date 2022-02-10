import Head from 'next/head';
import { Box, Container, Grid, Typography } from '@mui/material';
import { AccountProfile } from '../components/account/account-profile';
import { AccountProfileDetails } from '../components/account/account-profile-details';
import { AppLayout } from '../components/app-layout';
import { useContext, useEffect } from 'react';
import { UserContext } from '../utils/context/context';
import { useRouter } from 'next/router';

const Account = () => {
    const userContext = useContext(UserContext);
    const router = useRouter();
    
    useEffect(() => {
        if (!userContext.isLogin) {
            router.push('/not-login');
        }
    });

    if (!userContext.isLogin) {
        return null;
    }

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
                            <AccountProfile user={userContext} />
                        </Grid>
                        <Grid
                            item
                            lg={8}
                            md={6}
                            xs={12}
                        >
                            <AccountProfileDetails user={userContext} />
                        </Grid>
                    </Grid>
                </Container>
            </Box>
        </>
    );
};

Account.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default Account;

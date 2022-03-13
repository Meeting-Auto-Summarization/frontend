import Head from 'next/head';
import { useRouter } from 'next/router';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import GoogleLogin from 'react-google-login';

const Login = () => {
    const router = useRouter();

    return (
        <>
            <Head>
                <title>Login | MAS</title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    minHeight: '100%',
                    marginBottom: '80px'
                }}
            >
                <Container maxWidth="sm">
                    <img
                        alt="Under development"
                        src="/static/images/logo.png"
                        style={{
                            display: 'block',
                            maxWidth: '100%',
                            margin: '0 auto',
                            width: 440
                        }}
                    />
                    <form>
                        <Box sx={{ my: 3 }}>
                            <Typography
                                color="textPrimary"
                                variant="h4"
                            >
                                Sign in
                            </Typography>
                            <Typography
                                color="textSecondary"
                                gutterBottom
                                variant="body2"
                            >
                                Sign in on the internal platform
                            </Typography>
                        </Box>
                        <Grid container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <Button
                                    color="info"
                                    fullWidth
                                    startIcon={<FacebookIcon />}
                                    size="large"
                                    variant="contained"
                                >
                                    Login with Facebook
                                </Button>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <GoogleLogin
                                    clientId="842588185399-tekfrmotkjmsao3i99opfsvga774vo35.apps.googleusercontent.com"
                                    render={renderProps => (
                                        <Button
                                            fullWidth
                                            color="error"
                                            startIcon={<GoogleIcon />}
                                            onClick={() => {
                                                window.location.href = "https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/auth/google"
                                            }}
                                            size="large"
                                            variant="contained"
                                            disabled={renderProps.disabled}
                                        >
                                            Login with Google
                                        </Button>
                                    )}
                                    buttonText="Login"
                                    cookiePolicy={'single_host_origin'}
                                />
                            </Grid>
                        </Grid>
                    </form>
                </Container>
            </Box>
        </>
    );
};

export default Login;

import Head from 'next/head';
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Box, Button, Container, Grid, Typography } from '@mui/material';
import { Facebook as FacebookIcon } from '../icons/facebook';
import { Google as GoogleIcon } from '../icons/google';
import GoogleLogin from 'react-google-login';
import { useContext } from 'react';
import { UserContext } from '../utils/context/context';

const Login = () => {
    const {
        setIsLogin,
        setUserEmail,
        setUserNick,
        setUserAvatar,
        setUserFirstName,
        setUserLastName
    } = useContext(UserContext);

    const router = useRouter();
    const formik = useFormik({
        initialValues: {
            email: 'demo@devias.io',
            password: 'Password123'
        },
        validationSchema: Yup.object({
            email: Yup
                .string()
                .email(
                    'Must be a valid email')
                .max(255)
                .required(
                    'Email is required'),
            password: Yup
                .string()
                .max(255)
                .required(
                    'Password is required')
        }),
        onSubmit: () => {
            router.push('/meeting-list');
        }
    });

    const responseGoogle = (response) => {
        const profile = response.getBasicProfile();
        
        setIsLogin(true);
        setUserEmail(profile.getEmail());
        setUserNick(profile.getName());
        setUserFirstName(profile.getGivenName());
        setUserLastName(profile.getFamilyName());
        setUserAvatar(profile.getImageUrl());

        formik.handleSubmit();
    }

    return (
        <>
            <Head>
                <title>Login | Material Kit</title>
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
                    <form onSubmit={formik.handleSubmit}>
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
                                    onClick={formik.handleSubmit}
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
                                            onClick={()=>{
                                                window.location.href="http://localhost:3001/auth/google"
                                            }}
                                            size="large"
                                            variant="contained"
                                            disabled={renderProps.disabled}
                                        >
                                            Login with Google
                                        </Button>
                                    )}
                                    buttonText="Login"
                                    onSuccess={responseGoogle}
                                    onFailure={responseGoogle}
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

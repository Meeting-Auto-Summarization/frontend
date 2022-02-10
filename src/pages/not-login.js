import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import Login from './index'

const NotLogin = () => {
    return (
        <>
            <Head>
                <title>
                    Please Sign In
                </title>
            </Head>
            <Box
                component="main"
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexGrow: 1,
                    height: '100%'
                }}
            >
                <Container maxWidth="md">
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="h1"
                    >
                        로그인하여 서비스를 이용해보세요!
                    </Typography>
                    <Typography
                        align="center"
                        color="textPrimary"
                        variant="subtitle1"
                    >
                        귀하는 서비스에 로그인 되어있지 않은 상태입니다. 로그인 또는 회원가입을 통해 저희의 회의 자동 요약 서비스를 경험해보세요!
                    </Typography>
                    <Box minWidth="100%">
                        <Login />
                    </Box>
                </Container>
            </Box>
        </>
    );
};

export default NotLogin;

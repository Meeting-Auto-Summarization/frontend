import Head from 'next/head'
import { Box, Container, Grid, Pagination } from '@mui/material';
import { AppLayout } from 'src/components/app-layout';
import { meetings } from 'src/__mocks__/meetings';
import { MeetingListResult } from 'src/components/meeting-list/meeting-list-result';
import { MeetingListToolbar } from 'src/components/meeting-list/meeting-list-toolbar';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../utils/context/context';
import { useRouter } from 'next/router';

const MeetingList = () => {
    const { isLogin } = useContext(UserContext);
    const router = useRouter();
    
    useEffect(() => {
        if (!isLogin) {
            router.push('/not-login');
        }
    });

    /*if (!isLogin) {
        return null;
    }*/

    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);

    useEffect(() => {
        function handleResize() {
            let width = window.innerWidth
            
            if (width >= 1920) {
                setLimit(9)
            } else if (width < 1920 && width >= 900) {
                setLimit(6)
            } else {
                setLimit(3)
            }
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);
    
    function handlePageChange(event, newPage) {
        setPage(newPage);
    }

    return (
        <>
            <Head>
                <title>
                    Meeting List
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
                    <MeetingListToolbar />
                    <Box sx={{ mt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {meetings.slice((page - 1) * limit, (page - 1) * limit + limit).map((meeting) => {
                                return (
                                    <Grid
                                        item
                                        key={meeting.id}
                                        xl={4}
                                        md={6}
                                        xs={12}
                                    >
                                        <MeetingListResult meeting={meeting}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </Box>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                                pt: 3
                            }}
                        >
                        <Pagination
                            color="primary"
                            size="medium"
                            count={Math.ceil(meetings.length / limit)}
                            onChange={handlePageChange}
                            page={page}
                        />
                    </Box>  
                </Container>
            </Box>
        </>
    );
};

MeetingList.getLayout = (page) => (
    <AppLayout>
        {page}
    </AppLayout>
);

export default MeetingList;

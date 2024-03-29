import { useState, useEffect, useContext, useCallback } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head'
import axios from 'axios';
import { Box, Container, Grid, Pagination, Typography, ToggleButtonGroup, ToggleButton, TextField, InputAdornment, Button } from '@mui/material';
import { SortByAlpha, AccessTime, Search, DeleteOutline } from '@mui/icons-material';
import { AppLayout } from 'src/components/app-layout';
import { MeetingListResult } from 'src/components/meeting-list/meeting-list-result';
import { UserContext } from '../utils/context/context';

const MeetingList = () => {
    const { isLogin } = useContext(UserContext);
    const router = useRouter();
    const [limit, setLimit] = useState(6);
    const [page, setPage] = useState(1);
    const [saveMeetings, setSaveMeetings] = useState(null);
    const [meetings, setMeetings] = useState([]);
    const [sorting, setSorting] = useState('time');
    const [deleting, setDeleting] = useState(false);
    const [deleted, setDeleted] = useState([]);
    const [_, updateState] = useState();
    const forceUpdate = useCallback(() => updateState({}), []);

    useEffect(() => {
        axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/meetingList`, { withCredentials: true }).then(res => {
            const data = res.data;
            let meetingList = [];

            for (var i = 0; i < data.length; i++) {
                const tempMeeting = data[i].meeting;

                tempMeeting.date = new Date(Date.parse(tempMeeting.date));
                tempMeeting.members = data[i].members;

                meetingList.push(tempMeeting);
            }

            setMeetings(meetingList);
            setSaveMeetings(meetingList);
        });

        function handleResize() {
            let width = window.innerWidth
            let lim;

            if (width >= 1920) {
                lim = 9;
            } else if (width < 1920 && width >= 900) {
                lim = 6;
            } else {
                lim = 3;
            }

            setLimit(lim);
        }

        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePageChange = (e, newPage) => {
        setPage(newPage);
    };

    const handleSearch = (e) => {
        const text = e.target.value;

        if (!text) {
            setMeetings(saveMeetings);
            return;
        }

        const search = saveMeetings.filter(m => m.title.includes(text));
        setMeetings(search);
    };

    const handleSorting = (e, newSorting) => {
        setSorting(newSorting);
        const tempMeetings = meetings;

        if (newSorting == 'time') {
            tempMeetings.sort(function (a, b) {
                return a.date - b.date;
            });
        } else if (newSorting == 'reverse-time') {
            tempMeetings.sort(function (a, b) {
                return b.date - a.date;
            });
        } else if (newSorting == 'alpha') {
            tempMeetings.sort(function (a, b) {
                if (a.title < b.title) return -1;
                else if (a.title > b.title) return 1;
                else return 0;
            });
        } else {
            tempMeetings.sort(function (a, b) {
                if (a.title > b.title) return -1;
                else if (a.title < b.title) return 1;
                else return 0;
            });
        }

        setMeetings(tempMeetings);
    };

    const handleDeletingMode = (meeting) => {
        if (deleting) {
            const tempDeleted = deleted;
            const deleteIndex = tempDeleted.indexOf(meeting._id);

            if (deleteIndex === -1) {
                tempDeleted.push(meeting._id);
            } else {
                tempDeleted.splice(deleteIndex, 1);
            }

            setDeleted(tempDeleted);
            forceUpdate();
        }
    };

    const handleDelete = async () => {
        await axios.post(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/deleteMeeting`,
            { deleted: deleted },
            { withCredentials: true }
        ).then(res => {
            console.log(res.data);
        });

        await axios.get(`https://ec2-3-38-49-118.ap-northeast-2.compute.amazonaws.com/app/db/meetingList`,
            { withCredentials: true }
        ).then(res => {
            const data = res.data;
            let meetingList = [];

            for (var i = 0; i < data.length; i++) {
                const tempMeeting = data[i].meeting;

                tempMeeting.date = new Date(Date.parse(tempMeeting.date));
                tempMeeting.members = data[i].members;

                meetingList.push(tempMeeting);
            }

            setMeetings(meetingList);
            setSaveMeetings(meetingList);
        });

        setDeleting(false);
    };

    return (
        <>
            <Head>
                <title>
                    Meeting List | MAS
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
                    <Box
                        sx={{
                            alignItems: 'center',
                            display: 'flex',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            m: -1
                        }}
                    >
                        <Typography variant="h4" sx={{ m: 1 }}>
                            Meeting List
                        </Typography>
                        <Box sx={{ flexGrow: 1 }} />
                        <TextField
                            id="search-input"
                            label="Search"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <Search />
                                    </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            onChange={handleSearch}
                            sx={{
                                mr: 3,
                                backgroundColor: 'white'
                            }}
                        />
                        <ToggleButtonGroup
                            value={sorting}
                            exclusive
                            onChange={handleSorting}
                            aria-label="meeting list sorting"
                            sx={{ mr: 3 }}
                        >
                            <ToggleButton value="time" aria-label="sort by time">
                                <AccessTime />
                            </ToggleButton>
                            <ToggleButton value="reverse-time" aria-label="sort by reverse time">
                                <AccessTime sx={{ transform: 'rotate(180deg)' }} />
                            </ToggleButton>
                            <ToggleButton value="alpha" aria-label="sort by alpha">
                                <SortByAlpha />
                            </ToggleButton>
                            <ToggleButton value="reverse-alpha" aria-label="sort by reverse alpha">
                                <SortByAlpha sx={{ transform: 'rotate(180deg)' }} />
                            </ToggleButton>
                        </ToggleButtonGroup>
                        <ToggleButton
                            value="check"
                            selected={deleting}
                            onChange={() => {
                                setDeleting(!deleting);
                                setDeleted([]);
                            }}
                        >
                            <DeleteOutline />
                        </ToggleButton>
                    </Box>
                    <Box sx={{ mt: 3 }}>
                        <Grid
                            container
                            spacing={3}
                        >
                            {meetings.slice((page - 1) * limit, (page - 1) * limit + limit).map((meeting) => {
                                return (
                                    <Grid
                                        item
                                        key={meeting._id}
                                        xl={4}
                                        md={6}
                                        xs={12}
                                    >
                                        <Box
                                            onClick={() => handleDeletingMode(meeting)}
                                        >
                                            <MeetingListResult meeting={meeting} deleting={deleting} deleted={deleted} />
                                        </Box>
                                    </Grid>
                                );
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
                        {deleting &&
                            <Button
                                onClick={handleDelete}
                            >
                                삭제
                            </Button>
                        }
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

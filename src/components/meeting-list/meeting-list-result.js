import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Link from "next/link";

export const MeetingListResult = ({ meeting, deleting, deleted }) => {
    const time = meeting.time;
    const seconds = parseInt(time % 60);
    const minutes = parseInt((time / 60) % 60);
    const hours = parseInt(time / 3600);

    if (deleting) {
        return(
            <div style={{ cursor: "pointer" }}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25))',
                    }}
                >
                    <Box
                        bgcolor={
                            deleted.indexOf(meeting._id) === -1
                            ? '#c8c8c8'
                            : '#ff9191'
                        }
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent:'center'
                                }}
                            >
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid 
                                        item
                                        xs={7}
                                    >
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="h5"
                                            pb={2}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {meeting.title}
                                        </Typography>
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="body2"
                                            pb={0.4}
                                        >
                                            {meeting.members.join(', ')}
                                        </Typography>
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="h6"
                                        >
                                            {hours !== 0 && `${hours}:`}
                                            {minutes < 10 ? `0${minutes}` : minutes}
                                            :
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                        sx={{}}
                                    >
                                        <Typography
                                            pt={1}
                                            pb={2}
                                            align="right"
                                            color="textPrimary"
                                            variant="h6"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {meeting.date.toLocaleString()}
                                        </Typography>
                                        <ArrowDropDownCircleOutlinedIcon
                                            sx={{ 
                                                filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25))',
                                                float: 'right',
                                                fontSize: '50px'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Box>
                </Card>
            </div>
        );
    } else {
        return(
            <Link
                href={{
                    pathname: `/meeting-result`, // 라우팅 id
                    query: { mid: meeting._id }, // props 
                }}
            >
                <div style={{ cursor: "pointer" }}>
                    <Card
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',
                            filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25))'
                        }}
                    >
                        <CardContent>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent:'center'
                                }}
                            >
                                <Grid
                                    container
                                    spacing={3}
                                    sx={{ justifyContent: 'space-between' }}
                                >
                                    <Grid 
                                        item
                                        xs={7}
                                    >
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="h5"
                                            pb={2}
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {meeting.title}
                                        </Typography>
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="body2"
                                            pb={0.4}
                                        >
                                            {meeting.members.join(', ')}
                                        </Typography>
                                        <Typography
                                            align="left"
                                            color="textPrimary"
                                            variant="h6"
                                        >
                                            {hours !== 0 && `${hours}:`}
                                            {minutes < 10 ? `0${minutes}` : minutes}
                                            :
                                            {seconds < 10 ? `0${seconds}` : seconds}
                                        </Typography>
                                    </Grid>
                                    <Grid
                                        item
                                        xs={5}
                                        sx={{}}
                                    >
                                        <Typography
                                            pt={1}
                                            pb={2}
                                            align="right"
                                            color="textPrimary"
                                            variant="h6"
                                            sx={{
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis'
                                            }}
                                        >
                                            {meeting.date.toLocaleString()}
                                        </Typography>
                                        <ArrowDropDownCircleOutlinedIcon
                                            sx={{ 
                                                filter: 'drop-shadow(1px 1px 3px rgba(0, 0, 0, 0.25))',
                                                float: 'right',
                                                fontSize: '50px'
                                            }}
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        </CardContent>
                    </Card>
                </div>
            </Link>
        );
    }
};

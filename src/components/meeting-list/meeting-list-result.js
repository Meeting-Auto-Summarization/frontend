import { Box, Card, CardContent, Grid, Typography } from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';
import Link from "next/link";

export const MeetingListResult = ({meeting, ...rest}) => {
    return(
        <Link
            href={{
                pathname: `/meeting-result`, // 라우팅 id
                query: { mid: meeting.id }, // props 
            }}
            as={`/meeting-result`}
        >
            <div style={{ cursor: "pointer" }}>
                <Card
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '100%',
                        filter: 'drop-shadow(1px 1px 1px rgba(0, 0, 0, 0.25))'
                    }}
                    {...rest}
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
                                            {meeting.time}
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
                                            {meeting.date}
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
};

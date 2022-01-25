import {
    Box,
    Card,
    CardContent,
    Grid,
    Typography
} from '@mui/material';
import ArrowDropDownCircleOutlinedIcon from '@mui/icons-material/ArrowDropDownCircleOutlined';

export const MeetingListResult = ({meeting, ...rest}) => {
     return(
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
                                {meeting.meetingName}
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
    );
};

// 검색해보셈~~~~~~
// MeetingListResult.propTypes = {
//     meeting: PropTypes.object.isRequired
// };
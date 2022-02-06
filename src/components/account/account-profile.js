import {
    Avatar,
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Divider,
    Typography
} from '@mui/material';
  
const user = {
    avatar: '/static/images/avatars/avatar_6.png',
    city: 'Los Angeles',
    country: 'USA',
    jobTitle: 'Senior Developer',
    name: 'Katarina Smith',
    timezone: 'GTM-7'
};
  
export const AccountProfile = ({value, ...rest}) => (
    <Card {...rest}>
        <CardContent>
            <Box
                sx={{
                    alignItems: 'center',
                    display: 'flex',
                    flexDirection: 'column'
                }}
            >
                <Avatar
                    src={value.userAvatar}
                    sx={{
                        height: 64,
                        mb: 2,
                        width: 64
                    }}
                />
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h5"
                >
                    {value.userNick}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {`${user.city} ${user.country}`}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body2"
                >
                    {user.timezone}
                </Typography>
            </Box>
        </CardContent>
        <Divider />
        <CardActions>
            <Button
                color="primary"
                fullWidth
                variant="text"
            >
                Upload picture
            </Button>
        </CardActions>
    </Card>
);

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
  
export const AccountProfile = ({user, ...rest}) => {
    const handleSubmitAvatar = (event) => {
        console.log(event.target.files[0])
    };

    return (
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
                        src={user.userAvatar}
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
                        {user.userNick}
                    </Typography>
                </Box>
            </CardContent>
            <Divider />
            <CardActions>
                <Button
                    color="primary"
                    fullWidth
                    variant="text"
                    component="label"
                >
                    Upload picture
                    <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={handleSubmitAvatar}
                    />
                </Button>
            </CardActions>
        </Card>
    )
};

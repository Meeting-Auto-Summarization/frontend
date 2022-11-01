import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Grid,
    TextField
} from '@mui/material';
import axios from 'axios';
import { useEffect, useState } from 'react';

export const AccountProfileDetails = ({ user, ...rest }) => {
    const [values, setValues] = useState();

    useEffect(() => {
        setValues({
            firstName: user.userFirstName,
            lastName: user.userLastName,
            email: user.userEmail,
            name: user.userNick,
            phone: '010-0000-0000'
        })
    }, [user]);

    const handleChange = (event) => {
        setValues({
            ...values,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        axios.post('http://localhost:3001/db/userInfo',
            { values: values },
            { withCredentials: true }).then(res => {
                window.location.reload()
                console.log(res.data);
            })
    };

    return (
        <form
            autoComplete="off"
            noValidate
            {...rest}
        >
            {values &&
                <Card>
                    <CardHeader
                        subheader="The information can be edited"
                        title="Profile"
                    />
                    <Divider />
                    <CardContent>
                        <Grid
                            container
                            spacing={3}
                        >
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    helperText="Please specify the first name"
                                    label="First name"
                                    name="firstName"
                                    onChange={handleChange}
                                    required
                                    value={values.firstName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Last name"
                                    name="lastName"
                                    onChange={handleChange}
                                    required
                                    value={values.lastName}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="Email Address"
                                    name="email"
                                    onChange={handleChange}
                                    required
                                    value={values.email}
                                    variant="outlined"
                                />
                            </Grid>
                            <Grid
                                item
                                md={6}
                                xs={12}
                            >
                                <TextField
                                    fullWidth
                                    label="User nickname"
                                    name="name"
                                    onChange={handleChange}
                                    required
                                    value={values.name}
                                    variant="outlined"
                                />
                                {/* <TextField
                                    fullWidth
                                    label="Phone Number"
                                    name="phone"
                                    onChange={handleChange}
                                    value={values.phone}
                                    variant="outlined"
                                /> */}
                            </Grid>
                        </Grid>
                    </CardContent>
                    <Divider />
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            p: 2
                        }}
                    >
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={handleSubmit}
                        >
                            Save details
                        </Button>
                    </Box>
                </Card>
            }
        </form>
    );
};

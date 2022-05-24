import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
    Button, TextField, Grid,
    Typography, Stack, Box,
    Link
} from '@mui/material'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { TailSpin } from "react-loader-spinner"
import { ToastContainer, Slide, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { notify } from '../../utils/util';
import { sendPasswordReset } from '../../authentication/firebase';

export default function ResetPassword() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [isLinkSent, setLinkSent] = useState(false);



    useEffect(() => {
        if (isLinkSent) {
            setInterval(
                () => { showResetSuccess() },
                4000);
        }
    }, [isLinkSent])

    const showResetSuccess = () => {
        navigate("/login");
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(true);
        sendPasswordReset(email).then(() => {
            setLinkSent(true);
        }).catch((error) => {
            switch (error.code) {
                case 'auth/invalid-email':
                    notify("Invalid email!", toast.TYPE.ERROR);
                    break;
                default:
                    notify("Pass reset failed!", toast.TYPE.ERROR);
            }
            setLoading(false);
        })
    };

    return (
        <div>
            {!isLinkSent ?
                <Grid container className="container" justifyContent="center"
                    sx={{
                        marginTop: 4,
                        padding: 2,
                        marginBottom: 4
                    }}
                >
                    <Stack sx={{ boxShadow: 3, padding: 8 }}>

                        <Typography
                            sx={{
                                alignSelf: "flex-start",
                                fontFamily: "NotoSansBold"
                            }}
                            variant="h4"
                            align='left'>
                            Reset Password
                        </Typography>
                        <p align="left"
                            style={{ marginLeft: 15 }}>
                            You will receive a link via email</p>
                        <Stack spacing={1}
                            component="form"
                            onSubmit={handleSubmit}
                            sx={{
                                mt: 1,
                                display: 'flex',
                                flexDirection: 'column'
                            }}>

                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                autoFocus
                                variant='standard'
                            />
                            <br />
                            {!loading ?
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2, }}
                                    disableElevation={true}
                                >
                                    Reset
                                </Button> :
                                <Box
                                    display="flex"
                                    justifyContent="center"
                                >
                                    <TailSpin color="#00BFFF" height={30} width={30} />
                                </Box>
                            }
                        </Stack>
                        <Grid container>
                            <Grid item xs>
                                <Link href="/login" variant="body2">
                                    Go back to login?
                                </Link>
                            </Grid>
                        </Grid>
                    </Stack>
                </Grid > :
                <Stack
                    display="flex"
                    direction="column"
                    alignItems="center"
                    mt={10}
                >
                    <CheckCircleIcon
                        color="success"
                        style={{ fontSize: 100 }}
                    />
                    <h2 style={{ fontFamily: "NotoSansBold" }}>
                        Please check your e-mail
                    </h2>
                </Stack>}
            <ToastContainer
                transition={Slide}
            />
        </div>
    );
}
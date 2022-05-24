import React, { useState } from 'react';
import {
    Button, TextField,
    Link, Grid,
    Typography, Stack,
    Box
} from '@mui/material'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, Slide, toast } from 'react-toastify';
import { notify } from '../../utils/util';
import { TailSpin } from "react-loader-spinner"
import 'react-toastify/dist/ReactToastify.css';

import { logInWithEmailAndPassword } from '../../authentication/firebase'
import { PassWordField } from '../CustomElements/UIElements';

export default function Login() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [password, setPassword] = useState();
    const [email, setEmail] = useState();

    const handlePasswordChange = (password) => {
        setPassword(password)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setLoading(false);
        logInWithEmailAndPassword(email, password).then(() => {
            navigate("/applications");
            notify("Successfully Logged In", toast.TYPE.SUCCESS);
        }).catch((error) => {
            setLoading(true);
            switch (error.code) {
                case 'auth/wrong-password':
                    notify("Wrong password!", toast.TYPE.ERROR);
                    break;
                case 'auth/too-many-requests':
                    notify("Try again later!", toast.TYPE.ERROR);
                    break;
                default:
                    notify("Loginn failed!", toast.TYPE.ERROR);
                    break;
            }
        })
    };

    return (
        <div>
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
                        Log in.
                    </Typography>
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
                        <PassWordField label="Password"
                            updatePassword={handlePasswordChange} />
                        <br />
                        <br />
                        {loading ?
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, }}
                                disableElevation={true}
                            >
                                Log in
                            </Button> :
                            <Box
                                display="flex"
                                justifyContent="center"
                            >
                                <TailSpin color="#00BFFF" height={30} width={30} />
                            </Box>
                        }
                        <Grid container>
                            <Grid item xs>
                                <Link href="/reset" variant="body2">
                                    Forgot password?
                                </Link>
                            </Grid>
                            <Grid item style={{ marginLeft: '8px' }}>
                                <Link href="/register" variant="body2">
                                    {"Don't have an account? Sign Up"}
                                </Link>
                            </Grid>
                        </Grid>
                    </Stack>
                </Stack>
            </Grid >
            <ToastContainer
                transition={Slide}
            />
        </div>
    );
}
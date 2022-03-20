import { Box, Grid, TextField, Button, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom";
import { ToastContainer, Slide } from 'react-toastify';
import { notify } from '../utils/util';
import 'react-toastify/dist/ReactToastify.css';

import { generateKey } from "../utils/util"
import { addApp } from "../db/firebaseDb"
import { useUserAuth } from "../authentication/AuthProvider";

import "../static/css/create_application.css"

export default function CreateApplication(props) {

    const { user } = useUserAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        const data = new FormData(event.currentTarget);
        const appName = data.get('app_name')
        const key = generateKey()
        addApp(key, user.email, appName, data.get('app_desc'))
        notify(appName, " created Successfully")
        navigate("/applications")
    }

    return (
        <div className="container d-flex justify-content-center app-cont">
            <Grid xs={12} sm={12} lg={6}
                className="fill-height"
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}>
                <Typography variant="h5" alignSelf="start">
                    Create application</Typography>
                <Typography variant="p" alignSelf="start"
                    sx={{ marginLeft: 1 }}>
                    Fill in the form below to generate a key</Typography>
                <form className="mt-4" onSubmit={handleSubmit}>
                    <TextField
                        id="outlined-basic"
                        name="app_name"
                        placeholder="Enter application name"
                        label="Application"
                        variant="outlined"
                        required
                        type="text"
                        fullWidth
                    />

                    <br />
                    <br />

                    <TextField
                        id="outlined-basic"
                        name="app_desc"
                        label="Description"
                        placeholder="Application description"
                        variant="outlined"
                        rows={4}
                        type="email"
                        fullWidth
                        multiline
                    />
                    <br />
                    <br />

                    <Box sx={{ display: 'flex' }}>
                        <Button sx={{
                            textTransform: "none",
                            fontSize: 16
                        }}
                            variant="contained"
                            type="submit"
                            disableElevation={true}>
                            Save</Button>
                        <Button
                            variant="contained"
                            sx={{
                                marginLeft: "10px", textTransform: "none",
                                fontSize: 16
                            }}
                            color="inherit"
                            onClick={() => { navigate("/applications") }}
                            disableElevation={true}>
                            Cancel</Button>
                    </Box>
                </form>
            </Grid>
            <ToastContainer
                transition={Slide}
                toastStyle={{
                    backgroundColor: "#fafafa",
                }} />
        </div>
    )
}
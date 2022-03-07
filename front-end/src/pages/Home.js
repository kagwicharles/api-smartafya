import { Grid, Button, Stack, Box, Typography, Slide } from '@mui/material';
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import DemoDialog from '../components/DemoDialog';

import '../static/css/home.css'
import MediLogo from '../static/img/medical1.svg'

export default function Home() {
    const navigate = useNavigate()
    const [open, setOpen] = useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <DemoDialog open={open} onClose={handleClose}/>
            <Slide direction='up' in={true} timeout={1000}>
                <Grid container
                    className='container fill-height align-items-center'>
                    <Grid item xs={6}>
                        <Stack spacing={2} justifyContent='center'>
                            <h1 align='left'>
                                Accurate predictions for Malaria, Pneumonia and Covid19.
                            </h1>
                            <Typography variant="p"
                                align='left'
                                style={{ fontFamily: "sans-serif" }}>
                                Our APIs are designed to scale and are available on request by client applications.
                                All you need to do is send an image to our service.
                            </Typography>
                            <Box display='flex'>
                                <Button
                                    variant="contained"
                                    color='success'
                                    onClick={handleClickOpen}
                                    disableElevation={true}>
                                    Live Demo
                                </Button>
                                <Button
                                    sx={{
                                        marginLeft: '30px',
                                        ':hover': {
                                            color: "#fff"
                                        }
                                    }}
                                    variant="contained"
                                    onClick={() => { navigate("/applications") }}
                                    disableElevation={true}>
                                    Get Started
                                </Button>
                            </Box>
                        </Stack>
                    </Grid>
                    <Grid item xs={6}>
                        <img className='fill-height'
                            src={MediLogo} alt="Medi Logo" />
                    </Grid>
                </Grid>
            </Slide>
        </div>
    )
}
import { Grid, Typography, Box } from '@mui/material'
import { Icon } from '@iconify/react'
import { Link, Fade, Stack } from '@mui/material'
import JSONPretty from 'react-json-pretty';

import '../static/css/docs.css'

export default function Docs() {

    const resultNormal = {
        results: "Normal"
    };

    const resultInfected = {
        results: "Infected"
    };

    const apiError = {
        results: "X001"
    };

    const parametersMissing = {
        results: "X000"
    };

    return (
        <div className='container'>
            <Grid container
                className="flex-section"
            >
                <Grid
                    item
                    xs={12} lg={4} sm={12}
                    className={"flex-col-scroll pt-2"}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Icon width='40' height='40' color="#353c47" icon="bi:stack" />
                        <Typography variant="h6"
                            className='title-content'
                            align='left'
                            sx={{
                                marginLeft: '20px',
                                fontFamily: "RobotoBlack"
                            }}
                        >
                            Documentation
                        </Typography>
                    </Box>

                    <p style={{ textAlign: 'left', marginTop: '40px' }}>API Version: 1.0.0</p>

                    <Box className='left-column-cont scroll-effect' sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}>

                        <Typography
                            variant='h6' align='left'>
                            <Link href='#get-started' underline='hover'>Get Started</Link>
                        </Typography>
                        <Typography
                            variant='h6' align='left' className='mt-4'>
                            <Link href='#predict-xray' underline='hover'>Predict X-ray</Link>
                        </Typography>
                        <Typography
                            variant='h6' align='left' className='mt-4'>
                            <Link href='#error' underline='hover'>Errors</Link>
                        </Typography>
                    </Box>
                </Grid>
                <Grid
                    item
                    xs={12} lg={8} sm={12}
                    className={"flex-col-scroll"}
                >

                    <Box className='scroll-effect pb-2' style={{ paddingTop: '40px' }}>

                        <Fade in={true} timeout={1000}>
                            <Grid container
                                spacing={4}
                                alignItems="center"
                            >
                                <Grid item lg={7} >
                                    <Typography id='get-started' variant='h5'
                                        align='left' className='title-content'
                                        sx={{ fontFamily: "RobotoBlack" }}>
                                        Get Started
                                    </Typography>
                                    <p style={{ textAlign: 'left', paddingTop: '20px' }}>
                                        The Smart Afya API provides programmatic access to predict
                                        Chest x-ray scans as well as Microscopic red blood cells.
                                        Depending on the request you make, the api
                                        predicts one of the following cases: Malaria, Pneumonia and Covid19.
                                    </p>

                                    <p style={{ textAlign: 'left', marginTop: '20px' }}>To use this API, you need an API key. Get an API key <Link href='/applications' underline='hover'>here</Link>.</p>
                                </Grid>

                                <Grid item lg={5}
                                    display="flex"
                                    className='code-snippet'
                                >
                                    <code
                                        style={{ textAlign: "left" }}>
                                        API Endpoint
                                        <br />
                                        <br />
                                        https://api-smartafya.herokuapp.com/predict
                                    </code>
                                </Grid>
                            </Grid>
                        </Fade>

                        <Fade in={true} timeout={1000}>
                            <Grid container
                                spacing={4}
                                alignItems="center"
                            >
                                <Grid item lg={7}>
                                    <Typography id='predict-xray' variant='h5' align='left' className='title-content'
                                        style={{
                                            marginTop: '40px',
                                            fontFamily: "RobotoBlack"
                                        }}
                                    >
                                        Predict X-ray/Microscopic cells
                                    </Typography>

                                    <p style={{ textAlign: 'left', marginTop: '20px' }}>
                                        To predict an x-ray/microscopic cell image make a POST call to the following url :
                                        https://api-smartafya.herokuapp.com/predict
                                    </p>

                                    <Typography align='left' color='primary'>QUERY PARAMETERS</Typography>

                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Field</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>disease</td>
                                                <td>String</td>
                                                <td>"1" for Malaria, "2" for Pneumonia and "3"
                                                    for Covid19
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>user-email</td>
                                                <td>String</td>
                                                <td>Your Smart Afya registered email</td>
                                            </tr>
                                            <tr>
                                                <td>api-key</td>
                                                <td>String</td>
                                                <td>Your API key</td>
                                            </tr>
                                        </tbody>
                                    </table>

                                    <Typography align='left' color='primary'>REQUEST BODY</Typography>

                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Field</th>
                                                <th>Type</th>
                                                <th>Description</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>file</td>
                                                <td>FormData</td>
                                                <td>Image file to diagnose</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                                <Grid item lg={5}
                                    className='code-snippet'
                                    display="flex"
                                    direction="column"
                                >
                                    <code>
                                        <div style={{ textAlign: "left" }}>
                                            <div>
                                                <div>
                                                    POST: https://api-smartafya.herokuapp.com/predict?
                                                    disease="Numeric value for disease"
                                                    &user-email="Your email"
                                                    &api-key="Your generated API key"
                                                </div>
                                                <br />
                                                <div>
                                                    Request body:
                                                    "file": "Image to diagnose"
                                                </div>
                                            </div>
                                            <br />
                                            Results(Normal case):
                                            <JSONPretty data={resultNormal} />
                                            <br />
                                            Results(Infected case):
                                            <JSONPretty data={resultInfected} />
                                        </div>
                                    </code>
                                </Grid>
                            </Grid>
                        </Fade>

                        <Fade in={true} timeout={1000}>
                            <Grid container
                                spacing={4}
                                alignItems="center"
                            >
                                <Grid item lg={7}>
                                    <Typography id='error' variant='h5' align='left' className='title-content'
                                        style={{
                                            marginTop: '40px',
                                            fontFamily: "RobotoBlack"
                                        }}
                                    >
                                        Errors
                                    </Typography>

                                    <p style={{ textAlign: 'left', marginTop: '20px' }}>Smart Afya can produce the following errors.</p>

                                    <table className='table'>
                                        <thead>
                                            <tr>
                                                <th>Error code</th>
                                                <th>Meaning</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>X000</td>
                                                <td>Some parameters are missing</td>
                                            </tr>
                                            <tr>
                                                <td>X001</td>
                                                <td>Security key is invalid</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </Grid>
                                <Grid item lg={5}
                                    className='code-snippet'
                                    display="flex"
                                >
                                    <code>
                                        <div style={{ textAlign: "left" }}>
                                            Invalid API key:
                                            <JSONPretty data={apiError} />
                                            <br />
                                            Missing parameters:
                                            <JSONPretty data={parametersMissing} />
                                        </div>
                                    </code>
                                </Grid>

                            </Grid>
                        </Fade>
                    </Box>
                </Grid>
            </Grid >
        </div >
    )
}
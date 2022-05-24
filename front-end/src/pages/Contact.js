import { useState } from 'react'
import { send } from 'emailjs-com'
import { Button, TextField, Grid, Grow, Stack } from "@mui/material"
import ContactBg from '../static/img/envelope.svg'

export default function Contact() {

    const [isFormHidden, setFormVisibility] = useState(true)
    const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID
    const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID
    const EMAILJS_USER_ID = process.env.REACT_APP_EMAILJS_USER_ID

    const [toSend, setToSend] = useState({
        from_name: '',
        to_name: '',
        message: '',
        subject: '',
        email: ''
    })

    const clearForm = () => {
        document.getElementById("contact-form").reset();
    }

    const handleChange = (e) => {
        setToSend({ ...toSend, [e.target.name]: e.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        sendEmail()
    }

    const sendEmail = () => {
        setFormVisibility(false)
        send(EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            toSend, EMAILJS_USER_ID)
            .then((result) => {
                setTimeout(setFormVisibility(true), 8000)
                clearForm()
            }, (error) => {
                setTimeout(setFormVisibility(true), 3000)
            });
    };

    return (
        <div className="container">
            <Grid container spacing={2}
                sx={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                <Grid item
                    lg={8} md={6} sm={0}
                    className='p-4 fill-height remove-view'
                    display='flex'
                    justifyContent='center'
                >
                    <img
                        className={
                            isFormHidden ? "contact-form mt-4 d-flex flex-column mb-3 p-4" : "d-none"}
                        src={ContactBg} alt="contact us" />
                    <Stack className={
                        !isFormHidden ? "contact-form mt-4 d-flex flex-column mb-3 p-4" : "d-none"}
                    >
                        <h1>
                            Thank you for reaching us.</h1>
                    </Stack>
                </Grid>
                <Grid item
                    lg={4} sm={12} xs={12} md={6}
                >
                    <h2
                        style={{
                            marginTop: '50px',
                            fontFamily: "NotoSansBold"
                        }}
                        align="left">Get In Touch</h2>
                    <Grow in={true} timeout={1000}>

                        <Stack id="contact-form"
                            className="contact-form mt-4 d-flex flex-column mb-3"
                            component="form"
                            spacing={2}
                            onSubmit={handleSubmit}>
                            <TextField
                                id="user_name"
                                name="user_name"
                                label="Email"
                                placeholder="Enter your email"
                                variant="outlined"
                                required
                                type="email"
                                fullWidth
                                inputProps={{
                                    maxLength: 30
                                }}
                                onChange={handleChange}
                            />

                            <TextField
                                id="subject"
                                name="subject"
                                label="Subject"
                                placeholder="Enter email subject"
                                variant="outlined"
                                required
                                type="text"
                                fullWidth
                                inputProps={{
                                    maxLength: 30
                                }}
                                onChange={handleChange}
                            />

                            <TextField
                                id="message"
                                name="message"
                                label="Message"
                                placeholder="Enter Message"
                                variant="outlined"
                                rows={4}
                                multiline
                                required
                                type="text"
                                fullWidth
                                inputProps={{
                                    maxLength: 300
                                }}
                                onChange={handleChange}
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                disableElevation={true}>
                                Send Message
                            </Button>
                        </Stack>
                    </Grow>
                </Grid>
            </Grid>
        </div>
    )
}
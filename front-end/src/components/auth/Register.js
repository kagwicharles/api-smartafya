import React, { useState } from 'react';
import { Button, TextField, Box, Link, Grid, Stack } from '@mui/material'
import { ToastContainer, Slide, toast } from 'react-toastify';
import { notify } from '../../utils/util';
import { TailSpin } from "react-loader-spinner"
import 'react-toastify/dist/ReactToastify.css';

import { registerWithEmailAndPassword } from '../../authentication/firebase'
import { PassWordField } from '../CustomElements/UIElements';

export default function Register() {

  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [secondPassword, setSecondPassword] = useState('');

  const handlePasswordChange = (password) => {
    setPassword(password)
  }

  var passMatchError = document.getElementById("password-match");

  const verifyConfirmPassword = (confirmPassword) => {
    setSecondPassword(confirmPassword);
    if (password !== confirmPassword) {
      passMatchError.style.display = "block";
    } else {
      passMatchError.style.display = "none";
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    passMatchError.style.display = "none";
    setLoading(true);
    if (password.length < 6) {
      setLoading(false);
      passMatchError.style.display = "block";
      passMatchError.innerHTML = "Password should be 6 characters or more!";
      return;
    }
    if (secondPassword === password) {
      registerWithEmailAndPassword(firstName, lastName,
        email, password).catch((error) => {
          setLoading(false);
          switch (error.code) {
            case 'auth/email-already-in-use':
              notify("Already registered!", toast.TYPE.ERROR);
              break;
            default:
              notify("Registration failed!", toast.TYPE.ERROR);
              break;
          }
        })
    } else {
      setLoading(false);
      passMatchError.innerHTML = "Passwords do not match!";
      passMatchError.style.display = "block";
    }
  };

  return (
    <Grid container className='container' justifyContent="center"
      sx={{
        marginTop: 4,
        padding: 2,
        marginBottom: 4
      }}
    >

      <Stack sx={{ boxShadow: 3, padding: 8 }}>
        <div>
          <h1 style={{ fontFamily: "NotoSansBold" }}
            align='left'>
            Create an Account
          </h1>
          <p align="left"
            style={{ marginLeft: 15 }}>
            Fill in the form to create a new account</p>
        </div>
        <Stack
          spacing={3}
          component="form"
          onSubmit={handleSubmit} sx={{
            mt: 1,
            display: 'flex',
            flexDirection: 'column'
          }}>
          <TextField
            autoComplete="given-name"
            name="firstName"
            required
            fullWidth
            id="firstName"
            label="First Name"
            autoFocus
            variant='standard'
            onChange={(e) => setFirstName(e.target.value)}
          />

          <TextField
            required
            fullWidth
            id="lastName"
            label="Last Name"
            name="lastName"
            autoComplete="family-name"
            variant='standard'
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            variant='standard'
            onChange={(e) => setEmail(e.target.value)}
          />

          <Stack>
            <p id="password-match"
              align="left"
              className='text-danger'>Passwords do not match!</p>
            <PassWordField
              updatePassword={handlePasswordChange}
              label={"Password"} />
          </Stack>

          <PassWordField updateConfirmPassword={verifyConfirmPassword}
            label={"Confirm Password"} />
          <br />
          {!loading ?
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disableElevation={true}
            >
              Sign Up
            </Button> : <Box
              display="flex"
              justifyContent="center"
            >
              <TailSpin color="#00BFFF" height={30} width={30} />
            </Box>}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Sign in
              </Link>
            </Grid>
          </Grid>
          <ToastContainer
            transition={Slide}
            toastStyle={{
              backgroundColor: "#fafafa",
            }} />
        </Stack>
      </Stack>
    </Grid >
  );
}
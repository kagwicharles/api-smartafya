import * as React from 'react';
import { Button, TextField, Checkbox, Link, Grid } from '@mui/material'
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, Slide, toast } from 'react-toastify';
import { notify } from '../../utils/util';
import 'react-toastify/dist/ReactToastify.css';

import { registerWithEmailAndPassword } from '../../authentication/firebase'

export default function Register() {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    var password = data.get("password")
    var confirmPassword = data.get('confirmPassword')
    if (password !== confirmPassword) {
      notify("Register error", toast.TYPE.ERROR)
      return
    }
    registerWithEmailAndPassword(data.get('firstName'), data.get('lastName'),
      data.get('email'), password)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
    });
  };

  return (
    <Grid className='container' justifyContent="center"
      sx={{
        marginTop: 4,
        padding: 2,
        marginBottom: 4
      }}
    >

      <h1 align='left'>
        Create an Account
      </h1>
      <Grid xs={12} sm={4}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
        component="form"
        noValidate
        onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              autoComplete="given-name"
              name="firstName"
              required
              fullWidth
              id="firstName"
              label="First Name"
              autoFocus
              variant='standard'
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              id="lastName"
              label="Last Name"
              name="lastName"
              autoComplete="family-name"
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="new-password"
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              fullWidth
              name="confirmPassword"
              label="Confirm password"
              type="password"
              id="confirmPassword"
              autoComplete="new-password"
              variant='standard'
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={<Checkbox value="allowExtraEmails" color="primary" />}
              label="I want to receive marketing promotions and updates via email."
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          disableElevation={true}
        >
          Sign Up
        </Button>
        <Grid container justifyContent="flex-end">
          <Grid item>
            <Link href="/login" variant="body2">
              Already have an account? Sign in
            </Link>
          </Grid>
        </Grid>
      </Grid>
      <ToastContainer
        transition={Slide}
        toastStyle={{
          backgroundColor: "#fafafa",
        }} />
    </Grid>
  );
}
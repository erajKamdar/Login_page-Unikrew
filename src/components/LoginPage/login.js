import React, { useState } from "react";
import { useFormik } from "formik";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { validationSchemaOne } from '../Validations/validations';
import { useStyles } from "./style";
import { LockOutlined } from "@material-ui/icons";
import { Avatar } from "@material-ui/core";
// import {swal} from 'sweetalert';
import Swal from 'sweetalert2';


async function loginUser(credentials) {
  return fetch('http://restapi.adequateshop.com/api/authaccount/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials)
  })
    .then(data => data.json())
}

const LoginForm = () => {
  const classes = useStyles();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const formik = useFormik({
    initialValues: {
      emailAddress: "",
      password: "",
    },
    onSubmit: async (e) => {
      setEmail(e.emailAddress)
      setPassword(e.password)
      const response = await loginUser({
        email,
        password
      })
  
      let timerInterval;
  
      if (response.message === "success") {
  
        Swal.fire({
          title: 'Checking Email and Password',
          html: 'Wait! Loading...',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
            Swal.fire('Log In Success', response.message, 'success')
          }
        })
  
          .then((value) => {
            localStorage.setItem('Token', response.data.Token);
            localStorage.setItem('user', JSON.stringify(response.data.name));
            window.location.href = "https://unikrew.com/";
          });
      } else {
        console.log(response);
        Swal.fire({
          title: 'Checking Email and Password',
          html: 'Wait! Loading...',
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading()
            const b = Swal.getHtmlContainer().querySelector('b')
            timerInterval = setInterval(() => {
              b.textContent = Swal.getTimerLeft()
            }, 100)
          },
          willClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
            Swal.fire('Log In Failed', response.message, 'error')
          }
        })
      }
    },
    validationSchema: validationSchemaOne
  });
  return (
    <div className={classes.paper}>
      <h1 style={{ color: "blueviolet", fontFamily: "cursive" }}> LOG IN NOW </h1>
      <Avatar style={{ backgroundColor: "blueviolet" }} className={classes.avatar}>
        <LockOutlined />
      </Avatar>
      <form className={classes.form} onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>

          <Grid item xs={12} sm={6} >
            <TextField
              style={{ borderRadius: "5px", borderBottom: "transparent", paddingBottom: "5px" }}
              size="large"
              fullWidth
              color="primary"
              id="email"
              label="Email Address*"
              name="emailAddress"
              autoComplete="email"
              value={formik.values.emailAddress}
              onChange={formik.handleChange}
              error={
                formik.touched.emailAddress &&
                Boolean(formik.errors.emailAddress)
              }
              helperText={
                formik.touched.emailAddress && formik.errors.emailAddress
              }
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              style={{ borderRadius: "5px", borderBottom: "transparent", paddingBottom: "15px" }}
              size="large"
              color="primary"
              // variant="filled"
              fullWidth
              name="password"
              label="Password*"
              type="password"
              id="password"
              autoComplete="current-password"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
            />
          </Grid>
        </Grid>
        <div style={{}}>
          <Button size="large" className={classes.btn} color="default" fullWidth variant="outlined" type="submit"
            style={{
              width: "60%", padding: "10px", marginTop: "50px",
              marginBottom: "20px", backgroundColor: "blueviolet",
              color: "white", fontSize: "18px", justifyContent: "center",
              alignContent: "center", textAlign: "center"
            }}
          >
            Log In
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
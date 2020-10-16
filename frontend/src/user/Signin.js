import React, { useState } from "react";
import Base from "../core/Base";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { signin, authenticate, isAuthenticated } from "../auth/helper";
import { Link, Redirect } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";
import Admindashboard from "./AdminDashBoard";
import Userdashboard from "./UserDashBoard";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "65ch",
    },
  },
  card: {
    minWidth: "35rem",
    maxWidth: "40rem",
    border: "1px solid green",
    minHeight: "25rem",
    margin: "50px",
    backgroundColor:"#f0f2f5"
  },
}));
export default function Signin() {
  const classes = useStyles();
  const [values, setValues] = useState({
    email: "amar@gmail.com",
    password: "12345",
    loading: false,
    error: "",
    isRedirected: false,
  });
  const { email, password, loading, error, isRedirected } = values;
  const { user } = isAuthenticated();
  const SigninForm = () => {
    return (
      <div className="card">
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{margin:'30px'}}
                id="outlined-basic"
                label="email"
                variant="outlined"
                value={email}
                onChange={handleChange("email")}
              />
              <br />
              <TextField
                id="outlined-basic"
                label="password"
                variant="outlined"
                value={password}
                onChange={handleChange("password")}
              />
              <br />
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Submit
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  };
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false, loading: true });
    signin({ email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false });
        } else {
          authenticate(data, () => {
            setValues({
              ...values,
              isRedirected: true,
            });
          });
        }
      })
      .catch(console.log("signin failed"));
  };
  const performRedirect = () => {
    if (isRedirected) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />;
      } else {
        return <Redirect to="/user/dashboard" />;
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  };
  const loadingMessage = () => {
    return (
      <div
        style={{
          loading: true ? " " : "none",
          position: "absolute",
          top: "60px",
          right: "3px",
        }}
      >
        <Alert severity="success">Loading.....</Alert>
      </div>
    );
  };
  const errorMessage = () => {
    return (
      <div
        className="alert"
        style={{
          display: error ? " " : "none",
          position: "absolute",
          top: "60px",
          right: "3px",
        }}
      >
        <Alert severity="warning">{error}</Alert>
      </div>
    );
  };
  return (
    <Base title={"Signin Page"}>
      {loadingMessage()}
      {errorMessage()}
      {SigninForm()}
      {performRedirect()}
    </Base>
  );
}

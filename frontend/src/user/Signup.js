import React, { useState } from "react";
import Base from "../core/Base";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { signup } from "../auth/helper";
import { Link } from "react-router-dom";
import Alert from "@material-ui/lab/Alert";

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
    backgroundColor: "#f0f2f5",
  },
}));

export default function Signup() {
  const classes = useStyles();
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });
  const { name, email, password, error, success } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    signup({ name, email, password })
      .then((data) => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const successMessage = () => {
    return (
      <div
        style={{
          display: success ? " " : "none",
          position: "absolute",
          top: "60px",
          right: "3px",
        }}
      >
        <Alert severity="success">
          Signup successfully please <Link to="/signin">signup</Link>
        </Alert>
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

  const SignupForm = () => {
    return (
      <div className="card">
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                id="outlined-basic"
                label="Name"
                variant="outlined"
                value={name}
                onChange={handleChange("name")}
              />
              <br />
              <TextField
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
  return (
    <Base title={"Signup Page"}>
      {successMessage()}
      {errorMessage()}
      {SignupForm()}
    </Base>
  );
}

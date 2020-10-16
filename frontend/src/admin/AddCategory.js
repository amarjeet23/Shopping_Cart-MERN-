import React, { useState } from "react";
import Base from "../core/Base";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { createCategory } from "./helper/adminapicall";
const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
      minWidth: 275,
    },
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  card: {
    minWidth: "30rem",
    maxWidth: "30rem",
    border: "1px solid green",
    minHeight:'20rem',
    margin:'50px'
  },
}));

const AddCategory = (props) => {
  const classes = useStyles();
  const [name, setName] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();
  const onSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    createCategory(user._id, token, { name })
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setName("");
          setError("");
          setSuccess(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const successMessage = () => {
    if (success) {
      return <p>category created successfully</p>;
    }
  };
  const errorMessage = () => {
    if (error) {
      return <p>Something went wrong</p>;
    }
  };

  return (
    <Base title="create Category" description="Add your category here">
      <h1>{props.title}</h1>
      {successMessage()}
      {errorMessage()}

      <div className="card">
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField style={{margin:'20px'}}
                id="standard-basic"
                label="Add category here.."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <br />
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Add category
              </Button>
            </form>
            <Button color="inherit">
              <Link to="/admin/dashboard">Back to dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Base>
  );
};
export default AddCategory;

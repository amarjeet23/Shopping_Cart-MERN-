import React,{useState} from "react";
import Base from "../core/Base";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import { Link } from "react-router-dom";
import { createaProduct } from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";



const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
  card: {
    minWidth: "30rem",
    maxWidth: "30rem",
    border: "1px solid green",
    minHeight: "20rem",
    margin: "50px",
  },
}));

const AddProduct = (props) => {
  const classes = useStyles();
  const [values,setValues] = useState({
    name:'',
    description:'',
    price:'',
    stock:'',
  })
  const {name,description,price,stock} = values
  const {token,user} = isAuthenticated();
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };
  const onSubmit =() =>{
    createaProduct(user._id,token,{values})
    .then(data =>{
      if(data.error){

      }
      else{

      }
    })
    .catch(err =>console.log(err))
  }
  return (
    <Base title="create product" description="Add your product here">
      <h1>{props.title}</h1>
      <div className="card">
        <Card className={classes.card}>
          <CardContent>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField id="standard-basic" type="file" label="" />
              <br />
              <TextField id="standard-basic" label="product name"  value={name} onChange={handleChange("name")}/>
              <br />
              <TextField id="standard-basic" label="description" value={description}  onChange={handleChange("description")}/>
              <br />
              <TextField id="standard-basic" label="price" value={price} onChange={handleChange("price")}/>
              <br />
              <TextField id="standard-basic" label="stock" value={stock} onChange={handleChange("stock")}/>
              <br />
              <Button variant="contained" color="primary" onClick={onSubmit}>
                Add product
              </Button>
            </form>
            <Button>
              <Link to="/admin/dashboard">Back to dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </Base>
  );
};
export default AddProduct;

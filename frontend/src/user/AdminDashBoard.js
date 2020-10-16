import React from "react";
import Base from "../core/Base";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { isAuthenticated } from "../auth/helper";
import {Link,withRouter} from "react-router-dom"

const useStyles = makeStyles({
  table: {
    maxWidth: 250,
  },
});
const row = {
  backgroundColor: "white",
  width:"234px"
};
const header = {
    backgroundColor:"#EAF0F1",
    textAlign:"center"
}
const Admindashboard = () => {
  const classes = useStyles();
  const {
    user: { name, email },
  } = isAuthenticated();

  return (
    <Base title={"welcome Admin"} description={"Manage products here ...!"}>
      <div className="admin">
        <TableContainer>
          <Table className={classes.table} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell style={header}>
                  Admin Dashbaord
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            <Link to="/admin/create/category">
              <TableRow>
                
                <TableCell align="center" style={row}>
                  Create Catergories
                </TableCell>
                
              </TableRow>
              </Link>
              <TableRow>
                <Link to="/admin/create/product">
                    <TableCell align="center" style={row}>
                    Create products
                </TableCell>
                </Link>
              </TableRow>
              <TableRow>
                <Link to="/admin/product">
                <TableCell align="center" style={row}>
                  Manage products
                </TableCell>
                </Link>
              </TableRow>
              <TableRow>
               
                <TableCell align="center" style={row}>
                  Manage order
                </TableCell>
                
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <div style={header}>
          <h3>Name : {name}</h3>
          <h3>Email: {email}</h3>
        </div>
      </div>
    </Base>
  );
};
export default Admindashboard;

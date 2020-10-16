import React from 'react';
import {BrowserRouter,Switch,Route} from "react-router-dom"
import AddCategory from './admin/AddCategory';
import AdminRoute from './auth/helper/AdminRoutes';
import PrivateRoute from './auth/helper/PrivateRoutes';
import Base from './core/Base';
import Home from "./core/Home"
import Admindashboard from './user/AdminDashBoard';
import Signin from './user/Signin'
import Signup from "./user/Signup"
import Userdashboard from './user/UserDashBoard';
import AddProduct from "./admin/AddProduct"


const Routes = ()=> {
    return (
        
        <BrowserRouter>
        
        <Switch>
            <Route path = "/" exact component = {Home}/>
            <Route path = "/signin" component = {Signin}/>
            <Route path = "/signup" exact component = {Signup}/>
            <AdminRoute path = "/admin/dashboard" exact component = {Admindashboard}/>
            <PrivateRoute path = "/user/dashboard" exact component = {Userdashboard}/>
            <PrivateRoute path = "/admin/create/category" exact component = {AddCategory}/>
            <PrivateRoute path = "/admin/create/product" exact component = {AddProduct}/>



        </Switch>  
    
        </BrowserRouter>
   
    )
}
export default Routes
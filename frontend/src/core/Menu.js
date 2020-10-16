import React from 'react'
import {Link,withRouter} from "react-router-dom"
import { signout,isAuthenticated} from '../auth/helper'
import { useHistory } from "react-router-dom";

const Menu=()=> {
    const history = useHistory();
    return (
        <div className="header_list">
            <Link to="/">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/cart">Cart</Link>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (<Link to="/user/dashboard">U.dashboard</Link>)}
           {isAuthenticated() && isAuthenticated().user.role === 1 &&(<Link to="/admin/dashboard">A.dashboard</Link>)} 
            {!isAuthenticated() && (<>
            <Link to="/signin">Signin</Link>
            <Link to="/signup">Signup</Link>
            </>
            )}
            
            {isAuthenticated() && 
            (<>
                <span id="signout"onClick = {()=>{
                    signout(()=>{
                        history.push("/")
                    })
                }}>signout</span>
            </>
            )}
            
        </div>
    )
}
export default withRouter(Menu)
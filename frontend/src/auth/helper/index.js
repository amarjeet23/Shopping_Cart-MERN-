import {API} from "../../backend"

// METHOD for hitting Backend


// SIGNUP
export const signup =(user)=>{
    return fetch(`${API}/signup`,{
        method : "POST",
        headers :{
            Accept : "application/json",
            "Content-type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>{
        console.log(err)
    })
}


// SIGNIN
export const signin =(user)=>{
    return fetch(`${API}/signin`,{
        method : "POST",
        headers : {
            Accept : "application/json",
            "Content-Type" : "application/json"
        },
        body : JSON.stringify(user)
    })
    .then(response =>{
        return response.json()
    })
    .catch(err =>console.log(err))
}


// user should be continuosly signin once he login
export const authenticate = (data,next)=>{
    if(typeof window !== "undefined"){
        localStorage.setItem("jwt",JSON.stringify(data))
        next();
    }
}


// SIGNOUT
export const signout =(next)=>{
    if(typeof window !== "undefined"){
        localStorage.removeItem("jwt")
        next();

        return fetch(`${API}/signout`,{
           method : "GET", 
        })
        .then(response => console.log("signout success"))
        .catch(err => console.log(err))
    }  
}
// validate user is SIGNIN OR NOT .
export const isAuthenticated =()=>{
    if(typeof window ==="undefined"){
        return false;
    }
    if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"))
    }else{
        return false;
    }   
}

import React,{useEffect,useState} from 'react'
import {API} from "../backend"
import Base from "./Base"
import {getProducts} from "../admin/helper/adminapicall"
import Cardbox  from './Cardbox'


const Home=()=> {
    const [products,setProducts] = useState([])
    const [error,setError]  = useState('')
 
    const loadProducts = () =>{
     getProducts()
     .then(data =>{
         console.log(data)
         console.log(data._id)
         if(data.error){
             setError(data.error)
         }
         else{
             setProducts(data)
         }
     })
     .catch( err =>console.log(err))
 }
 useEffect(()=>{
     loadProducts()

 },[])
    
    return (
        <Base  title={"Choose the best one here"}>
        <div className="cardbox">
           {products.map((res) =>{
               return <Cardbox product={res}/>
           })}
           </div>
        </Base>
    )
}
export default Home
import React, { useState,useEffect,useContext} from 'react'
import { Navigate } from 'react-router-dom'
import axios from "axios";
import Mynavbar from './Mynavbar';
import { AuthContext} from '../Auth/Auth';
const Main = (props) => {
    const {page} = props;
    const {checkLogout,email,name,picture,userId,role} = useContext(AuthContext);
    if(checkLogout){
        return <Navigate to ="/"/>
    }
    return(<>
        <div style={{position:"relative"}}>
            <Mynavbar username={name} role={role} picture={picture}/>
            <div style={{marginLeft:"100px",marginTop:"100px"}}>
                {page}
            </div>
        </div>
    </>)
}
export default Main;

/*let config = {
            headers: {
            'Authorization': 'Bearer ' + token
            }
        }
        axios.post("http://localhost:3001/authen",{key:"0"},config)
        .then((res)=>{
        if(res.data.status==="ok"){
            console.log(res.data);
            setuser(res.data.decoded)
        }else{
            localStorage.removeItem('token');
            setcheckLogout(true)
        }
        },(err)=>{
            setcheckLogout(true)
        })*/
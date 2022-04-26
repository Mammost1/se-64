import React,{useState,useEffect} from "react";
import axios from 'axios';
import ViewLoading from "../View/ViewLoading";
export const AuthContext= React.createContext();
export const AuthProvider = ({children})=>{
    const [loading,setLoading] = useState(true);
    const [checkLogout,setcheckLogout] = useState(false)
    const [email,setEmail] = useState("")
    const [name,setName] = useState("")
    const [picture,setPicture] = useState("")
    const [userId,setUserId] = useState("")
    const [role,setRole] = useState("")
    const checkAuthentication = ()=>{
        const token = localStorage.getItem("googletoken")
        let config = {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        }
        axios.post("http://localhost:3001/auth/google",{},config)
        .then((res)=>{
            if(res.data.status==="ok"){
                setEmail(res.data.email)
                setName(res.data.name)
                setPicture(res.data.picture)
                //console.log(res.data);
                axios.post("http://localhost:3001/dataUser",{
                    gmail:res.data.email
                })
                .then((res)=>{
                    setRole(res.data.role)
                    setUserId(res.data.id)
                    setLoading(false);

                },(err)=>{
                    localStorage.removeItem('googletoken');
                    setcheckLogout(true)
                    setLoading(false);
                })
            }else{
                localStorage.removeItem('googletoken');
                setcheckLogout(true)
                setLoading(false);
            }
        },(err)=>{
            localStorage.removeItem('googletoken');
            setcheckLogout(true)
            setLoading(false);
        })
    }
    useEffect(()=>{
        checkAuthentication();
    },[])
   if (loading) {
        return <ViewLoading/>;
   }
    //console.log(currentUser.email);
    return (
        <AuthContext.Provider value={{checkLogout,email,name,picture,userId,role}}>
            {children}
        </AuthContext.Provider>
    )
}
import React, { useState,useEffect ,useContext} from 'react'
import { Navigate } from 'react-router-dom'
import axios from 'axios';
import { GoogleLogin } from 'react-google-login';
import { AuthContext} from '../Auth/Auth';
import "./Login.css"
const Login = () => {
    const {checkLogout,setCheckLogout} = useContext(AuthContext);
    const [login,setLogin]=useState(false);
    const onLoginSuccess = async(resLogin) => {
        //if (res.profileObj.email.split('@')[1] === "ku.th") {
            localStorage.setItem('googletoken', resLogin.tokenId);
            let gmail = resLogin.profileObj.email;
            //console.log(res.profileObj.email);
            axios.post("http://localhost:3001/checkUser",{
                gmail:gmail
            })
            .then((res)=>{
                console.log(res.data);
                if(res.data.status==="ok"){
                    if(res.data.newUser){
                        if (resLogin.profileObj.email.split('@')[1] === "ku.th") {
                            axios.post("http://localhost:3001/addUser",{
                                gmail:gmail,
                                role:"user"
                            })
                            .then((res)=>{
                                if(res.data.status==="ok"){
                                    setLogin(true)
                                    window.location = '/Home'
                                }
                                else{
                                    alert(res.data.message)
                                }
                            },(err)=>{
                                alert(err);
                            })
                        }else{
                            localStorage.removeItem('googletoken');
                            alert("กรุณาใช้ gmail Ku  (xxxxx@ku.th)")
                        }
                    }else{
                        setLogin(true)
                        window.location = '/Home'
                    }
                }else{
                    alert(res.data.message);
                }
            },(err)=>{
                alert(err);
            })
        /*}
        else{
            alert("กรุณาใช้ gmail Ku  (xxxxx@ku.th)")
        }*/
    };

    /*useEffect(()=>{
        const token = localStorage.getItem("googletoken")
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        axios.post("http://localhost:3001/auth/google",{},config)
        .then((res)=>{
            if(res.data.status==="ok"){
                setLogin(true)
            }
        },(err)=>{
            alert(err);
        })
    },[])*/
    if(!checkLogout){
        return <Navigate to="/Home"/>;
    }
    return (
        <>
        <div className="containerLogin">
            <h1 class="d-flex justify-content-center" style={{color:"#680C07",fontFamily:"Roboto",fontSize:'144px',fontWeight:'800'}}>KU</h1>
            <h1 class="d-flex justify-content-center mb-4" style={{color:"#680C07",fontFamily:"Roboto",fontSize:'25px',fontWeight:'800'}}>SCHOLASHIP</h1>
            <h6 class="d-flex justify-content-center mb-4" style={{color:"#029522",fontFamily:"Roboto"}}>To continue, log in with your KU Account.</h6>
        </div>
        <div id="containerLogin">
        <GoogleLogin
                clientId={"436017987478-6mtcv4vuh136te7guu947dd732ibm4o3.apps.googleusercontent.com"}
                buttonText="Sign In with Google"
                onSuccess={onLoginSuccess}
                onFailure={onLoginSuccess}
                cookiePolicy={'single_host_origin'}
                prompt="select_account"
        />
        </div>
        <br/>
        <br/>
        <div style={{alignItems:"center",justifyContent:"center",display:"flex"}}>
            <div >
                <div style={{textAlign:"center"}}>
                    <h4>admin</h4>
                </div>
                <h4>gmail: SeProject.G6@gmail.com</h4>
                <h4>Password:Se666666</h4>

                <div style={{textAlign:"center"}}>
                    <h4>committee</h4>
                </div>
                <h4>gmail: committeeG6.1@gmail.com</h4>
                <h4>Password:Se666666</h4>
                <h4>gmail: committeeG6.2@gmail.com</h4>
                <h4>Password:Se666666</h4>
            </div>
        </div>
        
        </>
    )
}

export default Login;

/*    const loginSubmit = (e) => {
        e.preventDefault();
        const {username,password,} = e.target.elements
        if(username.value && password.value){
            axios.post("http://localhost:3001/login",{
                username:username.value,
                password:password.value,
            }).then((res)=>{
                if(res.data.status === "ok"){
                    localStorage.setItem('token', res.data.token);
                    setLogin(true)
                }
                else{
                    alert(res.data.message);
                }
            },(err)=>{
                alert(err);
            })
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    }
    const registerSubmit = (e) => {
        e.preventDefault();
        const {username,password,role} = e.target.elements
        if(username.value && password.value && role.value){
            axios.post("http://localhost:3001/checkUsername",{
                username:username.value,
        }).then((res)=>{
            if(res.data.status === "ok"){
                axios.post("http://localhost:3001/register",{
                    username:username.value,
                    password:password.value,
                    role:role.value
                }).then((res)=>{
                    if(res.data.status === "ok"){
                        username.value=""
                        password.value=""
                        role.value=""
                        alert("สมัครสำเร็จ")
                    }
                    else{
                        alert(res.data.message)
                    }
                },(err)=>{
                    console.log(err);
                })
            }
            else{
                alert(res.data.message)
            }
        },(err)=>{
            console.log(err);
        })
        }
        else{
            alert("กรุณากรอกข้อมูลให้ครบถ้วน");
        }
    }

    /*useEffect(()=>{
        const token = localStorage.getItem("token")
        let config = {
            headers: {
              'Authorization': 'Bearer ' + token
            }
        }
        axios.post("http://localhost:3001/authen",{
            key:"0"
        },config)
        .then((res)=>{
            if(res.data.status==="ok"){
                setLogin(true)
            }else{
               
            }
        },(err)=>{
            console.log(err);
        })
    },[])
    <form onSubmit={loginSubmit} class="row">
                <div className="mb-3" class="row">
                    <label  className="form-label" style={{color:"#868686",fontFamily:"Roboto",textAlign:'start'}}>Email address or username</label>
                    <input type="text"  name='username'/>
                </div>

                <div className="mb-3 row">
                    <label  className="form-label" style={{color:"#868686",marginTop:'10px',fontFamily:"Roboto",textAlign:'start'}}>Password</label>
                    <input  type="password" name='password'/>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" className="" style={{width:'25%',backgroundColor:"#680C07",borderRadius:"10px"}}>
                        <h5 style={{color:'#ffffff',fontFamily:"Roboto",marginTop:'10px',fontWeight:'800'}}>LOGIN</h5>
                    </button>
                </div>
            </form>
            <br/>

            <h1 class="d-flex justify-content-center" style={{color:"#680C07",fontFamily:"Roboto",fontSize:'144px'}}>Register</h1>
            <form onSubmit={registerSubmit} class="row">
                <div className="mb-3" class="row">
                    <label  className="form-label" style={{color:"#868686"}}>username</label>
                    <input type="text"  name='username'/>
                </div>

                <div className="mb-3 row">
                    <label  className="form-label" style={{color:"#868686",marginTop:'10px'}}>Password</label>
                    <input  type="text" name='password'/>

                    <label  className="form-label" style={{color:"#868686",marginTop:'10px'}}>Role</label>
                    <select name='role'>
                        <option value={"admin"}>แอดมิน</option>
                        <option value={"user"}>นิสิต</option>
                        <option value={"committee"}>กรรมการ</option>
                    </select>
                </div>
                <div class="d-flex justify-content-center">
                    <button type="submit" className="" style={{width:'25%',backgroundColor:"#680C07",borderRadius:"10px"}}>
                        <h5 style={{color:'#ffffff',fontFamily:"Roboto",marginTop:'10px'}}>Register</h5>
                    </button>
                </div>

            </form> */

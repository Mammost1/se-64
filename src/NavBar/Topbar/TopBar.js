import React,{Component,useContext} from "react";
import './TopBar.css'
import Image from "../image/Image";
import Data from "../text/Data";
import { AuthContext } from "../../Auth/Auth";
const TopBar =(props)=> {
    const {name,picture,role} = useContext(AuthContext);
    const logOut=()=>{
        localStorage.removeItem('googletoken');
        window.location="/"
    }
        return(
            <nav className="TopbarItems">
                <Image  size={'70px'}  />
                <Image url ={'https://upload.wikimedia.org/wikipedia/commons/6/61/ENG_th-flat_transparent_%281%29.gif'} size={'70px'} />
                <div className="c-bar">
                        <h1 className="Topbar-texts">คณะวิศวกรรมศาสตร์ ศรีราชา</h1>
                        <h2 className="Topbar-texts">มหาวิทยาลัยเกษตรศาสตร์ วิทยาเขตศรีราชา</h2>
                </div>
                <div className="data-container">
                    <img src={picture} style={{borderRadius:"50%",width:"70px"}}/>
                    <Data data={name} status={role}/>
                    <button className="btn-quit" onClick={()=>logOut()} >LOGOUT</button>
                </div>
            </nav>
        )
}
export default TopBar
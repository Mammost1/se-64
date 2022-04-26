import "./Contact.css"
import React, { useState,useEffect,useContext} from 'react'
import axios from "axios"
import { AuthContext } from "../Auth/Auth"
const Contact = () => {
    const {role} = useContext(AuthContext);
    const [contact,setContact] = useState({
        facebook:"",
        line:"",
        gmail:"",
        phone:"",
        location:""
    })
    const [correct,setCorrect] = useState("disabled")
    const changContact=(name,value)=>{
        setContact(contact => ({
            ...contact,
            [name]: value
    }));
    }
    const getContact=()=>{
        axios.get("http://localhost:3001/contact")
        .then((response) =>{
            if(response.data.status === "ok"){
                setContact(response.data.contact)
            }
        });
    }
    const updateContact=()=>{
        axios.put("http://localhost:3001/updateContact",{ 
            facebook :contact.facebook,
            line :contact.line,
            gmail :contact.gmail,
            phone :contact.phone,
            location :contact.location,
        }).then((response) =>{
            if(response.data.status === "ok"){
                alert(response.data.message)
                setCorrect("disabled")
            }
            else{
                alert(response.data.message)
            }
        });
    }
    useEffect(()=>{
        getContact()
    },[])
    return(<>
        <div style={{marginTop:"120px"}} >
            <div className="black_contact"> 
                <h1 style={{marginTop:"60px",marginLeft:"150px",width:"350px",backgroundColor: "#680C07",borderRadius:"20px",fontWeight:"normal",fontStyle:"normal"}} >ช่องทางการติดต่อ</h1>
            </div>
           <div className="container_object_1">

                <div className="row" style={{margin:""}}>
                    <div className="col-sm-6" style={{backgroundColor:""}} >
                        <div className="row" style={{margin:""}}>
                            <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                                <div className="container_facebook">
                                        <h1 ></h1>
                                        <input className="container_facebook_color" value={contact.facebook} onChange={(e)=>changContact("facebook",e.target.value)} disabled={correct}/>
                                </div>                                          
                                <div className="container_facebook_curcle" >
                                    <h1> </h1>
                                        <div className="container_facebook_picture">
                                            <img  className="container_facebook_picture_1" src="http://assets.stickpng.com/thumbs/584ac2d03ac3a570f94a666d.png" ></img>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{backgroundColor:""}} >

                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6" style={{backgroundColor:""}} >
                        <div className="row" style={{margin:""}}>
                            <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                                <div className="container_facebook">
                                        <h1 ></h1>
                                        <input className="container_facebook_color" value={contact.line} onChange={(e)=>changContact("line",e.target.value)} disabled={correct}/>
                                </div>                                          
                                <div className="container_facebook_curcle" >
                                    <h1> </h1>
                                        <div className="container_facebook_picture">
                                            <img  className="container_facebook_picture_1" src="https://upload.wikimedia.org/wikipedia/commons/2/2e/LINE_New_App_Icon_%282020-12%29.png" ></img>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{backgroundColor:""}} >

                            </div>
                        </div>
                    </div>
                </div>


                <div className="row" style={{margin:""}}>
                    <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                        <div className="row" style={{margin:""}}>
                            <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                                <div className="container_facebook">
                                        <h1 ></h1>
                                        <input className="container_facebook_color" value={contact.gmail} onChange={(e)=>changContact("gmail",e.target.value)} disabled={correct}/>
                                        
                                </div>                                          
                                <div className="container_facebook_curcle" >
                                    <h1> </h1>
                                        <div className="container_facebook_picture">
                                            <img  className="container_facebook_picture_1" src="https://cdn.icon-icons.com/icons2/2631/PNG/512/gmail_new_logo_icon_159149.png" ></img>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{backgroundColor:""}} >

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6" style={{backgroundColor:""}} >
                        <div className="row" style={{margin:""}}>
                            <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                                <div className="container_facebook">
                                        <h1 ></h1>
                                        <input className="container_facebook_color" value={contact.phone} onChange={(e)=>changContact("phone",e.target.value)} disabled={correct}/>
                                </div>                                          
                                <div className="container_facebook_curcle" >
                                    <h1> </h1>
                                        <div className="container_facebook_picture">
                                            <img  className="container_facebook_picture_1" src="https://w7.pngwing.com/pngs/759/922/png-transparent-telephone-logo-iphone-telephone-call-smartphone-phone-electronics-text-trademark.png" ></img>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{backgroundColor:""}} >

                            </div>
                        </div>
                    </div>
                </div>



                <div className="row" style={{margin:""}}>
                    <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                        <div className="row" style={{margin:""}}>
                            <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                                <div className="container_location">
                                        <h1 ></h1>
                                        <textarea className="container_location_color" value={contact.location} onChange={(e)=>changContact("location",e.target.value)} disabled={correct}></textarea>

                                </div>                                          
                                <div className="container_facebook_curcle" >
                                    <h1> </h1>
                                        <div className="container_facebook_picture">
                                            <img  className="container_facebook_picture_1" src="https://cdn2.vectorstock.com/i/1000x1000/39/41/office-tower-black-icon-concept-tower-vector-20953941.jpg" ></img>
                                        </div>
                                </div>
                            </div>
                            <div className="col-sm-6" style={{backgroundColor:""}} >

                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6" style={{backgroundColor:""}} >

                    </div>
                </div>
           </div>
           {(()=>{
                if(role==="admin"){
                    return(<>
                    <div className="row" style={{margin:"1%"}}>
                        <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                            <button type="button" className="btn btn-secondary btn-lg"  onClick={()=>setCorrect("")} style={{backgroundColor:" #680C07",color:"#ffffff",height:"50px",width:"120px"}}>  แก้ไข  </button>
                        </div>

                        <div className="col-sm-6" style={{backgroundColor:"",textAlign:"center"}} >
                        <button type="button" className="btn btn-secondary btn-lg"  onClick={()=>updateContact()}  style={{backgroundColor:" #680C07",color:"#ffffff",height:"50px",width:"120px"}}>  บันทึก  </button>
                        </div>
                    </div>
                    </>)
                }
            })()}
        </div>
    </>)
}
export default Contact;

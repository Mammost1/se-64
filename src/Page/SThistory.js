import React,{useContext, useEffect, useState} from "react";
import {useNavigate,useParams} from "react-router-dom"
import axios from "axios";
import { AuthContext } from "../Auth/Auth";
import ViewLoading from "../View/ViewLoading";
import Accordion from 'react-bootstrap/Accordion'
import { AiFillCloseCircle} from "react-icons/ai";
import './SThistory.css'
const SThistory= () => {
    const {userId,role} = useContext(AuthContext)
    const {checkUserId} = useParams()
    const [profile,setProfile] = useState(null)
    const [historyReceive,setHistoryReceive] = useState(null)
    const [loading,setLoading] = useState(true)

    const navigate = useNavigate()

    const getHistoryReceive =()=>{
        axios.post("http://localhost:3001/getHistoryReceive",{
            userId:checkUserId
        })
        .then((response) =>{
            console.log(response.data);
            if(response.data.status=== "ok"){
                let tmpData = response.data.contact
                /*tmpData.map((data)=>{
                    data.applicantDocuments = JSON.parse(data.applicantDocuments)
                })*/
                //tmpData.applicantDocuments = JSON.parse(tmpData.applicantDocuments)
                //console.log(tmpData);
                setHistoryReceive(tmpData)
            }else{
                alert(response.data.message)
            }
            setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getHistoryReceive)")
        });
    }

    useEffect(()=>{
        //console.log(userId);
        axios.post("http://localhost:3001/userProfile",{
            userId:checkUserId
        })
        .then((response) =>{
            console.log(response.data);
            if(response.data.status=== "ok"){
                setProfile(JSON.parse(response.data.myProfile))
                getHistoryReceive()
            }else{
                alert("ยังไม่พบข้อมูลในคุณในระบบกรุณาไปกรอกที่ช่องข้อมูลนิสิตก่อน")
                navigate(-1)
                setLoading(false)
            }
            //setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/userProfile)")
        });
    },[])
    if(parseInt(checkUserId)!==userId && role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div class="p-5" style={{fontFamily:'Prompt'}}>
            <h1 style={{fontFamily:'Prompt',fontWeight:'bold',color:"#680C07"}}>ประวัติการขอรับทุน</h1>
            <h3 style={{fontFamily:'Prompt',fontWeight:'bold',color:"#680C07",marginTop:'10px',marginBottom:'20px'}}>{"ชื่อ "+ profile.myFirstName +"  นามสกุล "+profile.myLastName+"  รหัสนิสิต " + profile.studentID}</h3>
            <Accordion defaultActiveKey="0" >
                {historyReceive.map((data,index)=>{
                    return(<>
                        <Accordion.Item eventKey={index.toString()} >
                            <Accordion.Header>{data.scholarshipName+" ปีการศึกษา"+data.academicYear+" "+data.term}</Accordion.Header>
                            <Accordion.Body>
                                <div class="list-group" >
                                    <a href={"/ApplicantInformation/"+data.scholarshipId+"/"+checkUserId} target="_blank" class="list-group-item list-group-item-action">ข้อมูลที่ส่งสมัคร</a>
                                    <a href={"/Details/"+data.scholarshipId} target="_blank" class="list-group-item list-group-item-action">ข้อมูลทุน</a>
                                    {(()=>{
                                        if(role==="admin"){
                                            return(<>
                                                <a href={"/CheckInterviewScore/"+data.scholarshipId+"/"+checkUserId} target="_blank" class="list-group-item list-group-item-action">คะแนนการสอบสัมภาษณ์</a>
                                            </>)
                                        }
                                    })()}
                                </div>
                            </Accordion.Body>
                        </Accordion.Item>
                    </>)

                })}
            </Accordion>
            {(()=>{
                if(historyReceive.length===0){
                    return(<>
                        <h3 style={{color:"red",fontFamily:'Prompt',fontWeight:'bold',marginTop:'40px'}}><AiFillCloseCircle style={{fontSize:'60px',marginRight:'10px'}}/>{"ยังไม่เคยได้รับทุน"}</h3>
                    </>)
                }
            })()}
        </div>     
 </>)
}
export default SThistory;
/*<div class="p-5">

        <div class="accordion accordion-flush" id="accordionFlushExample">
            <h1>{"ชื่อ "+ profile.myFirstName +"  นามสกุล "+profile.myLastName+"  รหัสนิสิต " + profile.studentID}</h1>
                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                        ทุนช้างเผือก ปี2560
                    </button>
                    </h2>
                    <div id="flush-collapseOne" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">ประวัตินิสิต</a>
                                <a href="#" class="list-group-item list-group-item-action">ประวัติทุน</a>
                                <a href="#" class="list-group-item list-group-item-action">คะแนนการสอบสัมภาษณ์</a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="accordion-item">
                    <h2 class="accordion-header" id="flush-headingOne">
                    <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne2" aria-expanded="false" aria-controls="flush-collapseOne">
                        ทุนช้างเผือก ปี2560
                    </button>
                    </h2>
                    <div id="flush-collapseOne2" class="accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                        <div class="accordion-body">
                            <div class="list-group">
                                <a href="#" class="list-group-item list-group-item-action">ประวัตินิสิต</a>
                                <a href="#" class="list-group-item list-group-item-action">ประวัติทุน</a>
                                <a href="#" class="list-group-item list-group-item-action">คะแนนการสอบสัมภาษณ์</a>
                            </div>
                        </div>
                    </div>
                </div>

                
        </div>
    </div>*/
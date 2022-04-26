import React, { useState,useEffect,useContext} from 'react'
import "./CheckCommittee.css";
import axios from "axios";
import { AuthContext} from '../Auth/Auth';
import { useNavigate,useParams } from 'react-router-dom'
import ViewLoading from '../View/ViewLoading';
const CheckCommittee = () => {
    const {role} = useContext(AuthContext);
    const {committeeUserId} = useParams();

    const [committeeHistory ,setCommitteeHistory ] = useState([])

    const [committeeData ,setCommitteeData ] = useState({
        gmail:"",
        role:"",
        myProfile:""
    })
    
    const [loading ,setLoading ] = useState(true)
    const navigate = useNavigate()
    
    const editRole =()=>{
        axios.put("http://localhost:3001/editRole",{
            gmail:committeeData.gmail,
            role:"user"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                alert(committeeData.gmail+" ถูกเปลี่ยนจาก กรรมการ => user");
                navigate(-1)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/editRole)")
        })
    }
    const deleteGmail =()=>{
        axios.put("http://localhost:3001/deleteGmail",{
            gmail:committeeData.gmail,
        })
        .then((response) => {
            if(response.data.status==="ok"){
                alert(committeeData.gmail+" ถูกลบออกจากระบบแล้ว");
                navigate(-1)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/deleteGmail)")
        })
    }

    const getHistoryCommittee =(gmail)=>{
        axios.post("http://localhost:3001/getHistoryCommittee",{
            gmail:gmail
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                setCommitteeHistory(response.data.contact)
                setLoading(false)
            }else{
                alert(response.data.message);
                navigate(-1)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getHistoryCommittee)")
            navigate(-1)
        }) 
    }

    useEffect(()=>{
        axios.post("http://localhost:3001/getCheckRole",{
            userId:committeeUserId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                if(response.data.contact.length!==0){
                    if(response.data.contact[0].role==="committee"){
                        setCommitteeData(response.data.contact[0])
                        getHistoryCommittee(response.data.contact[0].gmail)
                    }else{
                        alert("userId นี้ไม่ใช่กรรมการ")
                        navigate(-1)
                    }
                }
                else{
                    alert("ไม่พบ userId นี้")
                    navigate(-1)
                }
            }else{
                alert(response.data.message);
                navigate(-1)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getCheckRole)")
            navigate(-1)
        })
    },[])

    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <h1>{"Gmail :"+committeeData.gmail}</h1>
        {(()=>{
            if(committeeHistory.length>0){
                return(<>
                    <div class="container pt-5"  style={{fontFamily:'Prompt',fontWeight:'500'}}>          
                        <div id="CheckCommittee-table" class="table-responsive table-bordered">
                            <table id="CheckCommittee-table-bd"  class="table table-bordered ">
                                <thead id="CheckCommittee-table-1" bgcolor="#680C07" >
                                    <tr style={{textAlign:'center' }}>
                                    <th>#</th>
                                    <th>รายชื่อทุน</th>
                                    <th>วันที่นัดสัมภาษณ์</th>
                                    <th>ช่วงเวลาเริ่ม</th>
                                    <th>ช่วงเวลาจบ</th>
                                    </tr>
                                </thead>
                                {committeeHistory.map((data,index)=>{
                                    return(<>
                                        <tbody id="CheckCommittee-table-2">
                                            <tr style={{textAlign:'center' }}>
                                            <td>{index+1}</td>
                                            <td>{data.scholarshipName}</td>
                                            <td>{data.interviewDate}</td>
                                            <td>{data.startInterview}</td>
                                            <td>{data.endInterview}</td>
                                            </tr>
                                        </tbody>
                                        </>)
                                })}
                            </table>
                        </div>
                    </div>   
                </>)     
            }
            else{
                if(committeeData.myProfile!==null){
                    return(<>
                        <h3 style={{color:"red"}} >ไม่พบประวัติการเป็นกรรมการของ email นี้</h3>
                        <h3 >พบการกรอกข้อมูลของ email นี้</h3>
                    </>)
                }else{
                    return(<>
                        <h3 style={{color:"red"}} >ไม่พบประวัติการเป็นกรรมการของ email นี้</h3>
                        <h3 style={{color:"red"}} >ไม่พบการกรอกข้อมูลของ email นี้</h3>
                    </>)
                }
                
            }       
        })()}
        


    <div id="button">
        <button type="button" className="btn btn-secondary btn-lg"    style={{margin:"20px",color:"#ffffff",height:"50px",width:"120px"}} onClick={()=>navigate(-1)}>  ย้อนกลับ  </button>
        {(()=>{
            if(committeeHistory.length===0){
                if(committeeData.myProfile!==null){
                    return(<>
                        <button type="button" className="btn btn-warning btn-lg"   style={{margin:"20px",color:"#ffffff",height:"50px",width:"120px"}} onClick={()=>editRole()}>  เเก้ไขเป็น User  </button> 
                    </>)
                }
                return(<>
                    <button type="button" className="btn btn-warning btn-lg"   style={{margin:"20px",color:"#ffffff",height:"50px",width:"120px"}} onClick={()=>editRole()}>  เเก้ไขเป็น User  </button>
                    <button type="button" className="btn btn-danger btn-lg"   style={{margin:"20px",color:"#ffffff",height:"50px",width:"120px"}} onClick={()=>deleteGmail()}>  ลบ  </button>
                </>)
            }       
        })()}
     </div>                 
    </>)
}
export default CheckCommittee;

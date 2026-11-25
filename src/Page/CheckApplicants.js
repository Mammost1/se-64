import "./CheckApplicants.css";
import React,{useState,useEffect,useContext} from "react";
import {Link,useParams,useNavigate} from 'react-router-dom'
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext } from "../Auth/Auth";
const CheckApplicants = () => {
    const {role} = useContext(AuthContext)
    const {scholarshipId } = useParams();
    const [loading ,setLoading ] = useState(true)
    const [scholarshipData ,setScholarshipData] = useState(null)
    const [applicantsData ,setApplicantsData ] = useState([])
    const [remainingTime,setRemainingTime] = useState(0)

    const navigate = useNavigate()

    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        //binary = window.btoa( binary )
        return(binary)
    }
    const dhm=(t)=>{
        if(t<0){
            return "หมดเวลาแล้ว"
        }
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            //cm = 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.ceil( (t - d * cd - h * ch ) / 60000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }
        return d+" วัน "+ pad(h)+" ชั่วโมง "+ pad(m)+" นาที" ;
    }

    const getApplicantsData=()=>{
        axios.post("http://localhost:3001/checkScholarship",{
            scholarshipId:scholarshipId,
            dataMysql:"totalHistoryId,scholarshipId,userId,recruitStatus,myProfile"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                //console.log(response.data.contact);
                response.data.contact.map((data)=>{
                    data.myProfile=JSON.parse(data.myProfile)
                })
                console.log(response.data.contact);
                setApplicantsData(response.data.contact)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })

    }
    useEffect(()=>{
        axios.post("http://localhost:3001/scholarshipForId",{
            scholarshipId:scholarshipId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                response.data.contact[0].applicantDocuments = JSON.parse(response.data.contact[0].applicantDocuments)
                response.data.contact[0].urlBase64Img = bufferToBase64(response.data.contact[0].urlBase64Img.data)
                response.data.contact[0].urlBase64Details = bufferToBase64(response.data.contact[0].urlBase64Details.data)
                setScholarshipData(response.data.contact[0]);
                console.log(response.data.contact[0]);
                getApplicantsData();
                setRemainingTime(new Date(response.data.contact[0].closeDate)-new Date() )
                const interval = setInterval(() => {
                    let date = new Date()
                    setRemainingTime(new Date(response.data.contact[0].closeDate)-date )
                }, 1000);

                setLoading(false)
            }else{
                alert(response.data.message);
                navigate(-1)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })

    },[])
    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div style={{width:"90%",marginTop:"50px",fontFamily:'Prompt',marginLeft:'15px'}}>
            <h1 style={{color:"#680C07",fontWeight:'bold',marginTop:'120px'}}>{scholarshipData.scholarshipName}</h1>

            <h1  style={{fontSize: 20}} >{"หมดเวลารับสมัคร : "+ dhm(remainingTime)}</h1>

            <img src={scholarshipData.urlBase64Img} style={{display:'block',margin:'auto' ,marginTop:'1em',maxWidth:"1000px",width:'400px',height:'auto'}} />

            <div id="CheckAppname"class="list-group" style={{fontFamily:'Prompt' }}>
            {applicantsData.map((data,index)=>{
                return(<>
                <a class="list-group-item list-group-item-action" >
                    <label id="CheckApp" style={{fontFamily:'Prompt',fontWeight:'bold'}}>{data.myProfile.myFirstName+" "+data.myProfile.myLastName}</label>
                    
                    <Link to={"/SThistory/"+data.userId} ><button id="Check0" type="button" class="btn btn-primary">ดูประวัติรับทุน</button></Link>
                    {(()=>{
                        if(remainingTime<0){
                            return <Link to={"/SelectionApplicants/"+data.scholarshipId+"/"+data.userId}><button type="button" class="btn btn-primary">ตรวจข้อมูล</button></Link>
                        }
                        else{
                            return <button type="button" class="btn btn-primary" disabled>(จะใช้ได้เมื่อหมดเวลารับสมัคร)</button>
                        }
                    })()} 
                    
                    <label id="CheckApplable"style={{width: '200px',color:"black",fontWeight:'bold',fontFamily:'Prompt',backgroundColor:(data.recruitStatus==="ผ่าน"?"#4ECB71":data.recruitStatus === "ไม่ผ่าน"?"#EA4335":data.recruitStatus === "เอกสารไม่ถูกต้อง"?"#FBD820":"#c4c4c4"),padding:"5px",borderRadius:"20px"}}>
                        <h3 style={{fontFamily:'Prompt',fontWeight:'bold',fontSize:'18px',textAlign: 'center',marginTop:'5px'}}>{data.recruitStatus}</h3>
                       
                    </label>
                </a>
                </>)
            })}
            </div>
            <div >
                <a id="CheckAppb1">
                    <h4 style={{fontFamily:'Prompt',fontWeight:'bold',marginBottom:'20px'}}>{
                        " มีผู้สมัครทั้งหมด "+applicantsData.length.toString()+" คน "+
                        "มีผู้ผ่าน " +applicantsData.filter(data => data.recruitStatus === 'ผ่าน').length.toString()+" คน "+
                        "ไม่ผ่าน "+applicantsData.filter(data => data.recruitStatus === 'ไม่ผ่าน').length.toString()+" คน "+
                        "เอกสารไม่ถูกต้อง "+applicantsData.filter(data => data.recruitStatus === 'เอกสารไม่ถูกต้อง').length.toString()+" คน "+
                        "ยังไม่ได้ตรวจ "+applicantsData.filter(data => data.recruitStatus === 'รอ').length.toString()+" คน"}
                    </h4>
                    {(()=>{
                        if(!applicantsData.filter(data => data.recruitStatus === 'เอกสารไม่ถูกต้อง').length && !applicantsData.filter(data => data.recruitStatus === 'รอ').length){
                            return(<>
                                <Link to={"/RateAdmin/"+scholarshipData.scholarshipId}><button type="button"class="btn btn-primary" >นัดสัมภาษณ์</button> </Link>    
                            </>)
                        }else{
                            return(<>
                                <button style={{marginBottom:'20px'}} type="button"class="btn btn-primary" disabled>(ตรวจเอกสารให้ครบก่อน)</button> 
                            </>)  
                        }
                    })()}
                </a>   
            </div>
        </div>
    </>)
}
export default CheckApplicants;
import { useState ,useEffect,useContext} from "react";
import { BsFillCameraReelsFill } from "react-icons/bs";
import { IoDocuments } from 'react-icons/io5';
import axios from "axios";
import { useParams ,useNavigate} from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import "./Rate.css";
import ViewLoading from "../View/ViewLoading";

const Rate = () => {
    const {email,name,userId,role} = useContext(AuthContext);
    const {scholarshipId,applicantId} = useParams();
    const navigate = useNavigate()
    const [loading, setLoading] = useState(true);

    const [criterion, setCriterion] = useState([]);
    const [scholarshipName, setScholarshipName] = useState("");
    const [meetingLink, setMeetingLink] = useState("");
    

    const totalPrice = criterion.reduce(
        (sum,item) => sum + item.scoreEarned * 1, 0
      );
    
    const updateCriterion = (value,index) => {
        value = (parseInt(value)>parseInt(criterion[index].score))?criterion[index].score:value
        let newCriterion = [...criterion]; 
        newCriterion[index]["scoreEarned"] = value;    
        setCriterion(newCriterion);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            emailCommittee:email,
            giveScore:criterion
        });
        axios.post("http://localhost:3001/committeeSetScore",{
            scholarshipId:scholarshipId,
            userId:applicantId,
            emailCommittee:email,
            giveScore:JSON.stringify(criterion)
        })
        .then((response) => {
            if(response.data.status==="ok"){
                alert(response.data.message);
                navigate(-1)           
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/committeeSetScore)")
        })
        
    }

    const getApplicantScore=(criterionFormMysql)=>{
        axios.post("http://localhost:3001/checkApplyScholarship", { 
            scholarshipId :scholarshipId,
            userId:applicantId
            }).then((response) => {
                if(response.data.status==="ok"){
                    let tmp=JSON.parse(response.data.contact.toatalScore)
                    if(tmp!==null){
                        tmp=tmp.find(data => data.emailCommittee === email)
                        if(tmp!==undefined){
                            tmp.giveScore.map((data)=>{
                                //console.log(data.subject)
                                let index = criterionFormMysql.findIndex(value => value.subject === data.subject)
                                if(index!==-1){
                                    criterionFormMysql[index].scoreEarned=data.scoreEarned;
                                }
                            })
                            //console.log(criterionFormMysql);
                        }
                    }
                }
                else{
                    alert(response.data.message)
                }
                setCriterion(criterionFormMysql)
                setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/checkApplyScholarship)")
            }
        );
    }
    

    useEffect(()=>{
        axios.post("http://localhost:3001/scholarshipForId",{
            scholarshipId:scholarshipId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                //console.log(response.data.contact);
                response.data.contact[0].criterion = JSON.parse(response.data.contact[0].criterion)
                response.data.contact[0].committee = JSON.parse(response.data.contact[0].committee)
                if(response.data.contact[0].committee.findIndex(data => data.email.toLowerCase()===email.toLowerCase())===-1){
                    alert("คุณไม่ใช่กรรมการของทุนนี้");
                    navigate(-1)
                }
                response.data.contact[0].criterion.map((data)=>{
                  data.scoreEarned=""
                })
                //setCriterion(response.data.contact[0].criterion)
                setScholarshipName(response.data.contact[0].scholarshipName)
                setMeetingLink(response.data.contact[0].meetingLink)
                getApplicantScore(response.data.contact[0].criterion)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })

    },[])
    if(role==="user"){
        navigate(-1)
    }
    if(loading){
      return <ViewLoading/>
    }
      
    return(<>
        <div style={{marginTop:"120px",fontFamily:'Prompt',marginBottom:'40px'}} >
            <div className="containerRate">
            <section className="container-head">
                <h2 style={{fontWeight:'600'}}>รายละเอียดการสัมภาษณ์</h2>
                <h3 style={{fontWeight:'600',color:"#680C07"}}>{"ชื่อทุน : "+scholarshipName}</h3>
            </section>

            <section className="content-con"> 
                <div className="content-r"> 
                  <div className="RateDiv-r">
                    <h3 style={{fontWeight:'600'}}>ช่องทางการเข้าห้องสัมภาษณ์</h3>
                    <a1><BsFillCameraReelsFill /></a1>
                    <a href={meetingLink} target="_blank" className="content-btn">Go To Meeting</a>
                  </div>  
                  <div className="RateDiv-r1">
                      <h3 style={{fontWeight:'600',fontFamily:'Prompt'}}>ข้อมูลผู้สมัครขอรับทุน</h3>
                      <a1 className="content-icon"><IoDocuments/></a1>    
                      <a href={"/ApplicantInformation/"+scholarshipId+"/"+applicantId} target="_blank" className="content-btn">ข้อมูลผู้สมัคร</a> 
                  </div>
                </div>
            </section>
            
            <section  className='dividing line'>
                <div >
                    <button className='dividing-line-1' ></button>
                    
                </div>
            </section>
      
            <section className="container-body">
                <div  className="content-b">
                    <h2 style={{fontWeight:'600'}}>
                        ส่วนการให้คะแนน
                    </h2>
                </div>
               

                <form onSubmit={handleSubmit} className="was-validated" style={{width:"80%"}}> 
                  {criterion.map((data,index)  => {
                      return(<>
                      <div className="input-group mt-3">
                          <span className="input-group-text" style={{width:"40%"}}>{data.subject}</span>
                          <input type="number" className="form-control" placeholder="คะแนนที่ได้" min={0} max={data.score} value={data.scoreEarned} onChange={(e)=>updateCriterion(e.target.value,index)} required/>
                          <span className="input-group-text">คะแนน</span>
                          <span className="input-group-text">(เต็ม {data.score} คะแนน)</span>
                      </div>
                      </>)  
                  })}  
                 
               <br></br>
               <br></br>
               <br></br>
               <br></br>
               <h2 style={{fontWeight:'600'}}>รวมเป็น {totalPrice} คะแนน</h2>
               <button className="container-body-btn-1">บันทึกคะแนน</button> 
               </form>   
               <button onClick={()=>navigate(-1)} className="container-body-btn" style={{marginBottom:'40px'}}>ย้อนกลับ</button>      
            </section>
            </div>   
        </div>

          


   </> )
}
export default Rate;

/*<div className="content-w-1">
                      <div class="RateDiv">
                            <p>{data.subject}</p>
                      </div>
                      <div class="RateDiv2">
                            <p>(เต็ม {data.score} คะแนน)</p>
                      </div>
                      <div class="RateDiv1">
                          <input style={{ width: "300px" }} type="number" placeholder={data.score}/>
                          <p>คะแนน</p>     
                      </div>           
                    </div> */
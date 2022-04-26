import { useState ,useEffect,useContext} from "react";
import { useParams ,useNavigate} from "react-router-dom";
import {GrAdd} from "react-icons/gr";
import "./RateAdmin.css"
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext} from '../Auth/Auth';
const RateAdmin = () => {
    const {role} = useContext(AuthContext);
    const {scholarshipId}=useParams();
    const navigate = useNavigate();

    const [interviewDate,setinterviewDate] = useState("");
    const [startInterview,setstartInterview] = useState("");
    const [endInterview,setendInterview] = useState("");
    const [meetingLink,setmeetingLink] = useState("");
    const [interviewDetails ,setInterviewDetails] = useState([]) ;
    const [newCommittee,setNewCommittee] = useState("");
    const [checkAddCommittee,setCheckAddCommittee] = useState(true);

    const [loading, setLoading] = useState(true);
    const [loadingAllCommittee, setLoadingAllCommittee] = useState(true);
    

    const [criterion,setCriterion] = useState([{
        subject:"",
        score:""
    }])
    const [committee,setCommittee] = useState([])

    const [allCommittee ,setAllCommittee ] = useState([])

    //___________Criterion_____________//
    const updateCriterion = (e,index) => {
        let newCriterion = [...criterion]; 
        newCriterion[index][e.target.name] = e.target.value;    
        setCriterion(newCriterion);
    }
    const addCriterion = () => {
        let newCriterion = [...criterion]; 
        newCriterion.push({
            subject:"",
            score:""
        });    
        setCriterion(newCriterion);
    }
    const delCriterion =(index)=> {
        let newCriterion = [...criterion]; 
        newCriterion.splice(index, 1);    
        setCriterion(newCriterion);
    }
    ////////////////////////////////////

    //__________Committee____________//
    const updateCommittee = (e,index) => {
        let newCommittee = [...committee]; 
        newCommittee[index]["email"] = e.target.value;  
        setCommittee(newCommittee);
    }

    const addCommittee = () => {
        if(committee.find(data => data.email === newCommittee) !== undefined){
            alert("email นี้เป็นกรรมการอยู่แล้ว")
        }
        else{
            axios.post("http://localhost:3001/dataUser",{
                gmail:newCommittee
            })
            .then((response) => {
                if(response.data.status==="ok"){
                    //alert(response.data.role);
                    if(response.data.role==="committee"){
                        let tmp = [...committee]
                        tmp.push({email:newCommittee})
                        setCommittee(tmp);
                        setNewCommittee("");
                        setCheckAddCommittee(false)
                    }else{
                        alert("email นี้ไม่ใช่กรรมการ");
                    }
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
            })
        }
        
    }

    const delCommittee =(index)=> {
        let newCommittee = [...committee]; 
        newCommittee.splice(index, 1);    
        setCommittee(newCommittee);
        if( newCommittee.length===0){
            setCheckAddCommittee(true)
        }
    }
    ////////////////////////////////////////////

    const changeEndInterview =(value)=> {
        if( value > startInterview){
            setendInterview(value)
        }
    }

    const changeStartInterview =(value)=> {
        setstartInterview(value)
        if( value > endInterview){
            setendInterview(value)
        }
    }
    
    
      const addTotalScore = (e) => {
        e.preventDefault();
        axios.put("http://localhost:3001/Updatecommittee", {
            scholarshipId:scholarshipId,
            interviewDate:interviewDate,
            startInterview:startInterview,
            endInterview:endInterview,
            criterion:JSON.stringify(criterion),
            committee:JSON.stringify(committee),
            meetingLink:meetingLink,
            interviewDetails:interviewDetails
            }).then((res)=>{
                alert(res.data.message)
                navigate(-1)
            },(err)=>{
                alert("ไม่สามารถ put(http://localhost:3001/Updatecommittee)")
            })
        };
         

        useEffect(()=>{
            axios.post("http://localhost:3001/scholarshipForId",{
                scholarshipId:scholarshipId
            })
            .then((response) => {
                if(response.data.status==="ok"){

                    if(response.data.contact[0].criterion!==null){
                        setCriterion(JSON.parse(response.data.contact[0].criterion))
                    }
                    if(response.data.contact[0].committee!==null){
                        setCommittee(JSON.parse(response.data.contact[0].committee))
                        setCheckAddCommittee(false)
                    }
                    setinterviewDate(response.data.contact[0].interviewDate)
                    setInterviewDetails(response.data.contact[0].interviewDetails)
                    setstartInterview(response.data.contact[0].startInterview)
                    setendInterview(response.data.contact[0].endInterview)
                    setmeetingLink(response.data.contact[0].meetingLink)
                    setLoading(false)
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
            })

            axios.get("http://localhost:3001/getAllCommittee")
            .then((response) => {
                if(response.data.status==="ok"){
                    setAllCommittee(response.data.contact);
                    //console.log(response.data.contact);
                }else{
                    alert(response.data.message);
                }
                setLoadingAllCommittee(false)
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/getAllCommittee)")
            })

            /*const interval = setInterval(() => {
                console.log('This will run every second!');
                clearInterval(interval);
              }, 1000);*/
    
        },[])
    if(role!=="admin") {
        navigate(-1)
    }
    if(loading || loadingAllCommittee){
        return <ViewLoading/>
    }     
    return(<>
        <div className="container" style={{margin:'25px',marginTop:'120px'}}>
            <div className="container-box"  >
            <section>
                <h2 style={{fontWeight:'800',marginTop:'30px',marginBottom:'30px'}}>สร้างวันนัดสัมภาษณ์ ทุน "มูลนิธิ ทางสู่ฝัน ปั้นคนเก่ง"</h2>    
            </section>  
            <form className="was-validated" onSubmit={addTotalScore}>
                <section className="container-box">   
                    <div class="row">
                        <div class="col">
                        <label class="form-label">วันที่นัดสัมภาษณ์</label>
                        <input class="form-control" type="date" value={interviewDate} onChange={(event) => {
                                setinterviewDate(event.target.value)
                            }} required/>
                        </div>
                        <div class="col">
                        <label class="form-label">ตั้งแต่ {startInterview}</label>
                        <input class="form-control" type="time" value={startInterview} onChange={(event) => {
                                changeStartInterview(event.target.value)
                            }} required/>
                        </div>
                        <div class="col">
                        <label class="form-label">ถึง {endInterview}</label>
                        <input class="form-control" type="time" value={endInterview} onChange={(event) => {
                                changeEndInterview(event.target.value)
                            }} required/>
                        </div>
                    </div> 
                    <br/>
                    <div>
                        <div class="row">
                            <div class="col">
                                <label class="form-label">เกณ์การให้คะแนน</label>
                            </div>
                            <div class="col">
                                <label class="form-label">คะแนนเต็ม</label>
                            </div>
                            <div class="col">
                            </div>
                        </div>
                    {criterion.map((data,index)=>{
                            return(<>
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" placeholder="เกณ์การให้คะแนน" name="subject" value={data.subject} onChange={(event) => updateCriterion(event,index)} required/>
                                </div>
                                <div class="col">
                                    <input type="number" min="0" class="form-control" placeholder="คะแนนเต็ม" name="score" value={data.score} onChange={(event) => updateCriterion(event,index)} required/>
                                </div>
                                {(()=>{
                                    if(criterion.length > 1){
                                        return(<>
                                            <div class="col">
                                                <button type="button" class="btn btn-danger" style={{width:'80px',height:'12px'}}onClick={()=>delCriterion(index)}>ลบ</button>
                                            </div>
                                        </>) 
                                    }
                                    else{
                                        return(<>
                                            <div class="col">
                                            </div>
                                        </>) 
                                    }
                                })()}
                            </div>
                            <br/>
                            </>)
                        })}
                        <button type="button" class="btn btn-primary   "onClick={()=>addCriterion()}><GrAdd style={{fontWeight: 800,BackgounColor:'white'}} /></button>
                    </div> 
                    <br/>


                    <div>
                        <div class="row">
                            <div class="col">
                                <label class="form-label">เพิ่มกรรมการ</label>
                            </div>
                        </div>
                        {committee.map((data,index)=>{
                            return(<>
                            <div class="row">
                                <div class="col">
                                    <input type="text" class="form-control" value={data.email} disabled/>
                                </div>
                                <div class="col">
                                    <button type="button" class="btn btn-danger" onClick={()=>delCommittee(index)}>ลบ</button>
                                </div>
                            </div>
                            <br/>
                            </>)
                        })}
                        {(()=>{
                            if(checkAddCommittee){
                                return(<>
                                <div class="row">
                                    <div class="col">
                                        <input type="email" list="allCommittee" class="form-control" value={newCommittee} onChange={(e)=>setNewCommittee(e.target.value)} required/>
                                        <datalist id="allCommittee">
                                            {allCommittee.map((data)=>{
                                                return(<>
                                                    <option value={data.gmail}/>
                                                </>)
                                            })}
                                        </datalist>
                                    </div>

                                    <div class="col">
                                        <button type="button" class="btn btn-primary" onClick={()=>addCommittee()}>ยืนยัน</button>
                                        {(()=>{
                                            if(committee.length!==0)
                                                return <button type="button" class="btn btn-primary" onClick={()=>setCheckAddCommittee(false)}>ยกเลิก</button>
                                        })()}
                                    </div>
                                </div>
                                </>)  
                            }
                            else{
                                return(<>
                                    <button type="button" class="btn btn-primary" onClick={()=>setCheckAddCommittee(true)}><GrAdd/></button>
                                </>)
                            }
                        })()}
                    </div> 
                    <br/>


                    <div>
                        <label>ห้องสัมภาษณ์</label>
                        <input type="url" class="form-control" placeholder="ลิ้งห้องสัมภาษณ์" name="url" value={meetingLink} onChange={(event) => {setmeetingLink(event.target.value)}} required/>
                        <a href={meetingLink} target="_blank"><button type="button" class="btn btn-info" style={{color:'white',margin: 20, textAlign : 'center'}}> To Meeting </button></a>
                    </div> 
                    
                    <label for="comment">รายละเอียด</label>
                    <textarea class="form-control" rows="5" id="comment" name="text" value={interviewDetails} onChange={(event) => {setInterviewDetails(event.target.value)}} required></textarea>
                    <br/>

                    <button type="submit" class="btn btn-primary">สร้างวันนัดสัมภาษณ์</button>
                
                </section>
            </form>
            </div>   
        </div>
    </>)
}
export default RateAdmin;
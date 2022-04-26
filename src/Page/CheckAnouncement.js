import { useParams,Link,useNavigate } from "react-router-dom";
import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext } from "../Auth/Auth";
import "./CheckAnouncement.css";
const CheckAnouncement = () => {
    const {email,role} = useContext(AuthContext)
    const {status,scholarshipId}= useParams()
    const [loading,setLoading]=useState(true)
    const [scholarshipData,setScholarshipData]=useState(null)
    const [passListData,setPassListData]=useState({data:[]})
    const navigate = useNavigate()

    const choose = passListData.data.reduce(
        (sum,item) => sum + (item.choose?1:0), 0
      );
    
 
    const changePassListData =(name,index) =>{
        let newPassListData = passListData.data;
        if(choose<scholarshipData.amount || newPassListData[index].choose){
            newPassListData[index].choose=!newPassListData[index].choose;
            //console.log(passListData);
            setPassListData(passListData => ({
                ...passListData,
                ["data"]: newPassListData
            }));
        }else{
            alert("เลือกครบแล้ว")
        }
        //changeData("choose",newPassListData)
        //setPassListData(newPassListData)
    }
    const updateScholarship= ()=>{
        axios.put("http://localhost:3001/updateStatusScholarship",{
            scholarshipId:scholarshipData.scholarshipId,
            status:"anouncement"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data);
                alert(response.data.message);
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/test3)")
        })
    }

    const updateUserFailed = (notChooseUser)=>{
        if(notChooseUser.length>0){
            axios.post("http://localhost:3001/test3",{
                scholarshipId:scholarshipData.scholarshipId,
                interviewStatus:"ไม่ผ่าน",
                anouncementStatus:"ไม่ผ่าน",
                chooseUserId:JSON.stringify(notChooseUser)
            })
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data);
                    updateScholarship();
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/test3)")
            })
        }
        else{
            updateScholarship();
        }
    }

    const submit =() =>{
        console.log(scholarshipData);
        console.log(passListData);
        let chooseUser = passListData.data.filter((data)=>data.choose)
        let notChooseUser = passListData.data.filter((data)=>!data.choose)
        chooseUser=Object.keys(chooseUser).map((key)=>chooseUser[key].userId)
        notChooseUser = Object.keys(notChooseUser).map((key)=>notChooseUser[key].userId)
        console.log(chooseUser)
        console.log(notChooseUser)
        console.log(scholarshipData.scholarshipId);
        if(chooseUser.length>0){
            axios.post("http://localhost:3001/test3",{
                scholarshipId:scholarshipData.scholarshipId,
                interviewStatus:"ผ่าน",
                anouncementStatus:"ผ่าน",
                chooseUserId:JSON.stringify(chooseUser)
            })
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data);
                    updateUserFailed(notChooseUser)
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/test3)")
            })
        }else{
            alert("ต้องมีผู้ได้รับทุนอย่างน้อย 1 คน")
        }
    }

    const getApplicantsData=(criterion)=>{
        axios.post("http://localhost:3001/getPassList",{
            scholarshipId:scholarshipId,
            status:"interview",
            dataMysql:"totalHistoryId,userId,toatalScore,myProfile,anouncementStatus"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let subjectCriterion = []
                criterion.map((data)=>{
                    subjectCriterion.push(data.subject)
                })
                //console.log(subjectCriterion);
                //console.log(response.data.contact);
                response.data.contact.map((data)=>{
                    data.myProfile=JSON.parse(data.myProfile)
                    data.toatalScore=JSON.parse(data.toatalScore)
                    data.toatalGiveScore=0
                    if( data.toatalScore !== null){
                        if(data.toatalScore!==[]){
                            //data.toatalScore.filter( data => criterion.includes(data.giveScore))
                            data.toatalScore.map((dataSubjuct)=>{
                                dataSubjuct.giveScore=dataSubjuct.giveScore.filter( data => subjectCriterion.includes(data.subject))
                                dataSubjuct.giveScore.map((dataScore)=>{
                                    data.toatalGiveScore+=parseInt(dataScore.scoreEarned);
                                })
                            })
                            //console.log(criterion);
                            //console.log(data.toatalScore);
                            /*criterion.map((dataCriterion)=>{
                                //console.log(data.toatalScore[0].giveScore);
                                let index = data.toatalScore[0].giveScore.findIndex(data => data.subject===dataCriterion.subject)
                                //console.log(index);
                                if(index!==-1){
                                    data.toatalGiveScore+=parseInt(data.toatalScore[0].giveScore[index].scoreEarned)
                                }
                            })*/
                        }
                    }
                    data.choose=(data.anouncementStatus==="ผ่าน"?true:false);
                    //data.choose=true
                })

                response.data.contact=response.data.contact.sort((a,b)=>{
                    if (a.toatalGiveScore > b.toatalGiveScore) return -1;
                    if (a.toatalGiveScore < b.toatalGiveScore) return 1;
                    return 0;
                })
                console.log(response.data.contact);
                setPassListData({data:response.data.contact})
                setLoading(false)
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
                setScholarshipData(response.data.contact[0]);
                response.data.contact[0].criterion=JSON.parse(response.data.contact[0].criterion)
                //console.log(response.data.contact[0].criterion);
                getApplicantsData(response.data.contact[0].criterion);
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })

    },[])
    if(role !== "admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div style={{marginLeft:'10px',marginTop:'120px'}} >
            <h1 className="listname1" style={{color: "#680C07",marginTop:'20px',fontWeight:'600'}}>รายชื่อลำดับคะแนน</h1>
            <h2 style={{color: "#680C07",marginTop:'10px',fontSize:'30px',fontFamily:'Prompt',fontWeight:'600'}}>{"จำนวนทุนที่มี : "+scholarshipData.amount +" ทุน"}</h2>
            <h1 style={{color: "#680C07",marginTop:'10px',fontSize:'20px',fontFamily:'Prompt',fontWeight:'500'}}>{"คัดเลือกผู้ได้รับทุนแล้ว : "+choose+" ทุน"}</h1>
            <div  id="CheckAnouncement-list-0">
                <h1 className="listname" style={{color: "#680C07",marginTop:'20px',fontSize:'30px',fontWeight:'600',paddingTop:'8px'}}>{"'"+scholarshipData.scholarshipName+"'"}</h1>        
            </div>
            <div>
                {passListData.data.map((data,index)=>{
                        return(<>
                        <div   id="CheckAnouncement-list" class="list-group-item list-group-item-action">
                            <label id="CheckAnouncement-list-1">ลำดับที {index+1}</label>
                            <label id="CheckAnouncement-list-2" >{data.myProfile.myFirstName+" "+data.myProfile.myLastName}</label>
                            <label id="CheckAnouncement-list-3">{" รหัสนิสิต :"+data.myProfile.studentID}</label>
                            <label id="CheckAnouncement-list-4">{" สาขา"+data.myProfile.major+"ชั้นปี "+data.myProfile.class}</label>
                            <label id="CheckAnouncement-list-5" >{"คะแนนที่ให้ : "+data.toatalGiveScore+" "}</label> 
                            
                            
                            <a  id="CheckAnouncement-list-7"  href={"/SThistory/"+data.userId} target="_blank" ><button  class="btn btn-success btn-sm" style={{borderRadius:'100px'}}>ดูประวัติรับทุน</button></a> 
                            <a  href={"/CheckInterviewScore/"+scholarshipId+"/"+data.userId} target="_blank" ><button style={{borderRadius:'100px',marginLeft:'10px'}} type="button"class="btn btn-danger" >ดูคะแนน</button></a>
                            <input id="CheckAnouncement-list-6" style={{marginTop:'1rem'}} type="checkbox" class="form-check-input" checked={data.choose?"checked":""} onChange={(e)=>changePassListData("choose",index)} />
                        </div>
                        </>)

                })}
            </div>
            <br/>
            <div id="CheckAnouncement-button">
                <button style={{borderRadius:'100px'}} id="CheckAnouncement-button-1" type="button"class="btn btn-success" onClick={()=>submit()} >ยืนยันผู้ได้รับทุน</button>                     
                {/*<button style={{borderRadius:'100px',marginLeft:'-60px'}} type="button"class="btn btn-danger" >แก้ไข</button> */}
            </div>
            
        </div>
    </>)
}
export default CheckAnouncement;


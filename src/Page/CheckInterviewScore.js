import React,{useState,useEffect,useContext} from "react";
import { useParams,useNavigate } from "react-router-dom";
import ViewLoading from "../View/ViewLoading";
import axios from "axios";
import "./CheckInterviewScore.css";
import { AuthContext } from "../Auth/Auth";
const CheckInterviewScore = () => {
    const {role} = useContext(AuthContext);
    const {scholarshipId, userId } = useParams();
    const [loading ,setLoading ] = useState(true)

    const [interviewData,setInterviewData]= useState([])

    const navigate = useNavigate()

    useEffect(()=>{
        console.log(scholarshipId);
        axios.post("http://localhost:3001/getHistoryScore",{
            scholarshipId:scholarshipId,
            userId:userId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let tmpData =response.data.contact[0]
                tmpData.committee = JSON.parse(tmpData.committee)
                tmpData.criterion = JSON.parse(tmpData.criterion)
                tmpData.myProfile = JSON.parse(tmpData.myProfile)
                tmpData.toatalScore = JSON.parse(tmpData.toatalScore)
                if(tmpData.toatalScore==null){
                    tmpData.toatalScore=[]
                }
                console.log(tmpData);
                setInterviewData(tmpData)
                setLoading(false);
            }else{
                alert(response.data.message);
                setLoading(false);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getHistoryScore)")
        })
    },[])
    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
    <div style={{fontFamily:'Prompt'}}>
    <h3 id ="CheckScore" style={{fontFamily:'Prompt',marginTop:'7%',fontWeight:'700',fontSize:'40px',color:'#680C07'}}>{"ทุน: "+interviewData.scholarshipName}</h3>
       <h2 class="list-group-item list-group-item-action" id ="CheckScore1"  style={{fontFamily:'Prompt',fontWeight:'700',color:'#680C07',marginBottom:'20px'}}>{"ชื่อ "+interviewData.myProfile.myFirstName+" "+interviewData.myProfile.myLastName+" "+interviewData.myProfile.studentID}</h2>
       
       <div id="b1"class="list-group">
       {interviewData.toatalScore.map((data)=>{
           return(<>
                <h4 class="list-group-item list-group-item-action"style={{fontWeight:'700',backgroundColor: '#680C07',color:'white'}} >{"กรรมการ: "+data.emailCommittee}</h4>
                {data.giveScore.map((data)=>{
                    return(<>
                       <h6 style={{borderBottomLeftRadius: '30px',borderBottomRightRadius:"30px",height:'45px'}} class="list-group-item list-group-item-action">{"เรื่อง "+data.subject+" ให้ "+data.scoreEarned+" คะแนน จากคะแนนเต็ม "+ data.score+" คะแนน"}</h6>
                    </>)
                })}
                <br/>
           </>)
       })}
        </div>
                     
        
    </div>
       
           
                                
                          
    </>)
}
export default CheckInterviewScore;
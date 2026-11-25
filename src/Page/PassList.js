import { useParams,Link,useNavigate } from "react-router-dom";
import React,{useState,useEffect,useContext} from "react";
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext } from "../Auth/Auth";
import "./PassList.css";
const PassList = () => {
    const {email} = useContext(AuthContext)
    const {scholarshipId}= useParams()
    const [loading,setLoading]=useState(true)
    const [scholarshipData,setScholarshipData]=useState(null)
    const [passListData,setPassListData]=useState(null)

    const [searchName,setSearchName]=useState(null)
    const [searchStudentID,setSearchStudentID]=useState(null)
    const [searchMajor,setSearchMajor]=useState(null)
    const [searchClass,setSearchClass]=useState(null)

    const [checkCommittee,setCheckCommittee]=useState(false)

    const navigate = useNavigate()

    const getApplicantsData=(status,criterion,check)=>{
        axios.post("http://localhost:3001/getPassList",{
            scholarshipId:scholarshipId,
            status:status,
            dataMysql:"totalHistoryId,userId,toatalScore,myProfile"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                //console.log(response.data.contact);
                response.data.contact.map((data)=>{
                    data.myProfile=JSON.parse(data.myProfile)
                    data.toatalScore=JSON.parse(data.toatalScore)
                    data.toatalGiveScore=0
                    if(check){
                        if( data.toatalScore !== null){
                            data.toatalScore = data.toatalScore.filter(data => data.emailCommittee===email)
                            if(data.toatalScore.length!==0){
                                criterion.map((dataCriterion)=>{
                                    //console.log(data.toatalScore[0].giveScore);
                                    let index = data.toatalScore[0].giveScore.findIndex(data => data.subject===dataCriterion.subject)
                                    //console.log(index);
                                    if(index!==-1){
                                        data.toatalGiveScore+=parseInt(data.toatalScore[0].giveScore[index].scoreEarned)
                                    }
                                })
                            }
                        }  
                    }
                    
                })
                console.log(response.data.contact);
                setPassListData(response.data.contact)
                setLoading(false)
            }else{
                alert(response.data.message);
                navigate(-1)
                
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
                response.data.contact[0].committee=JSON.parse(response.data.contact[0].committee)
                let tmpCheckCommittee = response.data.contact[0].committee.findIndex(data=>data.email.toLowerCase()===email) !== -1
                setCheckCommittee(tmpCheckCommittee)
                getApplicantsData(response.data.contact[0].status,response.data.contact[0].criterion,tmpCheckCommittee);
            }else{
                alert(response.data.message);
                navigate(-1)
                //setLoading(false)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })

    },[])
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div style={{fontFamily:'Prompt',marginLeft:'20px',marginTop: '120px'}}>
            <h1 className="listname">{"ทุน '"+scholarshipData.scholarshipName+"'"}</h1>
            <h2 className="listname1" style={{color: "#680C07",marginBottom:'10px'}}>{scholarshipData.status==="interview"?"รายชื่อลำดับผู้มีสิทธิ์สัมภาษณ์":"รายชื่อลำดับผู้ได้รับทุน"}</h2>
            <form>
                <div class="row">
                    <div class="col">
                        <label class="form-label" >ชื่อ</label>
                        <input type="text" class="form-control" placeholder="ชื่อ" value={searchName} onChange={(e)=>setSearchName(e.target.value)}/>
                    </div>
                    <div class="col">
                        <label class="form-label">รหัสนิสิต</label>
                        <input type="text" class="form-control" placeholder="รหัสนิสิต" value={searchStudentID} onChange={(e)=>setSearchStudentID(e.target.value)} />
                    </div>
                    <div class="col">
                        <label  class="form-label">สาขา</label>
                        <select class="form-control" placeholder="สาขา" value={searchMajor} onChange={(e)=>setSearchMajor(e.target.value)}>
                            <option value="">None</option>
                            <option value="เครื่องกลและระบบการผลิต">เครื่องกลและระบบการผลิต</option>
                            <option value="คอมพิวเตอร์และสารสนเทศศาสตร์">คอมพิวเตอร์และสารสนเทศศาสตร์</option>
                            <option value="เครื่องกลและการออกแบบ">เครื่องกลและการออกแบบ</option>
                            <option value="โยธา">โยธา</option>
                            <option value="ไฟฟ้าและอิเล็กทรอนิกส์">ไฟฟ้าและอิเล็กทรอนิกส์</option>
                            <option value="อุตสาหการและระบบ">อุตสาหการและระบบ</option>
                            <option value="หุ่นยนต์และระบบ">หุ่นยนต์และระบบ</option>
                        </select>
                    </div>
                    <div class="col">
                                <label  class="form-label" >ชั้นปี</label >
                        <select class="form-control" placeholder="ชั้นปี" value={searchClass} onChange={(e)=>setSearchClass(e.target.value)} style={{width: '200px'}}>
                            <option value="">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                </div>
            </form>
            <br/>

            <div class="list-group" style={{marginTop:'5px'}}>
                {passListData.map((data,index)=>{
                    let checkSearchName = !searchName || (data.myProfile.myFirstName+" "+data.myProfile.myLastName).search(searchName)!==-1;
                    let checkSearchStudentID = !searchStudentID || data.myProfile.studentID.search(searchStudentID)!==-1;
                    let checkSearchMajor = !searchMajor || data.myProfile.major===searchMajor;
                    let checkSearchClass = !searchClass|| data.myProfile.class===searchClass;
                    if(checkSearchName && checkSearchStudentID && checkSearchMajor && checkSearchClass){
                        return(<>
                        <div  id="list-group-item" class="list-group-item list-group-item-action" style={{marginTop:'5px',borderRadius :'50px'}}>
                            <label id="list-group-item-1"  style={{marginLeft:'15px'}}>ลำดับที่ {index+1}</label>
                            <label id="list-group-item-1" >{data.myProfile.myFirstName+" "+data.myProfile.myLastName}</label>
                            <label id="list-group-item-7">{" รหัสนิสิต :"+data.myProfile.studentID}</label>
                            <label id="list-group-item-6">{" สาขา"+data.myProfile.major+"ชั้นปี "+data.myProfile.class}</label>

                            {(()=>{
                                if(scholarshipData.status==="interview" && checkCommittee){
                                    return(<>
                                        <lebel>{"คะแนนที่ให้ :"+data.toatalGiveScore}</lebel>
                                        <Link  id="list-group-item-7" to={"/Rate/"+scholarshipId+"/"+data.userId}><button id="buttonnextfrom"className="btn green hover full-rounded hover ">ฟอร์มให้คะแนน</button></Link>
                                    </>)
                                }
                            })()}

                        </div>
                        </>)
                    }

                })}
            </div>
            <br/>
        </div>
    </>)
}
export default PassList;

/*<ul class="pagination d-flex justify-content-center">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>*/
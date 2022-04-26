import '../App.css';
import React,{useState,useEffect,useContext} from 'react';
import { useNavigate} from "react-router-dom";
import { AuthContext } from '../Auth/Auth';
import axios from 'axios';
import ViewLoading from '../View/ViewLoading';
import ViewOffcanvas from '../View/ViewOffcanvas';
const UserStatus = () => {
    const {checkLogout,email,name,picture,userId,role} = useContext(AuthContext);
    const [dataStatusUser ,setDataStatusUser ] = useState([])
    
    const [loading ,setLoading ] = useState(true)
    const [loadingAcademicYear ,setLoadingAcademicYear] = useState(true)

    const [searchTerm,setSearchTerm]=useState("")
    const [searchAcademicYear,setSearchAcademicYear]=useState("")
    const [allAcademicYear,setAllAcademicYear] = useState([])

    const navigate = useNavigate();

    useEffect(()=>{
        axios.post("http://localhost:3001/userStatus",{
            userId:userId
        })
            .then((response) =>{
                if(response.data.status=== "ok"){
                    setDataStatusUser(response.data.contact)
                    console.log(response.data.contact);
                    setLoading(false)
                }else{
                    alert(response.data.message)  
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/userStatus)")
        });

        axios.get("http://localhost:3001/getAllAcademicYear")
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data);
                    response.data.contact.map((data,index)=>{
                        response.data.contact[index] = {value: data.academicYear, label: data.academicYear}
                    })
                    setAllAcademicYear(response.data.contact)
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
            alert("ไม่สามารถ get(http://localhost:3001/getAllAcademicYear)")
        })


    },[])

   
    if(role!=="user"){
        navigate(-1)
    }
    if(loading){
        return<ViewLoading/>
    }
    return(<>
        <div class="container pt-3" style={{fontFamily:'Prompt'}}>
            <div class=" pt-1">
                <div class="pt-1">
                    <div class="d-flex mb-3">
                                                
                        <h3 class="" style={{marginLeft:'10px'}}>ปีการศึกษา</h3>
                        <div class="input" style={{marginLeft:'10px'}}>
                            <select class="form-control" placeholder="ภาคเรียน" value={searchAcademicYear} onChange={(e)=>setSearchAcademicYear(e.target.value)}>
                                <option value="">ทั้งหมด</option>
                                {allAcademicYear.map((data)=>{
                                    return <option value={data.value}>{data.value}</option>
                                })}
                            </select>
                        </div>

                        <h3 class="">ภาคเรียน</h3>
                        <div class="col" style={{marginLeft:'10px'}} >
                            <select class="form-control" placeholder="ภาคเรียน" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}>
                                <option value="">ทั้งหมด</option>
                                <option value="ภาคต้น">ต้น</option>
                                <option value="ภาคปลาย">ปลาย</option>
                            </select>
                        </div>
                        
                        <div class="d-flex justify-content-end" style={{marginLeft:'auto'}}>
                            <span class='statuscapital' style={{backgroundColor:'#C4C4C4'}}></span>
                            <h5 class='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>รอ</h5>
                            <span class='statuscapital' style={{backgroundColor:'#4ECB71'}}></span>
                            <h5 class='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>ผ่าน</h5>
                            <span class='statuscapital' style={{backgroundColor:'#FBD820'}}></span>
                            <h5 class='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>เอกสารผิด</h5>
                            <span class='statuscapital' style={{backgroundColor:'#EA4335'}}></span>
                            <h5 class='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>ไม่ผ่าน</h5> 
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table class="pt-5 table table-bordered">
                        <thead>
                            <tr style={{textAlign:'center'}}>
                            <th>#</th>
                            <th >รายชื่อทุน</th>
                            <th>ตรวจสอบเอกสาร</th>
                            <th>ข้อคิดเห็น</th>
                            <th>วันที่นัดสัมภาษณ์</th>
                            <th>รอสัมภาษณ์</th>
                            <th>รายละเอียดการสัมภาษณ์</th>
                            <th>สถานะ</th>
                            <th>อัพเดท</th>       
                            </tr>
                        </thead>
                        {dataStatusUser.map((data,index)=>{
                            let checkAcademicYear = (searchAcademicYear === "" || data.academicYear.toString() === searchAcademicYear)
                            let checkTerm = (searchTerm === "" || data.term === searchTerm)
                            if(checkAcademicYear&&checkTerm){
                               return(<>
                                <tbody>
                                    <tr style={{textAlign:'center'}}>
                                    <td>{index+1}</td>
                                    <td>{data.scholarshipName}</td>
                                    <td><span class='statuscapital' style={{
                                        backgroundColor:(data.recruitStatus==="ผ่าน"?"#4ECB71":data.recruitStatus==="ไม่ผ่าน"?"#EA4335":data.recruitStatus==="เอกสารไม่ถูกต้อง"?"#FBD820":"#C4C4C4")
                                    ,width:'20px',height:'20px',marginTop:'10px',display:'inline-block'}}></span></td>

                                    <td>
                                        {(()=>{
                                            if(data.adminComment){
                                                return(<>
                                                    {<ViewOffcanvas 
                                                        key={index}
                                                        buttonName="แอดมินคอมเมนต์"
                                                        placement="top"
                                                        name={data.scholarshipName+index.toString()}
                                                        title={(<>
                                                                <h2 class="offcanvas-title" style={{fontFamily:'Prompt',fontWeight:'600',color:'#680C07'}}>แอดมินคอมเมนต์</h2>
                                                            </>)}
                                                        body={(<>
                                                            <div style={{textAlign:'left',marginLeft:'1%'}}>                                       
                                                                <div style={{textAlign:'left',height:'80%',marginTop:'1%'}}>
                                                                    <textarea value={data.adminComment} style={{width:'97%',color:'#680C07',fontWeight:'800',height:'100%'}} ></textarea>
                                                                </div>
                                                            </div>
                                                        </>)}
                                                    />}
                                                </>)
                                            }
                                        })()}
                                    </td>

                                    <td>{data.interviewDate}</td>

                                    <td><span class='statuscapital' style={{
                                        backgroundColor:(data.interviewStatus==="ผ่าน"?"#4ECB71":data.interviewStatus==="ไม่ผ่าน"?"#EA4335":data.interviewStatus==="เอกสารไม่ถูกต้อง"?"#FBD820":"#C4C4C4")
                                    ,width:'20px',height:'20px',marginTop:'10px',display:'inline-block'}}></span>
                                    </td>

                                    <td>
                                        {(()=>{
                                            if(data.interviewDetails){
                                                return(<>
                                                    {<ViewOffcanvas 
                                                        key={index}
                                                        buttonName="รายละเอียดการสัมภาษณ์"
                                                        placement="top"
                                                        name={data.scholarshipName+index.toString()}
                                                        title={(<>
                                                                <h2 class="offcanvas-title" style={{fontFamily:'Prompt',fontWeight:'600',color:'#680C07'}}>รายละเอียดการสัมภาษณ์</h2>
                                                            </>)}
                                                        body={(<>
                                                            <div style={{textAlign:'left',marginLeft:'1%'}}>
                                                                <div style={{justifyContent:'space-between',display:'inline-flex',width:'100%'}}>
                                                                <p style={{textAlign:'left',fontFamily:'Prompt',fontWeight:'800',color:'#680C07'}}>{"เริ่ม: "+data.startInterview+" ถึง "+data.endInterview}</p>
                                                                <a href={data.meetingLink} target="_blank">
                                                                    <button style={{height:'45px',textAlign:'center',fontFamily:'roboto',width:'120px',marginRight:'40px',color:'white',fontWeight:'700',backgroundColor:'#680C07',
                                                                    borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>to meeting</button>
                                                                </a>
                                                                </div>
                                                                <div style={{textAlign:'left',height:'80%',marginTop:'1%'}}>
                                                                    <textarea value={data.interviewDetails} style={{width:'97%',color:'#680C07',fontWeight:'800',height:'100%'}} ></textarea>
                                                                </div>
                            
                                                            </div>
                                                        </>)}
                                                    />}
                                                </>)
                                            }
                                        })()}
                                    
                                        {/*{(()=>{
                                            if(data.interviewDetails){
                                                return(<>
                                                    <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target={"#"+data.scholarshipName+index.toString()} aria-controls="offcanvasTop">รายละเอียดการสัมภาษณ์</button>
                                                </>)
                                            }
                    
                                        })()}

                                        <div class="offcanvas offcanvas-top" id={data.scholarshipName+index.toString()} style={{width:'100%',height:'30%'}}>
                                        <div style={{textAlign:'left',justifyContent:'space-between',display:'inline-flex',marginLeft:'1%'}}>
                                            <h2 class="offcanvas-title" style={{fontFamily:'Prompt',fontWeight:'600',color:'#680C07'}}>รายละเอียดการสัมภาษณ์</h2>
                                            <button type="button" class="btn-close" data-bs-dismiss="offcanvas"></button>
                                            </div>
                                            <div style={{textAlign:'left',marginLeft:'1%'}}>
                                                <div style={{justifyContent:'space-between',display:'inline-flex',width:'100%'}}>
                                                <p style={{textAlign:'left',fontFamily:'Prompt',fontWeight:'800',color:'#680C07'}}>{"เริ่ม: "+data.startInterview+" ถึง "+data.endInterview}</p>
                                                <a href={data.meetingLink} target="_blank">
                                                    <button style={{height:'45px',textAlign:'center',fontFamily:'roboto',width:'120px',marginRight:'40px',color:'white',fontWeight:'700',backgroundColor:'#680C07',
                                                    borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px'}}>to meeting</button>
                                                </a>
                                                </div>
                                                <div style={{textAlign:'left',height:'80%',marginTop:'1%'}}><textarea value={data.interviewDetails} style={{width:'97%',color:'#680C07',fontWeight:'800',height:'100%'}} ></textarea></div>
            
                                            </div>
                                        </div>*/}
                                    </td>

                                    <td> <span class='statuscapital' style={{
                                        backgroundColor:(data.anouncementStatus==="ผ่าน"?"#4ECB71":data.anouncementStatus==="ไม่ผ่าน"?"#EA4335":data.anouncementStatus==="เอกสารไม่ถูกต้อง"?"#FBD820":"#C4C4C4")
                                    ,width:'20px',height:'20px',marginTop:'10px',display:'inline-block'}}></span></td>
                                    <td>{new Date(data.latestUpdate).toLocaleString("th-TH",{ timeZone:"Asia/Bangkok" })}</td>
                                    </tr>
                                </tbody>
                                </>) 
                            }
                        })}
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default UserStatus;

import { CgProfile } from "react-icons/cg";
import React,{useContext, useEffect, useState} from "react";
import "./CheckHistory.css";
import {useNavigate,useParams,Link} from "react-router-dom"
import { AuthContext } from "../Auth/Auth";
import axios from "axios";
import ViewLoading from "../View/ViewLoading";

const CheckHistory = () => {
    const {userId,role} = useContext(AuthContext)
    const {searchName,searchStudentID,searchMajor,searchClass} = useParams()
    const [newSearchName,setNewSearchName] = useState(searchName!="none"?searchName:"")
    const [newSearchStudentID,setNewSearchStudentID] = useState(searchStudentID!="none"?searchStudentID:"")
    const [newSearchMajor,setNewSearchMajor] = useState(searchMajor)
    const [newSearchClass,setNewSearchClass] = useState(searchClass)
    const [userData,setUserData] = useState([])
    const [loading,setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(()=>{
        if(searchName!="none" || searchStudentID!="none" ||searchMajor!="none" ||searchClass!="none" ){
            axios.post("http://localhost:3001/adminGetUserData",{
                searchName:searchName,
                searchStudentID:searchStudentID,
                searchMajor:searchMajor,
                searchClass:searchClass
            })
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data.contact);
                    response.data.contact.map((data)=>{
                        data.myProfile=JSON.parse(data.myProfile)
                    })
                    setUserData(response.data.contact)

                }else{
                    alert(response.data.message);
                    //setLoading(false);
                }
                setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/adminGetUserData)")
            })
        }
        else{
            setLoading(false)
        }
    },[])

    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div style={{marginTop:"50px" , fontFamily:"Prompt"}}>
                <div className="row"  style={{marginLeft:"5%"}}>
                    <div className="col" >
                        <label className="form-label">ชื่อ</label>
                        <input type="text" className="form-control" placeholder="ชื่อ" name="name" value={newSearchName} onChange={(e)=>setNewSearchName(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label className="form-label">รหัสนิสิต</label>
                        <input type="text" className="form-control" placeholder="รหัสนิสิต" name="stdId" value={newSearchStudentID}  onChange={(e)=>setNewSearchStudentID(e.target.value)}/>
                    </div>
                    <div className="col">
                        <label  className="form-label">สาขา</label>
                        <select className="form-control" placeholder="major" value={newSearchMajor}  onChange={(e)=>setNewSearchMajor(e.target.value)}>
                            <option value="none">None</option>
                            <option value="เครื่องกลและระบบการผลิต">เครื่องกลและระบบการผลิต</option>
                            <option value="คอมพิวเตอร์และสารสนเทศศาสตร์">คอมพิวเตอร์และสารสนเทศศาสตร์</option>
                            <option value="เครื่องกลและการออกแบบ">เครื่องกลและการออกแบบ</option>
                            <option value="โยธา">โยธา</option>
                            <option value="ไฟฟ้าและอิเล็กทรอนิกส์">ไฟฟ้าและอิเล็กทรอนิกส์</option>
                            <option value="อุตสาหการและระบบ">อุตสาหการและระบบ</option>
                            <option value="หุ่นยนต์และระบบ">หุ่นยนต์และระบบ</option>
                        </select>
                    </div>
                    <div className="col">
                         <label  className="form-label">ชั้นปี</label>
                        <select className="form-control" placeholder="ชั้นปี" value={newSearchClass}  onChange={(e)=>setNewSearchClass(e.target.value)} >
                            <option value="none">None</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                        </select>
                    </div>
                    {/*
                    <div className="col">
                        <label  className="form-label">ทุน</label>
                        <select className="form-control" placeholder="ทุน" >
                            <option value="none">None</option>
                            <option value="ทุนเรียนดี">ทุนเรียนดี</option>
                            <option value="ทุนมูลนิธิ">ทุนมูลนิธิ</option>
                            
                        </select>
                    </div>
                    <div className="col">
                        <label  className="form-label">ปีการศึกษา</label>
                        <select className="form-control" placeholder="ปีการศึกษา" >
                            <option value="none">None</option>
                            
                        </select>
                    </div>*/}
                    <div className="col">
                        <br/>
                        {/*<a href={"/CheckHistory/"+searchName+"/"+searchStudentID+"/"+searchMajor}><button type="submit" className="btn btn-primary" style={{ borderRadius:'40px',width: '70%'}}>ค้นหา</button></a>*/}
                        {/*<Link to={"/CheckHistory/"+searchName+"/"+searchStudentID+"/"+searchMajor} style={{alignItems:'flex-end'}}><button type="submit" className="btn btn-primary" style={{ borderRadius:'40px',width: '70%'}}>ค้นหา</button></Link>*/}
                        <a href={"/CheckHistory/"+(newSearchName!=""?newSearchName:"none")+"/"+(newSearchStudentID!=""?newSearchStudentID:"none")+"/"+(newSearchMajor!=""?newSearchMajor:"none")+"/"+(newSearchClass!=""?newSearchClass:"none")}><button className="btn btn-primary" style={{ borderRadius:'40px',width: '70%'}}>ค้นหา</button></a>
                    </div>
                </div>
            {userData.map((data)=>{
                return(<>
                        <div  id="list-ch" className="list-group-item list-group-item-action m-5" style={{borderRadius:'40px' ,width: '90%'}} >
                            <label id="list-group-item-2">{data.myProfile.myFirstName+" "+data.myProfile.myLastName}</label>
                            <label id="list-group-item-3">{data.myProfile.studentID}</label>
                            <label >{"คณะ วิศวกรรมศาสตร์"}</label>
                            <label >{"สาขา "+data.myProfile.major}</label>
                            <a  id="list-ch2"href={"/SThistory/"+data.userId}><button className='btn btn-primary' style={{ borderRadius:'40px'}}>กดเพื่อดูประวัติ</button></a>
                        </div>
                    </>)
            })}
            {/*<ul className="pagination d-flex justify-content-center">
	            <li className="page-item"><a className="page-link" href="#">Previous</a></li>
	            <li className="page-item"><a className="page-link" href="#">1</a></li>
	            <li className="page-item active"><a className="page-link" href="#">2</a></li>
	            <li className="page-item"><a className="page-link" href="#">3</a></li>
	            <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>*/}
            
        </div>
    </>)
}
export default CheckHistory;
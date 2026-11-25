import "./InterviewAdmin.css";
import axios from "axios";
import React,{useState,useEffect,useContext} from "react";
import { Link ,useNavigate} from "react-router-dom";
import { AuthContext } from "../Auth/Auth";
import ViewLoading from "../View/ViewLoading";
const InterviewAdmin = () => {
    const {role} = useContext(AuthContext);
    const [dataScholarship ,setDataScholarship ] = useState([])
    const [loading ,setLoading ] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        if(role!=="admin"){
            navigate(-1)
        }else{
            axios.post("http://localhost:3001/interviewAdmin",{
                dataMysql:"scholarshipId,scholarshipName,interviewDate,startInterview,endInterview,committee",
            })
            .then((response) => {
                let newdataSholar = []
                if(response.data.status==="ok"){
                    response.data.contact.map((dataSholar)=>{
                        dataSholar.committee=JSON.parse(dataSholar.committee)
                        newdataSholar.push(dataSholar)
                    })
                }
                setDataScholarship(newdataSholar)
                setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ post http://localhost:3001/interviewAdmin ได้")
            })
        }
    }, []);
    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return<ViewLoading/>
    }
    return(<>
        <div class="Intercontainer" style={{fontFamily:'Prompt',fontWeight:'500'}}>
            <div class="container pt-5">
                <div class="container pt-5">
                    <div id="interAdmin-text" class="d-flex justify-content-start mb-3" >
                        <h4 style={{fontWeight:'800' }}>รายละเอียดวันนัดสัมภาษณ์</h4>
            
                    </div>
                    <div id="interAdmin-table" class="table-responsive table-bordered">
                        <table id="interAdmin-table-bd"  class="table table-bordered ">
                        <thead id="interAdmin-table-1" bgcolor="#680C07" >
                            <tr style={{textAlign:'center' }}>
                            <th>#</th>
                            <th>รายชื่อทุน</th>
                            <th>วันที่นัดสัมภาษณ์</th>
                            <th>ช่วงเวลา</th>
                            <th>แก้ไขรายละเอียด</th>     
                            <th>ยืนยันผู้ผ่านการสัมภาษณ์</th> 
                            </tr>
                        </thead>
                        {dataScholarship.map((data,index)=>{
                            return(<>
                            <tbody id="interAdmin-table-2">
                                <tr style={{textAlign:'center' }}>
                                <td>{index+1}</td>
                                <td>{data.scholarshipName}</td>
                                <td>{data.interviewDate}</td>
                                <td>{data.startInterview+" - "+data.endInterview}</td>
                                <td>
                                    <a href={"/RateAdmin/"+data.scholarshipId}>
                                        click here!
                                    </a>
                                </td>
                                <td><Link to={"/CheckAnouncement/"+data.scholarshipId}><button type="button" class="btn btn-success">ยืนยันผู้ผ่านการสัมภาษณ์</button></Link></td>
                                </tr>
                            </tbody>
                            </>)
                        })}
                        </table>
                    </div>


                    
                </div>
            </div>
        </div>
    </>)
}
export default InterviewAdmin;

/*<tbody id="interAdmin-table-2">
                            <tr>
                            <td>2</td>
                            <td>ทุนเรียนดี</td>
                            <td>12/01/65</td>
                            <td>11.00 a.m. - 13.00 p.m.</td>
                            <td>
                            <a href="" data-bs-toggle="offcanvas" data-bs-target="#demo">
                                    click here!
                                </a>
                            </td>
                            <td><button type="button" class="btn btn-success">ยืนยันผู้มีสิทธิ์สัมภาษณ์</button></td>
                            </tr>
                        </tbody>

                        <tbody id="interAdmin-table-2">
                            <tr>
                            <td>3</td>
                            <td>ทุนเรียนดี</td>
                            <td>12/01/65</td>
                            <td>11.00 a.m. - 13.00 p.m.</td>
                            <td>
                            <a href="" data-bs-toggle="offcanvas" data-bs-target="#demo">
                                    click here!
                                </a>
                            </td>
                            <td><button type="button" class="btn btn-success">ยืนยันผู้มีสิทธิ์สัมภาษณ์</button></td>
                            </tr>
                        </tbody> */
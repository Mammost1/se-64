import "./InterviewSchedule.css";
import React,{useEffect,useState,useContext} from "react";
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext } from "../Auth/Auth";
import { useNavigate} from "react-router-dom";
const InterviewSchedule = () => {
    const {role,email} = useContext(AuthContext);
    const [dataScholarship ,setDataScholarship ] = useState([])
    const [loading ,setLoading ] = useState(true)

    const navigate = useNavigate()
    useEffect(() => {
        axios.post("http://localhost:3001/InterviewSchedule",{
                dataMysql:"scholarshipId,scholarshipName,interviewDate,startInterview,endInterview,committee",
                email:email
            })
            .then((response) => {
                //let newdataSholar = []
                if(response.data.status==="ok"){
                    setDataScholarship(response.data.contact)
                    /*response.data.contact.map((dataSholar)=>{
                        dataSholar.committee=JSON.parse(dataSholar.committee)
                        if(dataSholar.committee!==null){
                            if(dataSholar.committee.find(data => data.email.toLowerCase()===email.toLowerCase()) !==undefined){
                                newdataSholar.push(dataSholar)
                            }
                        }
                    })*/
                }
                //console.log(response.data.contact);
                //console.log(newdataSholar);
                //console.log(email);
                //setDataScholarship(newdataSholar)
                setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ post http://localhost:3001/InterviewSchedule ได้")
        })
    }, []);
    if(role==="user"){
        navigate(-1)
    }
    if(loading){
        return<ViewLoading/>
    }
    return(<>
        <div className="Intercontainer" style={{fontFamily:'Prompt',fontWeight:'500'}}>
                <div className="container pt-5">
                    <div id="inter-text" className="d-flex justify-content-start mb-3" >
                        <h4 style={{fontFamily:'Prompt',fontWeight:'800'}}>รายละเอียดวันนัดสัมภาษณ์</h4>
            
                    </div>
                    <div id="inter-table" className="table-responsive table-bordered">
                        <table id="inter-table-bd"  className="table table-bordered ">
                        <thead id="inter-table-1" bgcolor="#680C07" >
                            <tr style={{textAlign:'center' }}>
                            <th>#</th>
                            <th>รายชื่อทุน</th>
                            <th>วันที่นัดสัมภาษณ์</th>
                            <th>ช่วงเวลา</th>
                            <th>ตารางรายชื่อ</th>     
                            </tr>
                        </thead>
                        {dataScholarship.map((data,index)=>{
                            return(<>
                            <tbody id="inter-table-2">
                                <tr style={{textAlign:'center' }}>
                                <td>{index+1}</td>
                                <td>{data.scholarshipName}</td>
                                <td>{data.interviewDate}</td>
                                <td>{data.startInterview+" - "+data.endInterview}</td>
                                <td>
                                <a href={"/PassList/"+data.scholarshipId}>
                                   ตรวจสอบตารางรายชื่อ
                                </a>
                                </td>
                                </tr>
                            </tbody>
                            </>)
                        })}
                        </table>
                    </div>                    
                </div>
            </div>
    </>)
}
export default InterviewSchedule;

/*<tbody id="inter-table-2">
                            <tr>
                            <td>1</td>
                            <td>ทุนเรียนดี</td>
                            <td>12/01/65</td>
                            <td>11.00 a.m. - 13.00 p.m.</td>
                            <td>
                            <a href="" data-bs-toggle="offcanvas" data-bs-target="#demo">
                                    click here!
                                </a>
                            </td>
                            </tr>
                        </tbody>
                        <tbody id="inter-table-2">
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
                            </tr>
                        </tbody>

                        <tbody id="inter-table-2">
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
                            </tr>
                        </tbody>*/

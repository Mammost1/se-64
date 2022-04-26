import React,{useContext, useEffect, useState} from "react";
import {Link,useParams,useNavigate} from 'react-router-dom'
import axios from "axios";
import ViewLoading from "../View/ViewLoading";
import { AuthContext } from '../Auth/Auth';
import "./Totalcapital.css";
const Totalcapital= () => {
    const {searchDonorName,searchAcademicYear} = useParams()
    const {role} = useContext(AuthContext);

    const [newSearchDonorName,setNewSearchDonorName] = useState(searchDonorName!="none"?searchDonorName:"")
    const [newSearchAcademicYear,setNewSearchAcademicYear] = useState(searchAcademicYear!="none"?searchAcademicYear:"")
    const [allDonorName,setAllDonorName] = useState([])
    const [allAcademicYear,setAllAcademicYear] = useState([])

    const [donorData,setDonorData] = useState([])

    const [loadingDonorData,setLoadingDonorData] = useState(true)
    const [loadingAllDonorName,setLoadingAllDonorName] = useState(true)
    const [loadingAllAcademicYear,setLoadingAllAcademicYear] = useState(true)
    
    const allMoney = donorData.reduce(
        (sum,item) => sum + (item.amount*item.capital), 0
      );

    const navigate = useNavigate()

    useEffect(()=>{
        if(searchDonorName!="none" || searchAcademicYear!="none" ){
            axios.post("http://localhost:3001/adminGetDonorData",{
                searchDonorName:searchDonorName,
                searchAcademicYear:searchAcademicYear
            })
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data.contact);
                    setDonorData(response.data.contact)

                }else{
                    alert(response.data.message);
                }
                setLoadingDonorData(false)
                //setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/adminGetDonorData)")
            })
        }else{
            setLoadingDonorData(false)
        }

        axios.get("http://localhost:3001/getAllDonorName")
            .then((response) => {
                if(response.data.status==="ok"){
                    response.data.contact.map((data,index)=>{
                        response.data.contact[index] = {value: data.donorName, label: data.donorName}
                    })
                    setAllDonorName( response.data.contact)
                }else{
                    alert(response.data.message);
                }
                setLoadingAllDonorName(false)
            },(err)=>{
            alert("ไม่สามารถ get(http://localhost:3001/getAllDonorName)")
        })

        axios.get("http://localhost:3001/getAllAcademicYear")
            .then((response) => {
                if(response.data.status==="ok"){
                    console.log(response.data);
                    response.data.contact.map((data,index)=>{
                        response.data.contact[index] = {value: data.academicYear, label: data.academicYear}
                    })
                    setAllAcademicYear( response.data.contact)
                }else{
                    alert(response.data.message);
                }
                setLoadingAllAcademicYear(false)
            },(err)=>{
            alert("ไม่สามารถ get(http://localhost:3001/getAllAcademicYear)")
        })
    },[])
    if(role!=="admin"){
        navigate(-1)
    }
    if(loadingDonorData || loadingAllDonorName || loadingAllAcademicYear){
        return <ViewLoading/>
    }
    return(<>
        <div style={{fontFamily:'Prompt'}}>
    
                <div class='p-5'>
                <h1 style={{fontWeight:'bold',color:"#680C07",marginBottom:'10px'}}>ยอดรวมผู้บริจาค</h1>
                
                <h4 style={{fontWeight:'bold',color:"#680C07",marginBottom:'30px'}}>ใส่ชื่อผู้บริจาคที่ต้องการตรวจสอบ</h4>
                <div class='d-inline-flex'>
                    <div className='search'>  
                            <div className="icon">

                            </div>
                            <div className="input">
                            <input type="text" placeholder='ใส่ชื่อผู้บริจาคที่ต้องการตรวจสอบ' list="donorName" value={newSearchDonorName} onChange={(e)=>setNewSearchDonorName(e.target.value)}></input>
                            <datalist id="donorName">
                                {allDonorName.map((donorName)=>{
                                    return(<>
                                        <option value={donorName.value}/>
                                    </>)
                                })}
                            </datalist>
                                
                            </div>
                    <span className="clear" onClick={()=>setNewSearchDonorName("")}></span>
                    </div>
                    <div>
                    <select value={newSearchAcademicYear} className='TotalScholarship-dropdown-1'style={{}} onChange={(e)=>setNewSearchAcademicYear(e.target.value)}>
                        <option className='TotalScholarship-dropdown-option-1' value="none">ทั้งหมด</option>
                        {allAcademicYear.map((data)=>{
                            return <option className='TotalScholarship-dropdown-option-1' value={data.value}>{data.value}</option>
                        })}
                    </select>
                    </div>

                    <a href={"/Totalcapital/"+(newSearchDonorName!=""?newSearchDonorName:"none")+"/"+(newSearchAcademicYear!=""?newSearchAcademicYear:"none")}><button className='TotalScholarship-btn-search' >ค้นหา</button></a>
                </div>
               
                {donorData.map((data)=>{
                    return(<>
                        <div  id="list-group-item" className="list-group-item list-group-item-action mt-3" style={{ borderRadius:'40px' ,width: '100%'}} >
                            <label id="Totalcapital-0" style={{fontSize:'15px'}}>{data.scholarshipName}</label>
                            <label id="Totalcapital-1" style={{fontSize:'15px'}}>{"ผูุ้มอบ"+data.donorName}</label>
                            <label id="Totalcapital" style={{fontSize:'15px'}}>{"ปีการศึกษา"+data.academicYear}</label>
                            <label id="Totalcapital-3" style={{fontSize:'15px'}}>{"มูลค่า "+data.capital+" บาท"+" จำนวน "+data.amount+" ทุน"}</label>
                            
                            <a  id="Totalcapital-2" href={"/Details/"+data.scholarshipId}><button className='btn btn-primary btn-sm' style={{ borderRadius:'40px'}}>กดเพื่อดูรายละเอียด</button></a>
                        </div>
                    </>)
                })}
                <h1 style={{fontWeight:'bold',color:"#680C07",marginBottom:'30px',marginTop:'30px'}}>รวมเป็นเงิน {allMoney} บาท</h1>
            </div>  
        </div>     
 </>)
}
export default Totalcapital;
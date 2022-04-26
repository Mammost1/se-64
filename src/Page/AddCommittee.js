import React, { useState,useEffect,useContext} from 'react'
import axios from "axios";
import { AuthContext} from '../Auth/Auth';
import { useNavigate } from 'react-router-dom'
const AddCommittee = () => {
    const {role} = useContext(AuthContext);
    const [allCommittee ,setAllCommittee ] = useState({data:[]})
    const [searchCommittee,setSearchCommittee] = useState("")

    const [newCommittee,setNewCommittee] = useState("")
    
    const [loading ,setLoading ] = useState(true)
    const navigate = useNavigate()
    
    const addCommittee =()=>{
        axios.post("http://localhost:3001/addNewCommittee",{
            gmail:newCommittee
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact.insertId);
                let newAllCommittee = allCommittee.data;
                newAllCommittee.push({userId:response.data.contact.insertId,gmail:newCommittee,role:"committee"})
                setAllCommittee({data:newAllCommittee})
                setNewCommittee("")
                alert(newCommittee+" ถูกเพิ่มเข้าใหม่เป็นกรรมการ");
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/addNewCommittee)")
        })
    }

    const editCommittee =(userId)=>{
        axios.put("http://localhost:3001/editRole",{
            gmail:newCommittee,
            role:"committee"
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newAllCommittee = allCommittee.data;
                newAllCommittee.push({userId:userId,gmail:newCommittee,role:"committee"})
                newAllCommittee.sort((a,b) => (a.userId > b.userId) ? 1 : ((b.userId > a.userId) ? -1 : 0))
                setAllCommittee({data:newAllCommittee})
                setNewCommittee("")
                alert(newCommittee+" ถูกเปลี่ยนจาก user => กรรมการ");
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/editRole)")
        })
    }


    const handleSubmit =(e)=>{
        e.preventDefault();
        axios.post("http://localhost:3001/getRoleFormGmail",{
            gmail:newCommittee
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                if(response.data.contact.length===0){
                    addCommittee()
                }else{
                    if(response.data.contact[0].role==="committee"){
                        alert("email นี้เป็นกรรมการอยู่แล้ว")
                    }
                    else if(response.data.contact[0].role==="admin"){
                        alert("email นี้เป็น admin ไม่สารถเปลี่ยนเป็นกรรมการได้")
                    }else{
                        editCommittee(response.data.contact[0].userId)
                    }
                }
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getRoleFormGmail)")
        })
    }
    useEffect(()=>{
        axios.get("http://localhost:3001/getAllCommittee")
        .then((response) => {
            if(response.data.status==="ok"){
                setAllCommittee({data:response.data.contact});
            }else{
                alert(response.data.message);
            }
            setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/getAllCommittee)")
        })
    },[])

    if(role!=="admin"){
        navigate(-1)
    }
    return(<>
         <div class=''  style={{fontFamily:'Prompt',marginLeft:'20px',}}>
            <h1  style={{fontWeight:'bold',marginTop:'120px',color:"#680C07"}}>เพิ่มอีเมลกรรมการ</h1>
            <h5 style={{fontWeight:'bold',marginTop:'10px',color:"#680C07",marginBottom:'15px'}}>ค้นหากรรมการที่มีอยู่</h5>
                <div class='d-inline-flex w-100'>
                    <div className='search'>  
                            <div className="icon">

                            </div>
                            <div className="input">
                            <input type="text" placeholder='ใส่อีเมลกรรมการที่ต้องการค้นหา' value={searchCommittee} onChange={(e)=>setSearchCommittee(e.target.value)}></input>
                              
                            </div>
                            <span className="clear" onClick={()=>setSearchCommittee("")}></span>
                    </div>
                    <a><button class='TotalScholarship-btn-search'>ค้นหา</button></a>  
                </div>
                <div class='d-inline-flex pt-3'>
                    <form onSubmit={handleSubmit} className="was-validated" style={{margin:"2%"}}>
                        <div className="input-group">
                            <label style={{marginTop:'5px'}}>{"ใส่อีเมลกรรมการที่ต้องการเพิ่ม :"}</label>
                            <input class="input-group-text w-auto form-control" type="email" placeholder='Email' style={{borderRadius:'100px',marginTop:'10px', height:'45px'}} value={newCommittee} onChange={(e)=>setNewCommittee(e.target.value)} required></input>
                        </div>
                        <div  style={{height:'100px'}}>
                            <button type='submit' class='btn btn-success btn-sm h-50 ' style={{borderRadius:'150px',marginLeft:'5px',marginTop:'10px',width:'110px',height:'10px'}}>เพิ่ม</button>
                        </div>
                    </form>  
                </div>
                <h4  style={{fontWeight: 800,color:"#680C07"}}>อีเมลกรรมการทั้งหมด</h4>
                {allCommittee.data.map((data)=>{
                    if(searchCommittee==="" || data.gmail.search(searchCommittee.toLowerCase())!== -1 ){
                       return(<>
                            <div  id="list-group-item" className="list-group-item list-group-item-action mt-3" style={{ borderRadius:'40px' ,width: '50%'}} >
                                <div class='d-flex justify-content-between'>
                                    <label id="list-group-item-3" style={{fontSize:'24px',marginTop:'5px'}}>{data.gmail}</label>
                                    <a  href={"/CheckCommittee/"+data.userId}><button className='btn btn-primary btn-sm' style={{ borderRadius:'40px'}}>ดูประวัติการเป็นกรรมการ</button></a>
                                </div>
                            </div>
                        </>) 
                    }
                    
                })}            
            </div>
    </>)
}
export default AddCommittee;

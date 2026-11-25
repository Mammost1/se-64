import '../App.css';
import './TotalScholarship.css';
import {Link,useParams } from 'react-router-dom'
import './searchbar.css'
import React, { useState, useEffect,useContext} from 'react'
import axios from 'axios';
import ViewLoading from '../View/ViewLoading';
import { AuthContext } from '../Auth/Auth';
const  TotalScholarship = () => {
    const {role} = useContext(AuthContext)
    const {searchName,page,searchStatus} = useParams()
    const [scholarship,setScholarship] = useState([])
    const [newSearchStatus,setNewSearchStatus] = useState(searchStatus)
    const [newSearchName,setNewSearchName] = useState(searchName)
    const [lenScholarship,setLenScholarship] = useState(0)
    const [dowloadImg,setDowloadImg] = useState(null)
    const [loading,setLoading] = useState(true)
    const getScholarship = () => {
        axios.post("http://localhost:3001/totalscholarship",{
                dataMysql:"scholarshipId,status,scholarshipName,details,urlBase64Img",
                searchName:searchName,
                searchStatus:searchStatus,
                page:page
            })
            .then((response) => {
                //console.log(response.data.contact);
                /*response.data.contact.map((data)=>{
                    data.urlBase64Img=bufferToBase64(data.urlBase64Img.data)
                })*/
                //console.log(response.data.contact);
                if(response.data.status==="ok"){
                setScholarship(response.data.contact)
                setLenScholarship(response.data.len)
                setDowloadImg(0)}
                else{
                    alert(response.data.message)
                }
                setLoading(false)
            },(err)=>{
                alert("ไม่สามารถ get http://localhost:3001/totalscholarship ได้")
            })
    };
    useEffect(() => {
        getScholarship();
    }, []);
    useEffect(() => {
        if(scholarship.length>0){
            if(dowloadImg<scholarship.length){
                let newScholarship = scholarship
                newScholarship[dowloadImg].urlBase64Img=bufferToBase64(newScholarship[dowloadImg].urlBase64Img.data)
                setScholarship(newScholarship)
                setDowloadImg(dowloadImg+1)
            }
        }
    }, [dowloadImg]);
    const bufferToBase64=(buffer)=>{
        //console.log(buffer);
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        //console.log(binary);
        //binary = window.btoa( binary )
        return(binary)
    }
    
    if(loading){
        return <ViewLoading/>
    }
    return(
        <>
        <div className="TotalScholarship-div-line-54">
            <header className="mt-3">
                {(()=>{
                    if(role==="admin"){
                        return  (<>
                        <div className="d-inline-flex" style={{justifyContent:'space-between',width:'100%'}}>
                            <h1 className='TotalScholarship-h1-line-58'>ทุนที่เปิดรับสมัครทั้งหมด</h1>
                            <Link to="/CreateCapital/new" style={{alignItems:'flex-end'}}><button className='TotalScholarship-btn-addScholarship'>เพิ่มทุน</button></Link>
                        </div>
                        </>)
                    }
                })()}

                <div className="d-inline-flex p-3" style={{marginTop:'5px'}}> 
                    <div className='search'>
                        <div className="icon"></div>
                        <div className="input">
                            <input type="text" value={newSearchName==="all"?"":newSearchName} onChange={(e)=>setNewSearchName(e.target.value)} placeholder='Search' id="mysearch"></input>
                        </div>
                        <span className="clear" onClick={()=>setNewSearchName("")}></span>
                    </div>
                    <select value={newSearchStatus==="all"?"":newSearchStatus} onChange={(e)=>setNewSearchStatus(e.target.value)} className='TotalScholarship-dropdown-1'
                    style={{backgroundColor:(newSearchStatus==="all"?'#d9dcdf ':newSearchStatus==="recruit"?'#EA4335':newSearchStatus==="interview"?'#FBD820':"#4ECB71")}}>
                        <option className='TotalScholarship-dropdown-option-1' value="all">ทั้งหมด</option>
                        <option className='TotalScholarship-dropdown-option-2' value="recruit" >กำลังรับสมัคร</option>
                        <option className='TotalScholarship-dropdown-option-3' value="interview" >กำลังรอสัมภาษณ์</option>
                        <option className='TotalScholarship-dropdown-option-4' value="anouncement" >ประกาศผู้ได้รับทุนแล้ว</option>
                    </select>
                    <a href={"/TotalScholarship/"+(newSearchName===""?"all":newSearchName)+"/"+newSearchStatus+"/"+1}>
                    <button className='TotalScholarship-btn-search'>ค้นหา</button></a>
                </div>
                <div className="d-inline-flex p-3">
                    <h6 className='mt-1' style={{fontFamily:"Prompt",fontWeight:'800'}}>สถานะของทุน:</h6>
                    <span className='statuscapital' style={{backgroundColor:'#EA4335'}}></span>
                    <h6 className='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>กำลังรับสมัคร</h6>
                    <span className='statuscapital' style={{backgroundColor:'#FBD820'}}></span>
                    <h6 className='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>กำลังรอสัมภาษณ์</h6>
                    <span className='statuscapital' style={{backgroundColor:'#4ECB71'}}></span>
                    <h6 className='mt-1' style={{fontFamily:"Prompt",marginLeft: '0.3em'}}>ประกาศผู้ได้รับทุนแล้ว</h6>
                </div>
        
                
                {scholarship.map((data)=>{
                    return(<>
                        <Link to={"/Details/"+data.scholarshipId}>
                        <div className="d-flex justify-content-start" style={{margin:"10px"}}>
                        <div className="capital d-flex container p-4" style={{backgroundColor:(data.status==="recruit"?"#EA4335":data.status==="interview"?"#FBD820":"#4ECB71"),marginTop:'1.4em',
                        boxShadow:'0 1px 3px rgba(0, 0, 0,1)'}} >
                                <img src={data.urlBase64Img} className="align-self-center" style={{width:'75%',height:'100%', borderImage:'50%',borderTopLeftRadius:50 , borderBottomLeftRadius:50}}>
                                </img>
                                <div className='p-3'style={{width:'100%',height:'100%',backgroundColor:(data.status==="recruit"?"#e0584c":data.status==="interview"?"#f7e165":"#65db86"), borderTopRightRadius:50,borderBottomRightRadius:50}}>
                                    <div className='TotalScholarship-span-font-header'>
                                        <h2 className='TotalScholarship-span-font'>{data.scholarshipName}</h2>
                                    </div>
                                    <div style={{width:'100%',height:'70%'}}>
                                    <textarea className='d-flex justify-content-left' value={data.details} style={{width:'100%',height:'100%',resize:'none',background:'transparent',border:'none',fontFamily:"Prompt",fontWeight:'800',color: '#341392'}} rows="3" cols="50" disabled>
                                    </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Link>
                    </>)
                })}
                
                {/*w8 create mapping*/}
            
                <div className="d-flex justify-content-center pt-3" style={{fontFamily:'roboto'}}>
                    <ul className="pagination">
                        <li className="page-item"><a className="page-link" href={page!=="1"?"/TotalScholarship/"+searchName+"/"+searchStatus+"/"+(parseInt(page)-1).toString():"#"}>Previous</a></li>
                        {(()=>{
                            let temp=[]
                            for (let i = 0; i*5 < lenScholarship; i++){
                                temp.push(<li className={page===(i+1).toString()?"page-item active":"page-item"}><a className="page-link" href={"/TotalScholarship/"+searchName+"/"+searchStatus+"/"+(i+1).toString()}>{i+1}</a></li>)
                            }
                            return temp.map((data)=>data)
                        })()}
                        <li className="page-item"><a className="page-link" href={page*5 < scholarship.length?"/TotalScholarship/"+searchName+"/"+searchStatus+"/"+(parseInt(page)+1).toString():"#"}>Next</a></li>
                    </ul>
                </div>
           
            </header>
        </div>
    </>)
}
export default TotalScholarship;

/*<li className="page-item"><a className="page-link" href="#">1</a></li>
                        <li className="page-item active"><a className="page-link" href="#">2</a></li>
                        <li className="page-item"><a className="page-link" href="#">3</a></li>
<div className='pt-5 pb-5'>
                    <Link to="/Details/recruit"><button style={{backgroundColor:"red"}}>ไปดูรายละเอียดทุน</button></Link>
                    <Link to="/Details/interview"><button style={{backgroundColor:"yellow"}}>ไปดูรายละเอียดทุน</button></Link>
                    <Link to="/Details/anouncement"><button style={{backgroundColor:"green"}}>ไปดูรายละเอียดทุน</button></Link>
                    <Link to="/CreateCapital"><button>สร้างทุน</button></Link>
                </div>*/

import React, { useState,useEffect,useContext} from 'react'
import {Link,useParams,Navigate,useNavigate } from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from '../Auth/Auth';
import ViewLoading from '../View/ViewLoading';
import ViewConfirm from '../View/ViewConfirm';
import { Modal } from 'bootstrap';
import "./Details.css"
const Details = () => {
    const {checkLogout,userId,role} = useContext(AuthContext);
    const {scholarshipId } = useParams();
    const [loading ,setLoading ] = useState(true)
    const [loadModal,setLoadModal ] = useState(false)
    const [apply ,setApply ] = useState(null)
    const [realTime,setRealTime] = useState(new Date())
    const [remainingTime,setRemainingTime] = useState(0)
    const navigate =useNavigate()
    const [data,setData] = useState({
        name:"ทุน \"มูลนิธิ ทางสู่ฝัน ปั้นคนเก่ง\"",
        img:"https://scontent.fbkk3-3.fna.fbcdn.net/v/t1.6435-9/72798128_10157746024862451_2959793411147694080_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeElw8XIt47ZYJAjlmWNIuaydQLvwQRcnMN1Au_BBFycw9pdCOgzF0GiuTzj679is-fP7cY9lSQpG85IgI00ITit&_nc_ohc=Do0YVjg42rYAX8LQH9k&tn=Fs2I--UDcUJhSHnT&_nc_ht=scontent.fbkk3-3.fna&oh=00_AT8tGzPiIn_gUI5FQ7MyZl-8ZHvW2Y9M_HeAMnuQqeyIqA&oe=621B25D5",
        detail:"คุณสมบัติผู้รับทุน \n 1. สัญชาติไทย และมีภูมิลําเนาอยู่ในประเทศไทย \n2. อายุไม่เกิน 21 ปีบริบูรณ์",
        evidence: ["ประวัติส่วนตัว","ประวัติครอบครัว","รายได้ของผู้ขอรับทุน","สำเนาบัตรประจำตัวประชาชนของผู้สมัคร","สำเนาทะเบียนบ้านของผู้สมัคร","แนบไฟล์เรียงความ","แนบไฟล์รูปถ่ายนิสิต","แนบไฟล์รูปถ่ายบ้านที่พักอาศัยตามภูมิลำเนา","แนบไฟล์ใบรายงานผลการศึกษา (Transcript) ปริ๊นจากเวปได้"]
    })
    const [scholarshipData,setScholarshipData] = useState([])
    const [checkDelete,setCheckDelete] = useState(false)
    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        //binary = window.btoa( binary )
        return(binary)
    }
    const openPDF=(base64)=>{
        //var string = "data:applicant/pdf;base64, " + bufferToBase64(buffer);
        var iframe = "<iframe width='100%' height='100%' src='" + base64 + "'></iframe>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);
        
    }
    const readPDF=(buffer)=>{
        var string = "data:applicant/pdf;base64, " + bufferToBase64(buffer);
        return string
    }
    const dhm=(t)=>{
        if(t<0){
            return "หมดเวลาแล้ว"
        }
        var cd = 24 * 60 * 60 * 1000,
            ch = 60 * 60 * 1000,
            cm = 60 * 1000,
            d = Math.floor(t / cd),
            h = Math.floor( (t - d * cd) / ch),
            m = Math.ceil( (t - d * cd - h * ch ) / 60000),
            //s = Math.ceil(60+ (t - d * cd - h * ch - m * cm) / 1000),
            pad = function(n){ return n < 10 ? '0' + n : n; };
        //m-=1;
        /*if( s === 60 ){
            m++;
            s = 0;
        }*/
        if( m === 60 ){
            h++;
            m = 0;
        }
        if( h === 24 ){
            d++;
            h = 0;
        }
        // return d+"วัน"+ pad(h)+"ชั่วโมง"+ pad(m)+"นาที" + s+"วินาที";
        return d+" วัน "+ pad(h)+" ชั่วโมง "+ pad(m)+" นาที" ;
    }
    const deleteScholarship=()=>{
        setLoadModal(true)
        /*const bsModal =Modal.getInstance(document.getElementById("myModal-DeleteScholarship"),{
            keyboard: false
            })
        bsModal.hide()*/
        document.getElementById("myModal-DeleteScholarship-close").click();
        axios.put("http://localhost:3001/deleteScholarshipForId", { 
            scholarshipId :scholarshipData[0].scholarshipId,
            }).then((response) => {
                if(response.data.status==="ok"){
                    //alert(response.data.message)
                    document.getElementById("myModal-DeleteScholarship-close").click();
                    setLoadModal(false)
                    setCheckDelete(true)
                }else{
                    alert(response.data.message)
                    document.getElementById("myModal-DeleteScholarship-close").click();
                }
            },(err)=>{
                alert("ไม่สามารถ put(http://localhost:3001/deleteScholarshipForId)")
            }
        );
    }
    const checkApplyScholarship=(scholarshipId)=>{
        console.log(scholarshipId);
        axios.post("http://localhost:3001/checkApplyScholarship", { 
            scholarshipId :scholarshipId,
            userId:userId
            }).then((response) => {
                console.log(response.data);
                if(response.data.status==="ok"){
                    if(response.data.message==="สมัครทุนนี้แล้ว"){
                        setApply(response.data.contact.totalHistoryId)
                    }
                    setLoading(false)
                }else{
                    alert(response.data.message)
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/checkApplyScholarship)")
            }
        );
    }

    useEffect(()=>{
        axios.post("http://localhost:3001/scholarshipForId",{
            scholarshipId:scholarshipId
        })
        .then((response) => {
            console.log(response.data[0]);
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                response.data.contact[0].applicantDocuments = JSON.parse(response.data.contact[0].applicantDocuments)
                response.data.contact[0].urlBase64Img = bufferToBase64(response.data.contact[0].urlBase64Img.data)
                response.data.contact[0].urlBase64Details = bufferToBase64(response.data.contact[0].urlBase64Details.data)
                setScholarshipData(response.data.contact);
                checkApplyScholarship(response.data.contact[0].scholarshipId)
                setRemainingTime(new Date(response.data.contact[0].closeDate)-new Date())
                const interval = setInterval(() => {
                    let date = new Date()
                    setRealTime(date)
                    setRemainingTime(new Date(response.data.contact[0].closeDate)-date )
                    /*if(new Date(response.data.contact[0].closeDate)-date<0){
                        return clearInterval(interval);
                    }*/
                    //clearInterval(interval);
                }, 1000);
            }else{
                alert(response.data.message);
                navigate(-1)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })
        /*const interval = setInterval(() => {
            let date = new Date()
            setRealTime(date)
            //setRemainingTime(new Date(scholarshipData[0].closeDate)-date )
            //clearInterval(interval);
        }, 1000);*/
        //return ()=>clearInterval(interval)

    },[])
    if(loading){
        return <ViewLoading/>
    }
    if(checkDelete){
        return <Navigate to="/TotalScholarship/all/all/1"/>;
    }
    return(<>
        <div style={{marginLeft:'20px',marginTop:'130px',color:'#680C07',marginRight:'10px',marginBottom:'50px'}}>
           <div style={{width:'30%',fontFamily:'Prompt',float:'right'}}>
                {/* <h1>{"เวลาปัจจุบัน :"+realTime.toLocaleString("th-TH", { timeZone: "Asia/Bangkok"})}</h1>
                <h1>{"เวลาหมด :"+new Date(scholarshipData[0].closeDate).toLocaleString("th-TH", { timeZone: "Asia/Bangkok"  })}</h1>                 */}
                <h1  style={{fontSize: 20}} >{"หมดเวลารับสมัคร : "+ dhm(remainingTime)}</h1>
                <h1 style={{fontSize: 20}}>{apply!==null?"คุณได้สมัครทุนนี้แล้ว":"คุณไม่ได้สมัครทุนนี้"}</h1>
            </div> 
            {scholarshipData.map((data)=>{
                let temp =[]
                if(data.applicantDocuments.idCard){
                    temp.push(<li>สำเนาบัตรประจำตัวประชาชนของผู้สมัคร</li>);
                }
                if(data.applicantDocuments.houseRegistration){
                    temp.push(<li>สำเนาทะเบียนบ้านของผู้สมัคร</li>);
                }
                if(data.applicantDocuments.essay){
                    temp.push(<li>แนบไฟล์เรียงความ </li>);
                }
                if(data.applicantDocuments.nisitPicture){
                    temp.push(<li>แนบไฟล์รูปถ่ายนิสิต</li>);
                }
                if(data.applicantDocuments.housePicture){
                    temp.push(<li>แนบไฟล์รูปถ่ายบ้านที่พักอาศัยตามภูมิลำเนา </li>);
                }
                if(data.applicantDocuments.studyResults){
                    temp.push(<li>แนบไฟล์ใบรายงานผลการศึกษา (Transcript) ปริ๊นจากเวปได้ </li>);
                }
                if(data.applicantDocuments.diseaseEffects){
                    temp.push(<li>แนบไฟล์เรียงความผลกระทบโรคระบาด</li>);
                }
 
                return(<>
                    <h1 style={{fontFamily:'Prompt',marginTop:'0.5em',fontWeight:'800',color:'#680C07',marginTop:'20px'}}><u>ชื่อทุน {data.scholarshipName} </u></h1>
                    <h1 style={{fontFamily:'Prompt',marginTop:'0.5em',color:'#680C07',marginTop:'20px',fontSize: 28,}}><span style={{fontWeight:'800'}}>ประจำปี</span> {data.academicYear} <span style={{fontWeight:'800'}}>ภาค</span> {data.term}</h1>
                    <h1 style={{fontSize:'30px',color:'#680C07',fontSize: 25}}><span style={{fontFamily:'Prompt',fontWeight:'800',color:'#680C07',fontSize: 25}}>บริจาคโดย</span> <span style={{fontFamily:'Prompt'}}>{data.donorName}</span></h1>
                    <img class='responsive' src={data.urlBase64Img} style={{display:'block',margin:'auto' ,marginTop:'1em',maxWidth:"1000px",width:'400px',height:'auto'}}/>

                    <h1 style={{fontSize:'25px',fontFamily:'Prompt',marginTop:'1em',fontWeight:'800'}}>รายละเอียด</h1>
                    <textarea style={{fontSize:'25px',fontFamily:'Prompt',width:'95%',height:'250px',resize:'none',background:'transparent',}} value={data.details} disabled></textarea><br />
                    <li style={{fontSize:'25px',fontFamily:'Prompt'}}>จำนวน {data.amount} ทุนละ {data.capital}</li>
                    <li style={{fontSize:'25px',fontFamily:'Prompt'}}>วันปิดรับสมัคร {data.closeDate}</li>

                    <br/><button className="btn btn-danger" onClick={()=>openPDF(data.urlBase64Details)}>PDF</button><br /><br />
                    <h1 style={{fontSize:'30px',fontFamily:'Prompt',fontWeight:'800'}}>เอกสารที่ใช้ในการสมัคร</h1>
                    <ul style={{fontSize:'20px',fontFamily:'Prompt',color:'#680C07'}}>
                        {temp.map((data)=>data)}
                    </ul>
                    <div id="boxDetails" >
                        <button type="button" className="btn" onClick={()=>navigate(-1)} style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800'}}>ย้อนกลับ</button>
                        {(()=>{
                            if(data.status==="recruit"){
                                if(role==="admin"){
                                    return(<>
                                        <Link to={"/CreateCapital/"+data.scholarshipId}><button className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>แก้ไขทุน admin</button></Link>
                                        <button data-bs-toggle="modal" data-bs-target="#myModal-DeleteScholarship"  className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>ลบทุน admin</button>
                                        {<ViewConfirm 
                                            modalId={"myModal-DeleteScholarship"} 
                                            heading={"ลบทุน"}
                                            body={(<><p>คุณยืนยันที่จะลบทุนนี้หรือไม่</p></>)}
                                            functionConfirm ={()=>deleteScholarship()} 
                                            closeId={"myModal-DeleteScholarship-close"}
                                            load={loadModal}
                                        />}
                                        <Link to={"/CheckApplicants/"+data.scholarshipId}><button className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>คัดเลือกผู้สมัคร admin</button></Link>
                                        {/*(()=>{
                                            if(remainingTime<0){
                                                return <Link to={"/CheckApplicants/"+data.scholarshipId}><button className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>คัดเลือกผู้สมัคร admin</button></Link>
                                            }
                                            else{
                                                return <button className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}} disabled>คัดเลือกผู้สมัคร(จะใช้ได้เมื่อหมดเวลารับสมัคร)</button>
                                            }
                                        })()*/}

                                    </>)
                                }
                                if(role==="user"){
                                    if(!apply && remainingTime<0){
                                        return <button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}} disabled={remainingTime>0?"":"disabled"}>{apply?"ดูเอกสารที่ส่งสมัคร":remainingTime>0?"แนบเอกสารการสมัคร":"หมดเวลารับสมัครแล้ว"}</button>
                                    }
                                    return(<>
                                        <Link to={"/ApplyCapital/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>{apply?"ดูเอกสารที่ส่งสมัคร":remainingTime>0?"แนบเอกสารการสมัคร":"หมดเวลารับสมัครแล้ว"}</button></Link>
                                    </>)

                                }
                            }
                            else if(data.status==="interview"){
                                if(role==="admin"){
                                    return(<>
                                        <Link to={"/CheckApplicants/"+data.scholarshipId}><button className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>คัดเลือกผู้สมัคร admin</button></Link>
                                        <Link to={"/RateAdmin/"+data.scholarshipId}><button type="button"className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>แก้ไขวันนัดสัมภาษณ์</button> </Link>
                                        <Link to={"/PassList/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>ดูรายชื่อผู้มีสิทธิสัมภาษณ์</button></Link>
                                    </>)
                                }
                                return <Link to={"/PassList/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>ดูรายชื่อผู้มีสิทธิสัมภาษณ์</button></Link>
                            }else if(data.status==="anouncement"){
                                if(role==="admin"){
                                    return(<>
                                        <Link to={"/CheckAnouncement/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}} >ยืนยันผู้ผ่านการสัมภาษณ์ใหม่</button></Link>
                                        <Link to={"/PassList/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>ดูรายชื่อผู้ได้รับทุน</button></Link>
                                    </>)
                                }
                                return <Link to={"/PassList/"+data.scholarshipId}><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'Prompt',fontWeight:'800',marginLeft:"5px"}}>ดูรายชื่อผู้ได้รับทุน</button></Link>
                            }
                        })()}
                     </div>
                </>)
            })}
        </div>
    </>)
}
export default Details;
/* <div>
                <h1>{data.name}</h1>
                <div >
                    <img src={data.img} style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"50%"}} ></img>
                </div>

                <h2>รายละเอียด</h2>
                {data.detail.split('\n').map(str => <p>{str}</p>)}

                <h3>เอกสารรายละเอียดของทุน</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PDF_icon.svg/896px-PDF_icon.svg.png" style={{height:"50px",width:"50px"}}></img>

                <h3>เอกสารที่ใช้ในการสมัคร</h3>
                <ul>
                    {data.evidence.map(str => <li>{str}</li>)}
                </ul>

                <div style={{display:"block",marginLeft:"auto",marginRight:"auto",width:"50%"}}>
                    <Link to="/TotalCapital"><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'prompt',fontWeight:'800'}}>ย้อนกลับ</button></Link>
                    {(()=>{
                        if(status=="recruit"){
                            return <Link to="/ApplyCapital"><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'prompt',fontWeight:'800'}}>แนบเอกสารการสมัคร</button></Link>
                        }
                        else if(status=="interview"){
                            return <Link to="/PassList"><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'prompt',fontWeight:'800'}}>ดูรายชื่อผู้มีสิทธิสัมภาษณ์</button></Link>
                        }else if(status=="anouncement"){
                            return <Link to="/PassList"><button type="button" className="btn" style={{color:"white",backgroundColor:"#680C07",fontFamily:'prompt',fontWeight:'800'}}>ดูรายชื่อผู้ได้รับทุน</button></Link>
                        }
                    })()}
                </div>



            </div>*/ 

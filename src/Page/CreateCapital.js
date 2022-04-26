import React, { useState , useEffect ,useContext} from 'react'
import { Navigate,useParams,useNavigate } from 'react-router-dom'
import axios from "axios";
import Select from 'react-select'
import Creatable, { useCreatable } from 'react-select/creatable';
import CreatableSelect from 'react-select/creatable';
import ViewConfirm from '../View/ViewConfirm';
import ViewLoading from "../View/ViewLoading";
import { Modal } from 'bootstrap';
import { AuthContext } from "../Auth/Auth";
const CreateCapital = () => {
    const { scholarshipId } = useParams();
    const {role} = useContext(AuthContext)
    const navigate =useNavigate()

    const [updateSucceed,setUpdateSucceed] = useState(false)
    const [allDonorName,setAllDonorName] = useState([])
    const [loadModal,setLoadModal] = useState(false)

    const viewConfirm = ViewConfirm;
    const [loading,setLoading]=useState(true)
    const [loadingDonorName,setLoadingDonorName]=useState(true)

    /*const modalRef = useRef()
    
    const showModal = () => {
        const modalEle = modalRef.current
        const bsModal = new Modal(document.getElementById("exampleModal"), {
            backdrop: 'static',
            keyboard: false
        })
        bsModal.show()
    }
    const hideModal = () => {
        const modalEle = modalRef.current
        const bsModal= Modal.getInstance(modalEle)
        bsModal.hide()
    }*/

    const [data,setData] = useState({
        scholarshipName:"",
        academicYear:null,
        term:"",
        donorName:"",
        details:"",
        amount:null,
        capital:null,
        closeDate:"",
        applicantDocuments:{
            idCard:false,
            houseRegistration:false,
            essay:false,
            nisitPicture:false,
            housePicture:false,
            studyResults:false,
            diseaseEffects:false
        },
        urlBase64Img:"",
        urlBase64Details:"",
    })
    const dataToUrlBase64 =(name,file)=>{
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function () {
            document = reader.result;
            changeData(name,document);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            changeData(name,"#");
        };
    }
    const setFilePdf =(e)=> {
        if(e.target.files[0].size > 10000000){
            alert("File is too big!"+e.target.files[0].size);
            return null;
        }
        else{
            dataToUrlBase64("urlBase64Details",e.target.files[0])
            return e.target.value;
        }
    }
    const changeFileImg =(e)=> {
        if(e.target.files[0].size > 10000000){
            alert("File is too big!"+e.target.files[0].size);
            return null;
        }
        else{
            dataToUrlBase64("urlBase64Img",e.target.files[0])
            return e.target.value;
        }
    }
    const changeData =(name,value) =>{
        setData(data => ({
                ...data,
                [name]: value
        }));
    }
    const changeapplicantDocuments=(name,value) =>{
        let tmp = data.applicantDocuments
        tmp[name] = value
        //console.log(tmp);
        changeData('applicantDocuments',tmp)
        //console.log(data.applicantDocuments);
    }
    const confirmCreate=() =>{
        setLoadModal(true)
        const bsModal= Modal.getInstance(document.getElementById("myModal-CreateCapital"))
        const tmpData={
            scholarshipId:scholarshipId,
            scholarshipName:data.scholarshipName,
            academicYear:data.academicYear,
            term:data.term,
            donorName:data.donorName,
            details:data.details,
            amount:data.amount,
            capital:data.capital,
            closeDate:data.closeDate,
            applicantDocuments:JSON.stringify(data.applicantDocuments),
            urlBase64Img:data.urlBase64Img,
            urlBase64Details:data.urlBase64Details,
        }
        if(scholarshipId==="new"){
            axios.post("http://localhost:3001/addTotalScholarship",tmpData).then((res)=>{
                if(res.data.status==="ok"){
                    //alert(res.data.message)
                    bsModal.hide()
                    window.location = "/TotalScholarship/all/all/1"
                }
                else{
                    alert(res.data.message)
                    bsModal.hide()
                }
            },(err)=>{
                console.log(err);
            })
        }else{
            axios.put("http://localhost:3001/updateScholarshipForId",tmpData).then((res)=>{
                if(res.data.status==="ok"){
                    bsModal.hide()
                    navigate(-1)
                    setUpdateSucceed(true)
                }
                else{
                    alert(res.data.message)
                    bsModal.hide()
                }
            },(err)=>{
                console.log(err);
                bsModal.hide()
            })

        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const bsModal = new Modal(document.getElementById("myModal-CreateCapital"), {
            //backdrop: 'static',
            //keyboard: false
        })
        bsModal.show()
    }
    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return(binary)
    }
    useEffect(()=>{
        if(scholarshipId!=="new"){
            console.log(scholarshipId);
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
                    setData(response.data.contact[0]);
                    setLoading(false)
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
            })
        }else{
            setLoading(false)
        }
        axios.get("http://localhost:3001/getAllDonorName")
            .then((response) => {
                if(response.data.status==="ok"){
                    response.data.contact.map((data,index)=>{
                        response.data.contact[index] = {value: data.donorName, label: data.donorName}
                    })
                    setAllDonorName( response.data.contact)
                    setLoadingDonorName(false)
                }else{
                    alert(response.data.message);
                }
            },(err)=>{
                alert("ไม่สามารถ get(http://localhost:3001/getAllDonorName)")
            })

    },[])

    if(role!=="admin"){
        navigate(-1)
    }
    if(updateSucceed){
        return <Navigate to={"/Details/"+scholarshipId}/>;
    }
    if(loading || loadingDonorName){
        return <ViewLoading/>
    }
    return(<>
        <div>
            <form style={{width:"80%",marginTop:'120px',marginLeft:'10px',fontFamily:'Prompt'}} onSubmit={handleSubmit} class="was-validated">
                <h1 style={{fontWeight:'bold',marginTop:'120px',color:"#680C07",marginBottom:'20px'}}>สร้างประกาศทุนการศึกษา</h1>
                <div class="input-group mb-3">
                    <span class="input-group-text">ชื่อทุนการศึกษา :</span>
                    <input type="text" class="form-control" name="scholarshipName" value={data.scholarshipName} onChange={(e)=>changeData(e.target.name,e.target.value)} placeholder="ชื่อทุนการศึกษา" required/>
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">ประจำปีการศึกษา :</span>
                    <input type="number" min="2564" max="2999" class="form-control" name="academicYear" value={data.academicYear} onChange={(e)=>changeData(e.target.name,e.target.value)} placeholder="ประจำปีการศึกษา" required/>
                    <span class="input-group-text">ภาคการเรียนการสอน</span>
                    <div class="input-group-text">
                        <input type="radio" value="ภาคต้น" class="form-check-input" name="term" checked={data.term==="ภาคต้น"?"checked":""} onChange={(e)=>changeData(e.target.name,"ภาคต้น")} required/>
                        <label>&nbsp;ภาคต้น&nbsp;</label>
                    </div>
                    <div class="input-group-text">
                        <input type="radio" value="ภาคปลาย" class="form-check-input" name="term" checked={data.term==="ภาคปลาย"?"checked":""} onChange={(e)=>changeData(e.target.name,"ภาคปลาย")} required/>
                        <label>&nbsp;ภาคปลาย&nbsp;</label>
                    </div>
                </div>

                <div class="input-group mt-3">
                    <span class="input-group-text">ชื่อผู้มอบทุน</span>
                    {/*<CreatableSelect className="form-control" style={{color: "red"}} options={allDonorName} name="donorName" value={{value: data.donorName, label: data.donorName}} onBlur={(e)=>console.log(e)} onChange={(e)=>changeData("donorName",e.value)} />
                    <span class="input-group-text" onClick={()=>changeData("donorName","")}>ลบ</span>*/}
                    <input type="text" class="form-control" value={data.donorName} onChange={(e)=>changeData("donorName",e.target.value)} list="donorName" placeholder="ผู้บริจาคทุนการศึกษา"  required/>
                    <datalist id="donorName">
                        {allDonorName.map((donorName)=>{
                            return(<>
                                <option value={donorName.value}/>
                            </>)
                        })}
                    </datalist>
                </div>
                <div class="input-group mt-3">
                    <span class="input-group-text">รูปประกอบ (jpg,gif,png)</span>
                    <div class="form-control">
                        <input class="form-control" type="file" accept="image/gif, image/jpeg, image/png" onChange={(e)=> e.target.value = changeFileImg(e)} required={data.urlBase64Img?"":"required"}/>
                        <img src= {data.urlBase64Img} class="mx-auto d-block"width="500"/>
                    </div>
                </div>
               

                <div class="input-group mt-3">
                    <span class="input-group-text">รายละเอียดทุนการศึกษา</span>
                    <textarea class="form-control" name="details" value={data.details} onChange={(e)=>changeData(e.target.name,e.target.value)} rows="10" required></textarea>
                </div>

                <div class="input-group mt-3">
                    <span class="input-group-text">จำนวนที่รับสมัคร</span>
                    <input type="number" min="0" class="form-control"name="amount" value={data.amount} onChange={(e)=>changeData(e.target.name,e.target.value)} placeholder="จำนวนที่รับสมัคร" required/>
                    <span class="input-group-text">ทุนละ</span>
                    <input type="number" min="0" class="form-control"name="capital" value={data.capital} onChange={(e)=>changeData(e.target.name,e.target.value)} placeholder="ทุนละกี่บาท" required/>
                    <span class="input-group-text">รวมเป็นเงิน{data.amount*data.capital}บาท</span>
                    <span class="input-group-text">วันปิดรับสมัคร</span>
                    <input type="datetime-local" class="form-control"name="closeDate" value={data.closeDate} onChange={(e)=>changeData(e.target.name,e.target.value)} required/>
                </div>

                <div class="input-group mt-3" >
                    <span class="input-group-text">ไฟล์เอกสารรายละเอียดทุนการศึกษา (pdf)</span>
                    <div class="form-control">
                        <input class="form-control" accept="application/pdf" type="file" onChange={(e)=>setFilePdf(e)} required={data.urlBase64Details?"":"required"}/>
                        <iframe src={data.urlBase64Details} width="100%" height="800px"/>
                    </div>
                </div>

                <div class="input-group mt-3">
                    <span class="input-group-text" >เอกสารที่ต้องใช้ในการสมัคร</span>
                    <div class="form-control" >
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="idCard" checked={data.applicantDocuments.idCard?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.idCard)} />
                            <label>&nbsp;สำเนาบัตรประจำตัวประชาชนของผู้สมัคร&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="houseRegistration" checked={data.applicantDocuments.houseRegistration?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.houseRegistration)}/>
                            <label>&nbsp;สำเนาทะเบียนบ้านของผู้สมัคร&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="essay" checked={data.applicantDocuments.essay?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.essay)} />
                            <label>&nbsp;แนบไฟล์เรียงความ&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input"  name="nisitPicture" checked={data.applicantDocuments.nisitPicture?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.nisitPicture)} />
                            <label>&nbsp;แนบไฟล์รูปถ่ายนิสิต&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="housePicture" checked={data.applicantDocuments.housePicture?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.housePicture)} />
                            <label>&nbsp;แนบไฟล์รูปถ่ายบ้านที่พักอาศัยตามภูมิลำเนา&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="studyResults" checked={data.applicantDocuments.studyResults?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.studyResults)}/>
                            <label>&nbsp;แนบไฟล์ใบรายงานผลการศึกษา (Transcript) ปริ๊นจากเวปได้&nbsp;</label>
                        </div>
                        <div class="input-group-text">
                            <input type="checkbox" class="form-check-input" name="diseaseEffects" checked={data.applicantDocuments.diseaseEffects?"checked":""} onChange={(e)=>changeapplicantDocuments(e.target.name,!data.applicantDocuments.diseaseEffects)}/>
                            <label>&nbsp;แนบไฟล์ผลกระทบจากการระบาดของโรค&nbsp;</label>
                        </div>
                    </div>
                    
                </div>

                <button type="submit" class="btn" style={{color:"white",backgroundColor:"#680C07",margin:'15px',alignItems:'center',textAlign:'center'}} >{scholarshipId==="new"?"สร้างทุน":"แก้ไขข้อมูลทุน"}</button>
                {<ViewConfirm 
                    modalId={"myModal-CreateCapital"} 
                    heading={scholarshipId==="new"?"สร้างทุน":"แก้ไขข้อมูลทุน"}
                    body={(<><p>{scholarshipId==="new"?"คุณยืนยันที่จะสร้างทุนหรือไม่":"คุณยืนยันที่จะแก้ไขข้อมูลทุนหรือไม่"}</p></>)}
                    functionConfirm ={()=>confirmCreate()} 
                    closeId={"myModal-CreateCapital-close"}
                    load={loadModal}
                />}
                
            </form>
        </div>
    </>)
}
export default CreateCapital;

  /*{
            scholarshipName:data.scholarshipName,
            academicYear:data.academicYear,
            term:data.term,
            donorName:data.donorName,
            details:data.details,
            amount:data.amount,
            capital:data.capital,
            closeDate:data.closeDate,
            idCard:data.idCard,
            houseRegistration:data.houseRegistration,
            essay:data.essay,
            nisitPicture:data.nisitPicture,
            housePicture:data.housePicture,
            studyResults:data.studyResults,
            diseaseEffects:data.diseaseEffects,
            fileImg:data.fileImg
          }*/
        /*let formData = new FormData();
        formData.append('scholarshipName',  data.scholarshipName);
        formData.append('academicYear',  data.academicYear);
        formData.append('term',  data.term);
        formData.append('donorName',  data.donorName);
        formData.append('details',  data.details);
        formData.append('amount',  data.amount);
        formData.append('capital',  data.capital);
        formData.append('closeDate',  data.closeDate);
        formData.append('idCard',  data.idCard);
        formData.append('houseRegistration',  data.houseRegistration);
        formData.append('essay',  data.essay);
        formData.append('nisitPicture',  data.nisitPicture);
        formData.append('housePicture',  data.housePicture);
        formData.append('studyResults',  data.studyResults);
        formData.append('diseaseEffects',  data.diseaseEffects);
        formData.append('file',  data.fileImg);     
        formData.append('file',  data.fileDetails);       
        const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }
        axios.post("http://localhost:3001/addScholarship",formData,config).then((res)=>{
            console.log(res);
            setSucceed(true)
        },(err)=>{
            console.log(err);
        })*/
/*<h3>ชื่อทุนการศึกษา</h3>
                <input type="text"></input>

                <h3>ประจำปีการศึกษา</h3>
                <input type="number" min="2564" max="2999"></input>
                    <input type="radio" value="ภาคต้น" name="ภาคเรียน"/>
                    <label >ภาคต้น</label>
                    <input type="radio"  value="ภาคปลาย" name="ภาคเรียน"/>
                    <label>ภาคปลาย</label>
                    <input type="radio"  value="ภาคฤดูร้อน" name="ภาคเรียน"/>
                    <label>ภาคฤดูร้อน</label>

                <h3>ชื่อผู้มอบทุน</h3>
                <input type="text"></input>

                <h3>รูปประกอบ</h3>
                <input type="file"></input>
                <div style={{width:"60%",height:"400px",backgroundColor:"gray"}}>
                    <image href="#"></image> 
                </div>

                <h3>รายละเอียดทุนการศึกษา</h3>
                <textarea rows="10" cols="100">
                </textarea>

                <h3>จำนวนที่รับสมัคร</h3>
                <input type="number" min="0"></input>

                <h3>วันปิดรับสมัคร</h3>
                <input type="datetime-local"></input>

                <h3>ไฟล์เอกสารรายละเอียดทุนการศึกษา</h3>
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/PDF_icon.svg/896px-PDF_icon.svg.png" style={{height:"50px",width:"50px"}}></img>
                <input type="file"></input>

                <h3>เอกสารที่ต้องใช้ในการสมัคร</h3>
                <input type="checkbox"></input>
                <label>ประวัติส่วนตัว</label><br/>
                <input type="checkbox"></input>
                <label>ประวัติครอบครัว</label><br/>
                <input type="checkbox"></input>
                <label>รายได้ของผู้ขอรับทุน</label><br/>
                <input type="checkbox"></input>
                <label>สำเนาบัตรประจำตัวประชาชนของผู้สมัคร</label><br/>
                <input type="checkbox"></input>
                <label>สำเนาทะเบียนบ้านของผู้สมัคร</label><br/>
                <input type="checkbox"></input>
                <label>แนบไฟล์เรียงความ</label><br/>
                <input type="checkbox"></input>
                <label>แนบไฟล์รูปถ่ายนิสิต</label><br/>
                <input type="checkbox"></input>
                <label>แนบไฟล์รูปถ่ายบ้านที่พักอาศัยตามภูมิลำเนา</label><br/>
                <input type="checkbox"></input>
                <label>แนบไฟล์ใบรายงานผลการศึกษา (Transcript) ปริ๊นจากเวปได้</label><br/>
                <input type="checkbox"></input>
                <label>แนบไฟล์ผลกระทบจากการระบาดของโรค</label><br/>*/
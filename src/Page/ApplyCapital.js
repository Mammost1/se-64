import React, { useState,useContext,useEffect } from 'react'
import {Link,useParams,useNavigate } from 'react-router-dom'
import Profile from './Profile'
import { AuthContext } from '../Auth/Auth';
import axios from 'axios';
import { Modal } from 'bootstrap';
import ViewLoading from '../View/ViewLoading';
import ViewProfile from '../View/ViewProfile';
import ViewConfirm from '../View/ViewConfirm';
const ApplyCapital = () => {
    const {checkLogout,email,name,picture,userId,role} = useContext(AuthContext);
    const {scholarshipId} = useParams();
    const [scholarshipData,setScholarshipData] = useState([])
    const [loading ,setLoading] = useState(true)
    const [correct,setCorrect] = useState("disabled")
    const [correctDocuments,setCorrectDocuments] = useState("")
    const [checkApply,setcheckApply] = useState(false)
    const [realTime,setRealTime] = useState(new Date())
    const [remainingTime,setRemainingTime] = useState(0)

    const [recruitStatus,setRecruitStatus] = useState("")
    const [loadModal ,setLoadModal] = useState(false)
    const navigate = useNavigate()

    const [myProfile,setMyProfile] = useState({
        myFirstName:"",
        myLastName:"",
        myAge:null,
        studentID:"",
        class:null,
        sector:"",
        major:"",
        advisor:"",
        gpa:null,
        myPhone:"",
        myAddress:""
    })
    const [familyProfile,setFamilyProfile] = useState({
        fatherFirstName:"",
        fatherLastName:"",
        fatherAge:"",
        fatherAlive:"",
        fatherOccupation:"",
        fatherIncome:"",
        fatherWorkplace:"",
        fatherAddress:"",
        fatherPhone:"",
        motherFirstName:"",
        motherLastName:"",
        motherAge:"",
        motherAlive:"",
        motherOccupation:"",
        motherIncome:"",
        motherWorkplace:"",
        motherAddress:"",
        motherPhone:"",
        maritalStatus:"",
        sibling:[{
            firstName:"",
            lastName:"",
            occupation:""
        }],
    })
    const [incomeProfile,setIncomeProfile] = useState({
        myIncome:null,
        giver:"",
        patronRelevant:"",
        patronOccupation:"",
        patronWorkplace:"",
        patronPhone:"",
        patronPosterChild:"",
        partTime:"",
        partTimeWeeklyIncome:null,
        partTimeMonthlyIncome:null,
        partTimeDetails:"",
        borrowingFunds:null,
    })


    const [documents,setDocuments] = useState({
        idCard:"",
        houseRegistration:"",
        essay:"",
        nisitPicture:"",
        housePicture:"",
        studyResults:"",
        diseaseEffects:""
    })

    
    const updateSibling = (e,index) => {
        let newSibling = [...familyProfile.sibling]; 
        newSibling[index][e.target.name] = e.target.value;    
        changeFamilyProfile("sibling",newSibling);
    }
    const addSibling = () => {
        let newSibling = [...familyProfile.sibling]; 
        newSibling.push({
            firstName:"",
            lastName:"",
            occupation:""
        });    
        changeFamilyProfile("sibling",newSibling);
    }
    const delSibling =(index)=> {
        let newSibling = [...familyProfile.sibling]; 
        newSibling.splice(index, 1);    
        changeFamilyProfile("sibling",newSibling);
    }

    const changeMyProfile =(name,value) =>{
        setMyProfile(myProfile => ({
                ...myProfile,
                [name]: value
        }));
    }
    const changeFamilyProfile =(name,value) =>{
        setFamilyProfile(familyProfile => ({
                ...familyProfile,
                [name]: value
        }));
    }
    const changeIncomeProfile =(name,value) =>{
        setIncomeProfile(incomeProfile => ({
                ...incomeProfile,
                [name]: value
        }));
    }
    const changeDocuments =(name,value) =>{
        setDocuments(documents => ({
                ...documents,
                [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setCorrect("disabled")
        console.log(userId);
        console.log(myProfile);
        console.log(familyProfile);
        console.log(incomeProfile);
        axios.put("http://localhost:3001/updateUserProfile", { 
            userId:userId,
            myProfile : JSON.stringify(myProfile),
            familyProfile : JSON.stringify(familyProfile),
            incomeProfile : JSON.stringify(incomeProfile)
            }).then((response) => {
                console.log(response);
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/userProfile)")
            }
        );
    }

    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        //console.log(binary);
        return(binary)
    }

    const dataToUrlBase64 =(name,file)=>{
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function () {
            document = reader.result;
            changeDocuments(name,document);
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            changeDocuments(name,"#");
        };
    }

    const setFilePdf =(name,e)=> {
        console.log(e.target.files[0]);
        if(e.target.files[0].type!=="application/pdf"){
            alert("กรุณาใส่ file PDF");
        }
        else if(e.target.files[0].size > 10000000){
            alert("File is too big!"+e.target.files[0].size);
        }
        else{
            dataToUrlBase64(name,e.target.files[0])
        }
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
        return d+"วัน"+ pad(h)+"ชั่วโมง"+ pad(m)+"นาที";
    }
    const confirmApply=() =>{
        setLoadModal(true)
        const bsModal= Modal.getInstance(document.getElementById("myModal-CreateCapital"))
        const tmpData = {
            scholarshipId:scholarshipId,
            userId:userId,
            recruitStatus:"รอ",
            myProfile:JSON.stringify(myProfile),
            familyProfile:JSON.stringify(familyProfile),
            incomeProfile:JSON.stringify(incomeProfile),
            idCard:documents.idCard,
            houseRegistration:documents.houseRegistration,
            essay:documents.essay,
            nisitPicture:documents.nisitPicture,
            housePicture:documents.housePicture,
            studyResults:documents.studyResults,
            diseaseEffects:documents.diseaseEffects
        }
        if(checkApply){
            axios.put("http://localhost:3001/updateApplyScholarship",tmpData)
            .then((response) =>{
                console.log(response.data);
                if(response.data.status=== "ok"){
                    //alert(response.data.message)
                    window.location = "/Details/"+scholarshipId
                    //bsModal.hide()
                    //navigate(-1)
                }else{
                    alert(response.data.message) 
                    setLoadModal(false) 
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/updateApplyScholarship)")
                setLoadModal(false)
            });
        }
        else{
            axios.post("http://localhost:3001/applyScholarship",tmpData)
            .then((response) =>{
                console.log(response.data);
                if(response.data.status=== "ok"){
                    //alert(response.data.message)
                    //bsModal.hide()
                    window.location = "/Details/"+scholarshipId
                    //navigate(-1)
                }else{
                    alert(response.data.message)  
                    setLoadModal(false)
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/applyScholarship)")
                setLoadModal(false)
            });
        }    
    }
    const applySubmit = (e) => {
        e.preventDefault();
        const bsModal = new Modal(document.getElementById("myModal-ApplyCapital"), {
            //backdrop: 'static',
            //keyboard: false
        })
        bsModal.show()
    }

    const getProfile = () => {
        axios.post("http://localhost:3001/userProfile",{
            userId:userId
        })
        .then((response) =>{
            console.log(response.data);
            if(response.data.status=== "ok"){
                setMyProfile(JSON.parse(response.data.myProfile))
                setFamilyProfile(JSON.parse(response.data.familyProfile))
                setIncomeProfile(JSON.parse(response.data.incomeProfile))
            }else{
                setCorrect("");      
            }
            setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/userProfile)")
        });
    };
    const getHistoryApply = () => {
        axios.post("http://localhost:3001/checkApplyScholarship", { 
            scholarshipId :scholarshipId,
            userId:userId
            }).then((response) => {
                if(response.data.status==="ok"){
                    if(response.data.message==="สมัครทุนนี้แล้ว"){
                        //alert(response.data.message)
                        //console.log(response.data);
                        setMyProfile(JSON.parse(response.data.contact.myProfile))
                        setFamilyProfile(JSON.parse(response.data.contact.familyProfile))
                        setIncomeProfile(JSON.parse(response.data.contact.incomeProfile))
                        setDocuments({
                            idCard:bufferToBase64(response.data.contact.idCard.data),
                            houseRegistration:bufferToBase64(response.data.contact.houseRegistration.data),
                            essay:bufferToBase64(response.data.contact.essay.data),
                            nisitPicture:bufferToBase64(response.data.contact.nisitPicture.data),
                            housePicture:bufferToBase64(response.data.contact.housePicture.data),
                            studyResults:bufferToBase64(response.data.contact.studyResults.data),
                            diseaseEffects:bufferToBase64(response.data.contact.diseaseEffects.data)
                        })
                        setCorrectDocuments("disabled")
                        if(response.data.contact.recruitStatus==="รอ" || response.data.contact.recruitStatus==="เอกสารไม่ถูกต้อง"){
                            setcheckApply(true)
                        }
                        setRecruitStatus(response.data.contact.recruitStatus)
                        setLoading(false)
                    }else{
                        //alert(response.data.message)
                        getProfile()
                    }
                }else{
                    alert(response.data.message)
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/checkApplyScholarship)")
            }
        );
    };

    useEffect(()=>{
        console.log(scholarshipId);
        axios.post("http://localhost:3001/scholarshipForId",{
            scholarshipId:scholarshipId
        })
        .then((response) => {
            //console.log(response.data[0]);
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                response.data.contact[0].applicantDocuments = JSON.parse(response.data.contact[0].applicantDocuments)
                response.data.contact[0].urlBase64Img = bufferToBase64(response.data.contact[0].urlBase64Img.data)
                response.data.contact[0].urlBase64Details = bufferToBase64(response.data.contact[0].urlBase64Details.data)
                setScholarshipData(response.data.contact);
                setRemainingTime(new Date(response.data.contact[0].closeDate)-new Date() )
                const interval = setInterval(() => {
                    let date = new Date()
                    setRealTime(date)
                    setRemainingTime(new Date(response.data.contact[0].closeDate)-date )

                    /*if(new Date(response.data.contact[0].closeDate)-date<0){
                        return clearInterval(interval);
                    }*/
                    //clearInterval(interval);
                }, 1000);
                getHistoryApply();
            }else{
                alert(response.data.message);
                setLoading(false);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })
    },[])
    if(role!=="user" || remainingTime<0){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
    <div>
        <div style={{width:'30%',fontFamily:'Prompt',float:'right',color:"#680C07"}}>
                {/* <h1>{"เวลาปัจจุบัน :"+realTime.toLocaleString("th-TH", { timeZone: "Asia/Bangkok"})}</h1>
                <h1>{"เวลาหมด :"+new Date(scholarshipData[0].closeDate).toLocaleString("th-TH", { timeZone: "Asia/Bangkok"  })}</h1>                 */}
                <h1  style={{fontSize: 20}} >{"หมดเวลารับสมัคร : "+ dhm(remainingTime)}</h1>
                <h1 style={{fontSize: 20}}>{checkApply?"คุณได้สมัครทุนนี้แล้ว":"คุณไม่ได้สมัครทุนนี้"}</h1>
        </div> 
        {/*<h1>{"เวลาปัจจุบัน :"+realTime.toLocaleString("th-TH", { timeZone: "Asia/Bangkok"  })}</h1>
        <h1>{"เวลาหมด :"+new Date(scholarshipData[0].closeDate).toLocaleString("th-TH", { timeZone: "Asia/Bangkok"  })}</h1>
            <h1>{"เหลือเวลา : "+dhm(remainingTime)}</h1>*/}
        <h2 style={{fontFamily:'Prompt',color:"#680C07",fontWeight:'800',marginTop:'120px'}}>การแนบเอกสารสมัคร</h2>
            {scholarshipData.map((data)=>{
                return(<>
                    <h1 style={{fontFamily:'Prompt',marginTop:'0.5em',fontWeight:'800',color:"#680C07"}}><u>ชื่อ {data.scholarshipName} ประจำปี {data.academicYear}  {data.term}</u></h1>
                    <h1 style={{fontSize:'30px'}}><span style={{fontFamily:'Prompt',fontWeight:'800',color:"#680C07"}}>ผู้บริจาค</span> <span style={{fontFamily:'Prompt',color:"#680C07"}}>{data.donorName}</span></h1>
                    <img src={data.urlBase64Img} style={{display:'block',margin:'auto' ,marginTop:'1em',width:"30%",height:'auto'}}/>
                </>)
            })}
            {<ViewProfile 
                key={userId}
                myProfile={myProfile}
                familyProfile={familyProfile}
                incomeProfile={incomeProfile}
                updateSibling={updateSibling}
                addSibling={addSibling}
                delSibling={delSibling}
                changeMyProfile={changeMyProfile}
                changeFamilyProfile={changeFamilyProfile}
                changeIncomeProfile={changeIncomeProfile}
                handleSubmit={handleSubmit}
                correct={correct}
                setCorrect={setCorrect}

                checkPart4={true}
                correctDocuments={correctDocuments}
                applySubmit={applySubmit}
                scholarshipData={scholarshipData}
                setFilePdf={setFilePdf}
                documents={documents}
                setCorrectDocuments={setCorrectDocuments}
                checkApply={remainingTime<0 && recruitStatus!=="เอกสารไม่ถูกต้อง"?null:checkApply}
        />}

        {<ViewConfirm 
            modalId={"myModal-ApplyCapital"} 
            heading={checkApply?"ส่งเอกสารการสมัครใหม่":"สมัคร"}
            body={(<><p>{checkApply?"คุณยืนยันที่จะส่งเอกสารการสมัครใหม่หรือไม่":"คุณยืนยันที่สมัครทุนหรือไม่"}</p></>)}
            functionConfirm ={()=>confirmApply()} 
            closeId={"myModal-ApplyCapital-close"}
            load={loadModal}
        />}
                
        </div>
    </>)
}
export default ApplyCapital;

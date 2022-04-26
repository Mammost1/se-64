import './TotalScoreAdmin.css';
import React,{useState,useEffect,useContext} from 'react';
import { useParams , useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/Auth';
import axios from 'axios';
import ViewProfile from '../View/ViewProfile';
import ViewLoading from '../View/ViewLoading';
const SelectionApplicants = () => {
    const {role} = useContext(AuthContext);
    const {scholarshipId,userId } = useParams();
    const navigate = useNavigate()
    const [loading ,setLoading ] = useState(true)

    const [documents,setDocuments] = useState()
    const [scholarshipData,setScholarshipData]= useState()
    const [applicantsData,setApplicantsData]= useState()

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
        var iframe = "<iframe width='100%' height='100%' src='" + base64 + "'></iframe>"
        var x = window.open();
        x.document.open();
        x.document.write(iframe);   
    }
    const changeComment=(value)=>{
        setApplicantsData(applicantsData => ({
            ...applicantsData,
            adminComment: value
        }))  
    }


    const submitStatus=(recruitStatus)=>{
        let interviewStatus=""
        let anouncementStatus=""
        if(recruitStatus==="ผ่าน" || recruitStatus==="เอกสารไม่ถูกต้อง"){
            interviewStatus="รอ"
            anouncementStatus="รอ"
        }
        else if(recruitStatus==="ไม่ผ่าน"){
            interviewStatus="ไม่ผ่าน"
            anouncementStatus="ไม่ผ่าน"
        }
        axios.put("http://localhost:3001/updateStatusUser",{
            totalHistoryId:applicantsData.totalHistoryId,
            adminComment:applicantsData.adminComment,
            recruitStatus:recruitStatus,
            interviewStatus:interviewStatus,
            anouncementStatus:anouncementStatus
        })
        .then((response) =>{
            console.log(response.data);
            if(response.data.status=== "ok"){
                alert(response.data.message)
                navigate(-1)
            }else{
                alert(response.data.message)  
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/updateStatusUser)")
        }); 
    }

    

    const getHistoryApply = () => {
        axios.post("http://localhost:3001/checkApplyScholarship", { 
            scholarshipId :scholarshipId,
            userId:userId
            }).then((response) => {
                if(response.data.status==="ok"){
                    response.data.contact.myProfile=JSON.parse(response.data.contact.myProfile)
                    response.data.contact.familyProfile=JSON.parse(response.data.contact.familyProfile)
                    response.data.contact.incomeProfile=JSON.parse(response.data.contact.incomeProfile)
                    setDocuments({
                        idCard:bufferToBase64(response.data.contact.idCard.data),
                        houseRegistration:bufferToBase64(response.data.contact.houseRegistration.data),
                        essay:bufferToBase64(response.data.contact.essay.data),
                        nisitPicture:bufferToBase64(response.data.contact.nisitPicture.data),
                        housePicture:bufferToBase64(response.data.contact.housePicture.data),
                        studyResults:bufferToBase64(response.data.contact.studyResults.data),
                        diseaseEffects:bufferToBase64(response.data.contact.diseaseEffects.data)
                    })
                    console.log(response.data.contact);
                    setApplicantsData(response.data.contact)
                    setLoading(false)
                }else{
                    alert(response.data.message)
                }
            },(err)=>{
                alert("ไม่สามารถ post(http://localhost:3001/checkApplyScholarship)")
            }
        );
    };

    useEffect(()=>{
        axios.post("http://localhost:3001/scholarshipForId",{
            scholarshipId:scholarshipId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact);
                response.data.contact[0].applicantDocuments = JSON.parse(response.data.contact[0].applicantDocuments)
                response.data.contact[0].urlBase64Img = bufferToBase64(response.data.contact[0].urlBase64Img.data)
                response.data.contact[0].urlBase64Details = bufferToBase64(response.data.contact[0].urlBase64Details.data)
                setScholarshipData(response.data.contact);
                getHistoryApply();
            }else{
                alert(response.data.message);
                setLoading(false);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })
    },[])
    if(role!=="admin"){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div >
            <h1 style={{fontFamily:'Prompt',fontWeight:'600', color:"#680C07",marginLeft:'20px',marginTop:'120px'}}>{scholarshipData[0].scholarshipName}</h1>
            <h3 style={{fontFamily:'Prompt',fontWeight:'600', color:"#680C07",marginLeft:'20px'}}>{"สถานะ :"+applicantsData.recruitStatus}</h3>
            <ViewProfile 
                key={userId}
                myProfile={applicantsData.myProfile}
                familyProfile={applicantsData.familyProfile}
                incomeProfile={applicantsData.incomeProfile}
                updateSibling={null}
                addSibling={null}
                delSibling={null}
                changeMyProfile={null}
                changeFamilyProfile={null}
                changeIncomeProfile={null}
                handleSubmit={null}
                correct={"disabled"}
                setCorrect={null}

                checkPart4={true}
                correctDocuments={"disabled"}
                applySubmit={null}
                scholarshipData={scholarshipData}
                setFilePdf={null}
                documents={documents}
                setCorrectDocuments={null}
                checkApply={false}
                openPDF={openPDF}
            />
            <h3 style={{marginTop:"2%",fontFamily:'Prompt',fontWeight:'600', color:"#680C07"}}>comment</h3>
            <textarea style={{width:"95%",height:"200px"}} value={applicantsData.adminComment} onChange={(e)=>changeComment(e.target.value)}>

            </textarea>
            <br/>
            <div id="buttonSelectionApplicants" style={{textAlign:"center"}}>
            <button class="btn btn-primary" style={{backgroundColor:"green",margin:'10px'}} onClick={()=>submitStatus("ผ่าน")}>ผ่าน</button>
            <button class="btn btn-primary"style={{backgroundColor:"#FFA900",margin:'10px'}} onClick={()=>submitStatus("เอกสารไม่ถูกต้อง")}>เอกสารไม่ถูกต้อง</button>
            <button class="btn btn-primary"style={{backgroundColor:"red",margin:'10px'}} onClick={()=>submitStatus("ไม่ผ่าน")} >ไม่ผ่าน</button>
            </div>
        </div>
    </>)
}
export default SelectionApplicants;
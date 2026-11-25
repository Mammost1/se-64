import React,{useState,useEffect,useContext} from "react";
import { useParams } from "react-router-dom";
import ViewProfile from "../View/ViewProfile";
import ViewLoading from "../View/ViewLoading";
import { AuthContext} from '../Auth/Auth';
import { useNavigate } from 'react-router-dom'
import axios from "axios";
const ApplicantInformation = () => {
    const {role,userId} = useContext(AuthContext);
    const {scholarshipId, pUserId } = useParams();
    const [loading ,setLoading ] = useState(true)

    const [documents,setDocuments] = useState()
    const [applicantsData,setApplicantsData]= useState()
    const [scholarshipData,setScholarshipData]= useState()

    const navigate = useNavigate()

    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return(binary)
    }

    const getHistoryApply = () => {
        axios.post("http://localhost:3001/checkApplyScholarship", { 
            scholarshipId :scholarshipId,
            userId:pUserId
            }).then((response) => {
                if(response.data.status==="ok"){
                    if(response.data.contact!==undefined){
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
                        alert("ไม่พบข้อมูล")
                        navigate(-1)
                    }
                    
                }else{
                    alert(response.data.message)
                    navigate(-1)
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
            if(response.data.status==="ok"){
                response.data.contact[0].applicantDocuments = JSON.parse(response.data.contact[0].applicantDocuments)
                setScholarshipData(response.data.contact);
                getHistoryApply();
            }else{
                alert(response.data.message);
                navigate(-1)
                setLoading(false);
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/scholarshipForId)")
        })
    },[])
    if(role==="user" && userId!==pUserId){
        navigate(-1)
    }
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div>
            <ViewProfile 
                key={pUserId}
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
            />
        </div>
    </>)
}
export default ApplicantInformation;
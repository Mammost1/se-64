import '../App.css';
import React,{useEffect, useState ,useContext} from 'react';
import axios from 'axios';
import { AuthContext } from '../Auth/Auth';
import ViewProfile from '../View/ViewProfile';
import ViewLoading from '../View/ViewLoading';
const Profile = () => {
    const {checkLogout,email,name,picture,userId,role} = useContext(AuthContext);
    const [correct,setCorrect] = useState("disabled")
    const [loading,setLoading] = useState(true)

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
    const getProfile = () => {
        console.log(userId);
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
    useEffect(() => {
        getProfile();
    }, []);
    if(loading){
        return <ViewLoading/>
    }
    return(<>
            <ViewProfile 
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
                
                checkPart4={false}
                correctDocuments={""}
                applySubmit={null}
                scholarshipData={null}
                setFilePdf={null}
                documents={null}
                setCorrectDocuments={null}
                checkApply={null}
            />
    </>)
}
export default Profile;
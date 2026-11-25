import React,{ useState } from 'react'
import { Routes,Route,BrowserRouter,Link, Navigate ,Redirect } from 'react-router-dom'
import Login from './Page/Login';
import Home from './Page/Home';
import TotalScholarship from './Page/TotalScholarship';
import Details from './Page/Details';
import UserStatus from './Page/UserStatus';
import Introduction from './Page/Introduction';
import Profile from './Page/Profile';
import Mynavbar from './Page/Mynavbar';
import Contact from './Page/Contact';
import InterviewSchedule from './Page/InterviewSchedule';
import Rate from './Page/Rate';
import RateAdmin from './Page/RateAdmin';
import PassList from './Page/PassList';
import CreateCapital from './Page/CreateCapital';
import TopBar from './NavBar/Topbar/TopBar';
import ApplyCapital from './Page/ApplyCapital';
import TotalScoreAdmin from './Page/TotalScoreAdmin';
import CheckHistory from './Page/CheckHistory';
import InterviewAdmin from './Page/InterviewAdmin';
import CheckApplicants from './Page/CheckApplicants';
import SelectionApplicants from './Page/SelectionApplicants';
import ApplicantInformation from './Page/ApplicantInformation';
import CheckAnouncement from './Page/CheckAnouncement';
import EditAdvertImage from './Page/EditAdvertImage';
import SThistory from './Page/SThistory';
import CheckInterviewScore from './Page/CheckInterviewScore';
import Totalcapital from './Page/Totalcapital';
import AddCommittee from './Page/AddCommittee';
import CheckCommittee from './Page/CheckCommittee';
import NoRoutes from './Page/NoRoutes';
import Main from './Page/Main';
import { AuthProvider } from './Auth/Auth';
function App() {
  //const [pathname,setPathname] = useState(window.location.pathname);
  return (
    <AuthProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/Home" element={<Main page={<Home/>}/>} />
        <Route path="/TotalScholarship/:searchName/:searchStatus/:page" element={<Main page={<TotalScholarship/>}/>}/>
        <Route path="/Details/:scholarshipId" element={<Main page={<Details/>}/>} />
        <Route path="/UserStatus" element={<Main page={<UserStatus/>}/>} />
        <Route path="/Introduction" element={<Main page={<Introduction/>}/>}  />
        <Route path="/Profile" element={<Main page={<Profile/>}/>} />
        <Route path="/InterviewSchedule" element={<Main page={<InterviewSchedule/>}/>} />
        <Route path="/InterviewAdmin" element={<Main page={<InterviewAdmin/>}/>} />
        <Route path="/Rate/:scholarshipId/:applicantId" element={<Main page={<Rate/>}/>} />
        <Route path="/RateAdmin/:scholarshipId" element={<Main page={<RateAdmin/>}/>} />
        <Route path="/PassList/:scholarshipId" element={<Main page={<PassList/>}/>} />
        <Route path="/Contact" element={<Main page={<Contact/>}/>} />
        <Route path="/CreateCapital/:scholarshipId" element={<Main page={<CreateCapital/>}/>}  />
        <Route path="/ApplyCapital/:scholarshipId" element={<Main page={<ApplyCapital/>}/>} />
        <Route path="/TotalScoreAdmin" element={<Main page={<TotalScoreAdmin/>}/>} />
        <Route path="/CheckHistory/:searchName/:searchStudentID/:searchMajor/:searchClass" element={<Main page={<CheckHistory/>}/>} />
        <Route path="/CheckApplicants/:scholarshipId" element={<Main page={<CheckApplicants/>}/>} />
        <Route path="/SelectionApplicants/:scholarshipId/:userId" element={<Main page={<SelectionApplicants/>}/>} />
        <Route path="/ApplicantInformation/:scholarshipId/:pUserId" element={<Main page={<ApplicantInformation/>}/>} />
        <Route path="/CheckAnouncement/:scholarshipId" element={<Main page={<CheckAnouncement/>}/>} />
        <Route path="/Home/EditAdvertImage" element={<Main page={<EditAdvertImage/>}/>} />
        <Route path="/SThistory/:checkUserId" element={<Main page={<SThistory/>}/>} />
        <Route path="/CheckInterviewScore/:scholarshipId/:userId" element={<Main page={<CheckInterviewScore/>}/>} />
        <Route path="/Totalcapital/:searchDonorName/:searchAcademicYear" element={<Main page={<Totalcapital/>}/>} />
        <Route path="/AddCommittee" element={<Main page={<AddCommittee/>}/>} />
        <Route path="/CheckCommittee/:committeeUserId" element={<Main page={<CheckCommittee/>}/>} />

        <Route path="*" element={<Main page={<NoRoutes/>}/>} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

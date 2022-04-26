import React,{Component,useContext} from "react";
import '../navbarfix.css'
import {GrArticle,GrDocumentTime,GrNotes} from "react-icons/gr";
import { BsList ,BsNewspaper,BsFillPersonBadgeFill,BsFillCalendarWeekFill,BsWhatsapp,BsJournalText,BsListOl,BsFillPiggyBankFill} from "react-icons/bs";
import { MdRestore} from "react-icons/md";
import { HiOutlineDocumentSearch,HiUserAdd} from "react-icons/hi";
import {CgProfile} from "react-icons/cg";
import { IconContext } from 'react-icons/lib';
import { AuthContext } from "../Auth/Auth";


import {Link } from 'react-router-dom'
import TopBar from "../NavBar/Topbar/TopBar";
const Mynavbar = (props)=>{
      const {userId,role,email,picture} = useContext(AuthContext);
      //const {username,role,picture,userId} = props;
      if(role === "admin"){
        return(<>
        <TopBar username={email} role={role} picture={picture}/>
        <div>
          <nav className="mynavbar">
          <ul className="mynavbar-nav">
            <li className="mynavbar-logo">
              <a href="#" className="mynavbar-link">
                <span className="mynavbar-link-text mynavbar-mynavbar-logo-text">scholarship</span>
              </a>
            </li>       
            <li className="mynavbar-item">
              <a href="/Home" className="mynavbar-link">
                <BsNewspaper color="white" size={50}/>
                <span className="mynavbar-link-text">ข่าวสาร</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/TotalScholarship/all/all/1" className="mynavbar-link">
                <BsList color="white" size={50}/>
                <label className="mynavbar-link-text">ทุนที่เปิดสมัคร</label>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="/Introduction" className="mynavbar-link">
                <HiOutlineDocumentSearch color="white" size={50}/>
                <span className="mynavbar-link-text">ขั้นตอนการยื่นทุน</span>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="/InterviewAdmin" className="mynavbar-link">  
                <BsFillCalendarWeekFill color="white" size={50}/>              
                <span className="mynavbar-link-text">ตารางสัมภาษณ์(admin)</span>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="/CheckHistory/none/none/none/none" className="mynavbar-link">
                <BsJournalText color="white" size={50}/>
                <span className="mynavbar-link-text">ประวัติการขอรับทุน</span>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="/Totalcapital/none/none" className="mynavbar-link">
                <BsFillPiggyBankFill color="white" size={50}/>
                <span className="mynavbar-link-text">ยอดรวมผู้บริจาค</span>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="/AddCommittee" className="mynavbar-link">
                <HiUserAdd color="white" size={50}/>
                <span className="mynavbar-link-text">เพิ่มกรรมการ</span>
              </a>
            </li>
            
            <li className="mynavbar-item">
              <a href="/Contact" className="mynavbar-link">
                <BsWhatsapp color="white" size={50}/>
                <span className="mynavbar-link-text">ช่องทางติดต่อผู้ดูแล</span>
              </a>
            </li>
          </ul> 
        </nav>
      </div>
      </>)
      }
      else if(role === "committee"){
        return(<>
        <TopBar username={email} role={role} picture={picture}/>
        <div>
          <nav className="mynavbar">
          <ul className="mynavbar-nav">
            <li className="mynavbar-logo">
              <a href="#" className="mynavbar-link">
                <span className="mynavbar-link-text mynavbar-mynavbar-logo-text">scholarship</span>
              </a>
            </li>       
            <li className="mynavbar-item">
              <a href="/Home" className="mynavbar-link">
                <BsNewspaper color="white" size={50}/>
                <span className="mynavbar-link-text">ข่าวสาร</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/TotalScholarship/all/all/1" className="mynavbar-link">
                <BsList color="white" size={50}/>
                <label className="mynavbar-link-text">ทุนที่เปิดสมัคร</label>
                
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/InterviewSchedule" className="mynavbar-link">
                <BsFillCalendarWeekFill color="white" size={50}/>
                <span className="mynavbar-link-text">ตารางสัมภาษณ์</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/Contact" className="mynavbar-link">
                <BsWhatsapp color="white" size={50}/>
                <span className="mynavbar-link-text">ช่องทางติดต่อผู้ดูแล</span>
              </a>
            </li>
          </ul> 
        </nav>
      </div>
      </>)
      }
      return(<>
        <TopBar username={email} role={role} picture={picture}/>
        <div >
          <nav className="mynavbar">
          <ul className="mynavbar-nav">
            <li className="mynavbar-logo">
              <a href="#" className="mynavbar-link">
                <span className="mynavbar-link-text mynavbar-mynavbar-logo-text">scholarship</span>
              </a>
            </li>       
            <li className="mynavbar-item">
              <a href="/Home" className="mynavbar-link">
                <BsNewspaper color="white" size={50}/>
                <span className="mynavbar-link-text">ข่าวสาร</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/TotalScholarship/all/all/1" className="mynavbar-link">
                <BsList color="white" size={50}/>
                <label className="mynavbar-link-text">ทุนที่เปิดสมัคร</label>
                
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/Introduction" className="mynavbar-link">
                <HiOutlineDocumentSearch color="white" size={50}/>
                <span className="mynavbar-link-text">ขั้นตอนการยื่นทุน</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/Profile" className="mynavbar-link">
                <BsFillPersonBadgeFill color="white" size={50}/>
                <span className="mynavbar-link-text">ข้อมูลนิสิต</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/UserStatus" className="mynavbar-link">
                <MdRestore color="white" size={50}/>
                <span className="mynavbar-link-text">ตรวจสอบสถานะ</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href={"/SThistory/"+userId} className="mynavbar-link">
                <BsJournalText color="white" size={50}/>
                <span className="mynavbar-link-text">ประวัติการขอรับทุน</span>
              </a>
            </li>
            <li className="mynavbar-item">
              <a href="/Contact" className="mynavbar-link">
                <BsWhatsapp color="white" size={50}/>
                <span className="mynavbar-link-text">ช่องทางติดต่อผู้ดูแล</span>
              </a>
            </li>
            <li className="mynavbar-item" id="themeButton">
              
            </li>
          </ul>
        </nav>
          {/*
          <nav className="nav__contt" stlye={{}}>
            <ul className="nav">
              <li className="nav__items ">  
                  <a href="">Home</a>
              </li>
              <li className="nav__items "> 
                <a href="">TotalCapital</a>
              </li>
              <li className="nav__items ">
              <a href="">Introduction</a>
              </li>
              <li className="nav__items ">
              <a href="">Profile</a>
              </li>   
            </ul>
          </nav> */}
        </div>
      </>)
}
export default Mynavbar;

/*<div >
          <nav className="mynavbar">
          <ul className="mynavbar-nav">
            <li className="mynavbar-logo">
              <a href="#" className="mynavbar-link">
                <span className="mynavbar-link-text mynavbar-mynavbar-logo-text">HEADER</span>
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="angle-double-right"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="svg-inline--fa fa-angle-double-right fa-w-14 fa-5x"
                >
                  <g className="fa-group">
                    <path
                      fill="currentColor"
                      d="M224 273L88.37 409a23.78 23.78 0 0 1-33.8 0L32 386.36a23.94 23.94 0 0 1 0-33.89l96.13-96.37L32 159.73a23.94 23.94 0 0 1 0-33.89l22.44-22.79a23.78 23.78 0 0 1 33.8 0L223.88 239a23.94 23.94 0 0 1 .1 34z"
                      className="mynavbar-fa-secondary"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M415.89 273L280.34 409a23.77 23.77 0 0 1-33.79 0L224 386.26a23.94 23.94 0 0 1 0-33.89L320.11 256l-96-96.47a23.94 23.94 0 0 1 0-33.89l22.52-22.59a23.77 23.77 0 0 1 33.79 0L416 239a24 24 0 0 1-.11 34z"
                      className="mynavbar-fa-primary"
                    ></path>
                  </g>
                </svg>
              </a>
            </li>

            <li className="mynavbar-item">
              <a href="#" className="mynavbar-link">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fad"
                  data-icon="cat"
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                  className="svg-inline--fa fa-cat fa-w-16 fa-9x"
                >
                  <g className="fa-group">
                    <path
                      fill="currentColor"
                      d="M448 96h-64l-64-64v134.4a96 96 0 0 0 192 0V32zm-72 80a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm80 0a16 16 0 1 1 16-16 16 16 0 0 1-16 16zm-165.41 16a204.07 204.07 0 0 0-34.59 2.89V272l-43.15-64.73a183.93 183.93 0 0 0-44.37 26.17L192 304l-60.94-30.47L128 272v-80a96.1 96.1 0 0 0-96-96 32 32 0 0 0 0 64 32 32 0 0 1 32 32v256a64.06 64.06 0 0 0 64 64h176a16 16 0 0 0 16-16v-16a32 32 0 0 0-32-32h-32l128-96v144a16 16 0 0 0 16 16h32a16 16 0 0 0 16-16V289.86a126.78 126.78 0 0 1-32 4.54c-61.81 0-113.52-44.05-125.41-102.4z"
                      className="mynavbar-fa-secondary"
                    ></path>
                    <path
                      fill="currentColor"
                      d="M376 144a16 16 0 1 0 16 16 16 16 0 0 0-16-16zm80 0a16 16 0 1 0 16 16 16 16 0 0 0-16-16zM131.06 273.53L192 304l-23.52-70.56a192.06 192.06 0 0 0-37.42 40.09zM256 272v-77.11a198.62 198.62 0 0 0-43.15 12.38z"
                      className="mynavbar-fa-primary"
                    ></path>
                  </g>
                </svg>
                <span className="mynavbar-link-text">EX.</span>
              </a>
            </li> */
{/*
        <nav className="navbar" style={{position:"absolute", width:"150px",height:"100vh"}}>
          <div className="container-fluid" style={{position:"absolute",top:"0px"}}>
            <ul className="navbar-nav">
              <li className="mynavbar-item"><a className="mynavbar-link" href="/">Login</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/Home">Home</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/TotalCapital">หน้ารวมทุน</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/Introduction">ขั้นตอนยื่นทุน</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/Profile">ข้อมูลนิสิต</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/UserStatus">สถานะ</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/PassList">หน้ารายชื่อผู้มีสิทธิสัมภาษณ์</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/InterviewSchedule">ตารางคิวเข้าสัมภาษณ์</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/Rate">หน้าในคะแนน</a></li>
              <li className="mynavbar-item"><a className="mynavbar-link" href="/Contact">ช่องทางติดต่อ</a></li>
            </ul>
          </div>
        </nav> */}
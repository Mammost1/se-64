import '../App.css';
const ViewProfile = (props) => {
    const {myProfile,familyProfile,incomeProfile,updateSibling,addSibling,delSibling,changeMyProfile
        ,changeFamilyProfile,changeIncomeProfile,handleSubmit,correct,setCorrect,correctDocuments,
        applySubmit,scholarshipData,setFilePdf,documents,setCorrectDocuments,checkApply,checkPart4,openPDF}=props
    return(<>
        <div style={{margin:"20px",marginTop:'20px'}}>
            <h2 style={{marginTop:"60px",width:"40%",height:'70px',backgroundColor: "#680C07",borderRadius:"20px",fontWeight:"800",fontFamily:'Prompt',color:'white',textAlign:'center',lineHeight:'70px'}} >กรอกข้อมูลสำหรับสมัครขอรับทุนการศึกษา</h2>

            <form onSubmit={handleSubmit} className="was-validated" style={{margin:"2%"}}>
                {/*<div style={{position:"absolute",right:"0px",top:"100px"}}>
                    <img src='https://cdn0.iconfinder.com/data/icons/google-material-design-3-0/48/ic_account_circle_48px-512.png'style={{width:"200px"}}/>
                    <br/>
                    {(()=>{
                        if(correct===""){
                            return  <input  type="file" style={{width:"200px"}}></input> 
                        }
                    })()}
                </div>*/}
                <h3 style={{marginTop:"3%",fontFamily:'Prompt',fontWeight:'600', color:"#680C07"}}><u>ส่วนที่ 1 ประวัติส่วนตัว</u></h3>

                <div className="input-group " style={{fontFamily:'Prompt',marginTop:'2%'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}} >ชื่อ</span>
                    <input type="text" className="form-control"  placeholder="ชื่อจริง" value={myProfile.myFirstName} onChange={(e)=>changeMyProfile("myFirstName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>นามสกุล</span>
                    <input type="text" className="form-control"  placeholder="นามสกุล" value={myProfile.myLastName} onChange={(e)=>changeMyProfile("myLastName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text"style={{background:"#680C07",color:"white"}}>อายุ</span>
                    <input type="number" min={0} max={120} className="form-control"  placeholder="อายุ" value={myProfile.myAge} onChange={(e)=>changeMyProfile("myAge",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text">ปี</span>
                </div>

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>รหัสนิสิต</span>
                    <input type="text" className="form-control" minlength="10" maxlength="10" placeholder="รหัสนิสิต" value={myProfile.studentID} onChange={(e)=>changeMyProfile("studentID",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>นิสิตปีที่</span>
                    <select className="form-select" aria-label="Default select example"value={myProfile.class} onChange={(e)=>changeMyProfile("class",e.target.value)} disabled={correct} required>
                        <option value={""}>None</option>
                        <option value={1}>1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                        <option value={4}>4</option>
                        <option value={5}>5</option>
                        <option value={6}>6</option>
                        <option value={7}>7</option>
                        <option value={8}>8</option>
                    </select>
                    
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>ภาคการเรียนการสอน</span>
                    <div className="input-group-text"  style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name="sector" value="ภาคปกติ" checked={myProfile.sector==="ภาคปกติ"?"checked":""} onChange={(e)=>changeMyProfile("sector",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ภาคปกติ&nbsp;</label>
                    </div>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name="sector" value="ภาคพิเศษ" checked={myProfile.sector==="ภาคพิเศษ"?"checked":""} onChange={(e)=>changeMyProfile("sector",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ภาคพิเศษ&nbsp;</label>
                    </div>
                </div>

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>สาขา</span>
                    <select className="form-select" aria-label="Default select example" value={myProfile.major} onChange={(e)=>changeMyProfile("major",e.target.value)} disabled={correct} required>
                        <option value={""}>None</option>
                        <option value="เครื่องกลและระบบการผลิต">เครื่องกลและระบบการผลิต</option>
                        <option value="คอมพิวเตอร์และสารสนเทศศาสตร์">คอมพิวเตอร์และสารสนเทศศาสตร์</option>
                        <option value="เครื่องกลและการออกแบบ">เครื่องกลและการออกแบบ</option>
                        <option value="โยธา">โยธา</option>
                        <option value="ไฟฟ้าและอิเล็กทรอนิกส์">ไฟฟ้าและอิเล็กทรอนิกส์</option>
                        <option value="อุตสาหการและระบบ">อุตสาหการและระบบ</option>
                        <option value="หุ่นยนต์และระบบ">หุ่นยนต์และระบบ</option>
                    </select>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>อาจารย์ที่ปรึกษา</span>
                    <input type="text" className="form-control" placeholder="อาจารย์ที่ปรึกษา" value={myProfile.advisor} onChange={(e)=>changeMyProfile("advisor",e.target.value)}  disabled={correct} required/>
                </div>

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>คะแนนเฉลี่ยสะสม (GPA)</span>
                    <input type="number"min={0} max={4} step="0.01" className="form-control" placeholder="คะแนนเฉลี่ยสะสม (GPA)" value={myProfile.gpa} onChange={(e)=>changeMyProfile("gpa",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>โทรศัพท์มือถือ</span>
                    <input type="text" className="form-control" placeholder="โทรศัพท์มือถือ" value={myProfile.myPhone} onChange={(e)=>changeMyProfile("myPhone",e.target.value)} disabled={correct} required/>
                </div>

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)</span>
                    <input type="text" className="form-control" placeholder="ที่อยู่ปัจจุบัน (ที่ติดต่อได้สะดวก)" value={myProfile.myAddress} onChange={(e)=>changeMyProfile("myAddress",e.target.value)} disabled={correct} required/>
                </div>

                <br/>
                <h3 style={{marginTop:"3%",fontFamily:'Prompt',fontWeight:'600',color:"#680C07"}} ><u>ส่วนที่ 2 ประวัติครอบครัว</u></h3>
                <div className="input-group " style={{fontFamily:'Prompt',marginTop:'2%'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>บิดาชื่อ</span>
                    <input type="text" className="form-control" placeholder="ชื่อจริง" value={familyProfile.fatherFirstName} onChange={(e)=>changeFamilyProfile("fatherFirstName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>นามสกุล</span>
                    <input type="text" className="form-control" placeholder="นามสกุล" value={familyProfile.fatherLastName} onChange={(e)=>changeFamilyProfile("fatherLastName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>อายุ</span>
                    <input type="number" min={0} className="form-control" placeholder="อายุ" value={familyProfile.fatherAge} onChange={(e)=>changeFamilyProfile("fatherAge",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text">ปี</span>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name='fatherAlive' value="มีชีวิต" checked={familyProfile.fatherAlive==="มีชีวิต"?"checked":""} onChange={(e)=>changeFamilyProfile("fatherAlive",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;มีชีวิต&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name='fatherAlive' value="ถึงแก่กรรม" checked={familyProfile.fatherAlive==="ถึงแก่กรรม"?"checked":""} onChange={(e)=>changeFamilyProfile("fatherAlive",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ถึงแก่กรรม&nbsp;</label>
                    </div>
                </div>
                {(()=>{
                    if(familyProfile.fatherAlive==="มีชีวิต"){
                        return(<>
                         <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>อาชีพ</span>
                            <input type="text" className="form-control" placeholder="อาชีพ" value={familyProfile.fatherOccupation} onChange={(e)=>changeFamilyProfile("fatherOccupation",e.target.value)} disabled={correct} required/>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>รายได้เดือนละ</span>
                            <input type="number" min={0} className="form-control" placeholder="รายได้เดือนละ" value={familyProfile.fatherIncome} onChange={(e)=>changeFamilyProfile("fatherIncome",e.target.value)} disabled={correct} required/>
                            <span className="input-group-text">บาท</span>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>สถานที่ประกอบอาชีพ</span>
                            <input type="text" className="form-control" placeholder="สถานที่ประกอบอาชีพ" value={familyProfile.fatherWorkplace} onChange={(e)=>changeFamilyProfile("fatherWorkplace",e.target.value)} disabled={correct} required/>
                        </div>
                        
                        <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>ที่อยู่ของบิดา</span>
                            <input type="text" className="form-control" placeholder="ที่อยู่ของบิดา" value={familyProfile.fatherAddress} onChange={(e)=>changeFamilyProfile("fatherAddress",e.target.value)} disabled={correct} required/>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>โทรศัพท์มือถือ</span>
                            <input type="text" className="form-control" placeholder="โทรศัพท์มือถือ" value={familyProfile.fatherPhone} onChange={(e)=>changeFamilyProfile("fatherPhone",e.target.value)}  disabled={correct} required/>
                        </div>                      
                        </>)
                    }
                })()}
                <br/>

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>มารดาชื่อ</span>
                    <input type="text" className="form-control" placeholder="ชื่อจริง" value={familyProfile.motherFirstName} onChange={(e)=>changeFamilyProfile("motherFirstName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>นามสกุล</span>
                    <input type="text" className="form-control" placeholder="นามสกุล" value={familyProfile.motherLastName} onChange={(e)=>changeFamilyProfile("motherLastName",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>อายุ</span>
                    <input type="number" min={0} className="form-control" placeholder="อายุ" value={familyProfile.motherAge} onChange={(e)=>changeFamilyProfile("motherAge",e.target.value)} disabled={correct} required/>
                    <span className="input-group-text">ปี</span>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name="motherAlive" value="มีชีวิต" checked={familyProfile.motherAlive==="มีชีวิต"?"checked":""} onChange={(e)=>changeFamilyProfile("motherAlive",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;มีชีวิต&nbsp;</label>
                    </div>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name="motherAlive" value="ถึงแก่กรรม" checked={familyProfile.motherAlive==="ถึงแก่กรรม"?"checked":""} onChange={(e)=>changeFamilyProfile("motherAlive",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ถึงแก่กรรม&nbsp;</label>
                    </div>
                </div>
                {(()=>{
                    if(familyProfile.motherAlive==="มีชีวิต"){
                        return(<>
                        <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>อาชีพ</span>
                            <input type="text" className="form-control" placeholder="อาชีพ" value={familyProfile.motherOccupation} onChange={(e)=>changeFamilyProfile("motherOccupation",e.target.value)} disabled={correct} required/>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>รายได้เดือนละ</span>
                            <input type="number" min={0} className="form-control" placeholder="รายได้เดือนละ" value={familyProfile.motherIncome} onChange={(e)=>changeFamilyProfile("motherIncome",e.target.value)}  disabled={correct} required/>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>บาท</span>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>สถานที่ประกอบอาชีพ</span>
                            <input type="text" className="form-control" placeholder="สถานที่ประกอบอาชีพ" value={familyProfile.motherWorkplace} onChange={(e)=>changeFamilyProfile("motherWorkplace",e.target.value)} disabled={correct} required/>
                        </div>
                        
                        <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>ที่อยู่ของมารดา</span>
                            <input type="text" className="form-control" placeholder="ที่อยู่ของมารดา" value={familyProfile.motherAddress} onChange={(e)=>changeFamilyProfile("motherAddress",e.target.value)} disabled={correct} required/>
                            <span className="input-group-text" style={{background:"#680C07",color:"white"}}>โทรศัพท์มือถือ</span>
                            <input type="text" className="form-control" placeholder="โทรศัพท์มือถือ" value={familyProfile.motherPhone} onChange={(e)=>changeFamilyProfile("motherPhone",e.target.value)} disabled={correct} required/>
                        </div>
                        </>)
                    }
                })()}
                
                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;สถานะสมรสของบิดา-มารดา&nbsp;</label>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name="maritalStatus" value="อยู่ด้วยกัน" checked={familyProfile.maritalStatus==="อยู่ด้วยกัน"?"checked":""} onChange={(e)=>changeFamilyProfile("maritalStatus",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;อยู่ด้วยกัน&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name="maritalStatus" value="หย่าร้าง" checked={familyProfile.maritalStatus==="หย่าร้าง"?"checked":""} onChange={(e)=>changeFamilyProfile("maritalStatus",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;หย่าร้าง&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name="maritalStatus"  value="แยกกันอยู่" checked={familyProfile.maritalStatus==="แยกกันอยู่"?"checked":""} onChange={(e)=>changeFamilyProfile("maritalStatus",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;แยกกันอยู่&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name="maritalStatus" value="สมรสใหม่" checked={familyProfile.maritalStatus==="สมรสใหม่"?"checked":""} onChange={(e)=>changeFamilyProfile("maritalStatus",e.target.value)}disabled={correct} required/>
                        <label>&nbsp;บิดา-มารดา สมรสใหม่&nbsp;</label>
                    </div>
                </div>
                
                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;พี่น้องร่วมบิดา มารดาเรียงตามลำดับดังนี้ รวมผู้สมัครด้วย&nbsp;</label> 
                </div>
                {familyProfile.sibling.map((data,index)=>{
                    return(<>
                        <div className="input-group mt-2" style={{fontFamily:'Prompt'}} >  
                            <label className="input-group-text"  style={{background:"#680C07",color:"white"}}>ลำดับที่ {index+1}</label>
                            <label  className="input-group-text"  style={{background:"#680C07",color:"white"}}>ชื่อ</label>
                            <input type="text" className="form-control" name="firstName" value={data.firstName} onChange={(e)=>updateSibling(e,index)} disabled={correct} required/>
                            <label  className="input-group-text" style={{background:"#680C07",color:"white"}}>นามสกุล</label>
                            <input type="text" className="form-control" name="lastName" value={data.lastName} onChange={(e)=>updateSibling(e,index)} disabled={correct} required/>
                            <label  className="input-group-text" style={{background:"#680C07",color:"white"}}>อาชีพ</label>
                            <input type="text" className="form-control"  name="occupation" value={data.occupation} onChange={(e)=>updateSibling(e,index)} disabled={correct} required/>
                            {(()=>{
                                if(index!==0 && correct===""){
                                    return <button onClick={()=>delSibling(index)}>ลบ</button>
                                }
                            })()}
                        </div>
                        <br/>
                        </>)
                        
                })}
                {(()=>{
                    if(correct===""){
                        return  <button style={{height:'45px',backgroundColor:'#680C07',borderColor:'#680C07',
                        borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',
                        fontFamily:'Prompt',color:'white',fontWeight:'500',fontSize:'18px',width:'120px',marginBottom:'1%'}} 
                        onClick={()=>addSibling()}>เพิ่ม</button>
                    }
                })()}
                <br/>
              
                <h3 style={{fontFamily:'Prompt',fontWeight:'600', color:"#680C07",marginTop:'3%'}}><u>ส่วนที่ 3 รายได้ของผู้ขอรับทุน</u></h3>
                <div className="input-group " style={{fontFamily:'Prompt',marginTop:'2%'}}>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ผู้สมัครได้รับค่าใช้จ่ายเดือนละ&nbsp;</label>
                    <input type="number" min={0} className="form-control" placeholder="ผู้สมัครได้รับค่าใช้จ่ายเดือนละ" value={incomeProfile.myIncome} onChange={(e)=>changeIncomeProfile("myIncome",e.target.value)} disabled={correct} required/>
                    <label className="input-group-text">บาท</label>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>ได้รับจาก</label>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name='giver' value="บิดา" checked={incomeProfile.giver==="บิดา"?"checked":""} onChange={(e)=>changeIncomeProfile("giver",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;บิดา&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name='giver' value="มารดา" checked={incomeProfile.giver==="มารดา"?"checked":""} onChange={(e)=>changeIncomeProfile("giver",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;มารดา&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name='giver' value="ผู้อุปการะ" checked={incomeProfile.giver==="ผู้อุปการะ"?"checked":""} onChange={(e)=>changeIncomeProfile("giver",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ผู้อุปการะ&nbsp;</label>
                    </div>
                </div>
                {(()=>{
                    if(incomeProfile.giver==="ผู้อุปการะ"){
                        return(<>
                            <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                                <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ในกรณีที่ได้รับค่าใช้จ่ายจากผู้อุปการะ ซึ่งมิใช่บิดา มารดา ผู้อุปการะนั้นเกี่ยวข้องเป็น&nbsp;</label>
                                <input type="text" className="form-control" placeholder="ผู้อุปการะนั้นเกี่ยวข้องเป็น" value={incomeProfile.patronRelevant} onChange={(e)=>changeIncomeProfile("patronRelevant",e.target.value)} disabled={correct} required/>
                            </div>

                            <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                                <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ผู้อุปการะมีอาชีพ&nbsp;</label>
                                <input type="text" className="form-control" placeholder="ผู้อุปการะมีอาชีพ" value={incomeProfile.patronOccupation} onChange={(e)=>changeIncomeProfile("patronOccupation",e.target.value)} disabled={correct} required/>
                                <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;สถานที่ประกอบอาชีพ&nbsp;</label>
                                <input type="text" className="form-control" placeholder="สถานที่ประกอบอาชีพ" value={incomeProfile.patronWorkplace} onChange={(e)=>changeIncomeProfile("patronWorkplace",e.target.value)} disabled={correct} required/>
                            </div>

                            <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                                <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;โทรศัพท์มือถือ&nbsp;</label>
                                <input type="text" className="form-control" placeholder="โทรศัพท์มือถือ" value={incomeProfile.patronPhone} onChange={(e)=>changeIncomeProfile("patronPhone",e.target.value)} disabled={correct} required/>
                                <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ผู้อุปการะมีบุตรในอุปการะอีก&nbsp;</label>
                                <input type="number" min={0} className="form-control" placeholder="ผู้อุปการะมีบุตรในอุปการะอีก" value={incomeProfile.patronPosterChild} onChange={(e)=>changeIncomeProfile("patronPosterChild",e.target.value)} disabled={correct} required/>
                                <label className="input-group-text">&nbsp;คน&nbsp;</label>
                            </div>
                        </>)
                    }
                })()}

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ผู้สมัครเคยทํางานพิเศษระหว่างหยุดภาคเรียนหรือไม่&nbsp;</label>
                    <div className="input-group-text">
                        <input type="radio"  className="form-check-input" name="partTime"  value="เคย" checked={incomeProfile.partTime==="เคย"?"checked":""} onChange={(e)=>changeIncomeProfile("partTime",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;เคย&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio"  className="form-check-input" name="partTime" value="ไม่เคย" checked={incomeProfile.partTime==="ไม่เคย"?"checked":""} onChange={(e)=>changeIncomeProfile("partTime",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ไม่เคย&nbsp;</label>
                        
                    </div>
                    
                </div>
                {(()=>{
                    if(incomeProfile.partTime==="เคย"){
                        return(<>
                        <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <label  className="input-group-text" style={{background:"#680C07",color:"white"}}>ได้รับค่าจ้างเฉลี่ยสัปดาห์ละ</label>
                            <input  className="form-control" type="number" min={0} name="incomeWeekly" placeholder="สัปดาห์ละ" value={incomeProfile.partTimeWeeklyIncome} onChange={(e)=>changeIncomeProfile("partTimeWeeklyIncome",e.target.value)} disabled={correct} required={incomeProfile.partTimeWeeklyIncome || incomeProfile.partTimeMonthlyIncome?"":"required"}/>
                            <label  className="input-group-text">บาท หรือ เดือนละ</label>
                            <input className="form-control" type="number" min={0} name="income" placeholder="เดือนละ" value={incomeProfile.partTimeMonthlyIncome} onChange={(e)=>changeIncomeProfile("partTimeMonthlyIncome",e.target.value)} disabled={correct} required={incomeProfile.partTimeWeeklyIncome || incomeProfile.partTimeMonthlyIncome?"":"required"}/>
                            <label  className="input-group-text">บาท</label>
                        </div>

                        <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                            <label  className="input-group-text" style={{background:"#680C07",color:"white"}}>ระบุประเภทของงานที่ทำ</label>
                            <input  className="form-control" type="text" placeholder="ระบุประเภทของงานที่ทำ"  value={incomeProfile.partTimeDetails} onChange={(e)=>changeIncomeProfile("partTimeDetails",e.target.value)} disabled={correct} required/>
                        </div>

                        </>)
                    }
                })()}

                <div className="input-group mt-3" style={{fontFamily:'Prompt'}}>
                    <label className="input-group-text" style={{background:"#680C07",color:"white"}}>&nbsp;ปัจจุบันท่านได้กู้ยืมเงินกองทุนเงินให้กู้ยืมเพื่อการศึกษาหรือไม่&nbsp;</label>
                    <div className="input-group-text">
                        <input type="radio" className="form-check-input" name="borrowingFunds"  value="กยศ." checked={incomeProfile.borrowingFunds==="กยศ."?"checked":""} onChange={(e)=>changeIncomeProfile("borrowingFunds",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;กยศ.&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input"name="borrowingFunds"  value="กรอ." checked={incomeProfile.borrowingFunds==="กรอ."?"checked":""} onChange={(e)=>changeIncomeProfile("borrowingFunds",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;กรอ.&nbsp;</label>
                    </div>
                    <div className="input-group-text" style={{fontFamily:'Prompt'}}>
                        <input type="radio" className="form-check-input" name="borrowingFunds" value="ไม่ได้กู้" checked={incomeProfile.borrowingFunds==="ไม่ได้กู้"?"checked":""} onChange={(e)=>changeIncomeProfile("borrowingFunds",e.target.value)} disabled={correct} required/>
                        <label>&nbsp;ไม่ได้กู้&nbsp;</label>
                    </div>
                </div>
                {(()=>{
                    if(correct===""){
                        return(<>
                        <div className='mt-3'>
                            <button type='submit' style={{height:'45px',backgroundColor:'#680C07',borderColor:'#680C07',
                        borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',
                        fontFamily:'Prompt',color:'white',fontWeight:'500',fontSize:'18px',width:'120px',marginBottom:'1%'}}>บันทึก</button>
                        </div>
                        </>) 
                    }
                })()}
            </form>
            {(()=>{
                    if(correct==="disabled" && !correctDocuments){
                        return(<>
                        <div className='mt-3'>
                            <button  style={{height:'45px',backgroundColor:'#680C07',borderColor:'#680C07',
                        borderTopLeftRadius:'10px',borderTopRightRadius:'10px',borderBottomLeftRadius:'10px',borderBottomRightRadius:'10px',
                        fontFamily:'Prompt',color:'white',fontWeight:'500',fontSize:'18px',width:'120px',marginBottom:'1%'}} onClick={()=>setCorrect("")}>แก้ไข</button>
                        </div>
                        </>) 
                    }
                })()}
        </div>
        {(()=>{
            
            if(checkPart4){
                return  (<>
                  <div style={{margin:"20px",marginLeft:'50px',fontFamily:'Prompt'}}>
                    <h5 style={{fontFamily:'Prompt',color:'red',marginBottom: 30}}>(หากข้อมูลส่วนที 1 , 2 หรือ 3 ไม่ถูกต้องให้ปุ่มแก้ไขและกดบันทึกก่อนสมัคร )</h5>
                    <h3 style={{marginTop:'50px',fontWeight:'700',color:'#680C07'}} ><u>ส่วนที่ 4 อัพโหลดเอกสาร</u></h3>

                    <form onSubmit={applySubmit}  className="was-validated"  style={{marginRight:"4%"}}>
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.idCard){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text" style={{background:"#680C07",color:"white"}}>สำเนาบัตรประจำตัวประชาชนของผู้สมัคร (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("idCard",e)} disabled={correctDocuments} required={documents.idCard?"":"required"}/>
                                    </div>
                                    <iframe src={documents.idCard} width="100%" height="800px"/>
                                </div>                   
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.houseRegistration){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">สำเนาทะเบียนบ้านของผู้สมัคร (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("houseRegistration",e)} disabled={correctDocuments} required={documents.houseRegistration?"":"required"}/>
                                    </div>
                                    <iframe src={documents.houseRegistration} width="100%" height="800px"/>
                                </div>                  
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.essay){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">แนบไฟล์เรียงความ (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("essay",e)} disabled={correctDocuments} required={documents.essay?"":"required"}/>
                                    </div>
                                    <iframe src={documents.essay} width="100%" height="800px"/>
                                </div>               
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.nisitPicture){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">แนบไฟล์รูปถ่ายนิสิต (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("nisitPicture",e)} disabled={correctDocuments} required={documents.nisitPicture?"":"required"}/>
                                    </div>
                                    <iframe src={documents.nisitPicture} width="100%" height="800px"/>
                                </div>              
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.housePicture){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">แนบไฟล์รูปถ่ายบ้านที่พักอาศัยตามภูมิลำเนา (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("housePicture",e)} disabled={correctDocuments} required={documents.housePicture?"":"required"}/>
                                    </div>
                                    <iframe src={documents.housePicture} width="100%" height="800px"/>
                                </div>            
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.studyResults){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">แนบไฟล์ใบรายงานผลการศึกษา (Transcript) ปริ๊นจากเวปได้ (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("studyResults",e)} disabled={correctDocuments} required={documents.studyResults?"":"required"}/>
                                    </div>
                                    <iframe src={documents.studyResults} width="100%" height="800px"/>
                                </div>           
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(scholarshipData[0].applicantDocuments.diseaseEffects){
                                return(<>
                                <div className="input-group mt-3" >
                                    <span className="input-group-text">แนบไฟล์เรียงความเล่าประวัติส่วนตัวของตัวเองและปัญหาความเดือดร้อน (pdf)</span>
                                    <div className="form-control">
                                        <input className="form-control" type="file" accept="application/pdf" onChange={(e)=>setFilePdf("diseaseEffects",e)} disabled={correctDocuments} required={documents.diseaseEffects?"":"required"}/>
                                    </div>
                                    <iframe src={documents.diseaseEffects} width="100%" height="800px"/>
                                </div>          
                                </>)
                            }
                        })()}
                        {(()=>{
                            if(!correctDocuments){
                                return(<>
                                <div className="d-grid gap-2 col-6 mx-auto" style={{marginTop:"15px"}}>
                                    <button type="submit" className="btn" style={{backgroundColor:"#680C07",color:"white"}} disabled={correct?"":"disabled"}>{!correct?"กรุณากดบันทึกข้อมูลส่วน1,2,3 ก่อน":checkApply?"ส่งเอกสารการสมัครใหม่":"สมัคร"}</button>
                                </div>

                                </>)
                            }
                        })()}
                    </form>
                    {(()=>{
                        if(checkApply && correctDocuments){
                            return(<>
                            <div style={{width:"80%",fontFamily:'Prompt'}}>
                                <div className="d-grid gap-2 col-6 mx-auto" style={{marginTop:"15px"}}>
                                    <button type="submit" className="btn" style={{backgroundColor:"#680C07",color:"white"}} onClick={(e)=>setCorrectDocuments("")}>แก้ไข</button>
                                </div>  
                            </div>      
                            </>)
                        }
                    })()}
            </div></>)
            }
        })()}
  
    </>)
}
export default ViewProfile;

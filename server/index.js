const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

const multer = require('multer');
const fs = require('fs');
const { count } = require("console");

const bcrypt = require('bcrypt');
const saltRounds = 10;
var jwt = require('jsonwebtoken');
const secret = "seProjectG6"

const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)

app.use(cors());
app.use(express.json({limit: '100mb'}));

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, 'upload');
  },
  filename: function (req, file, cb) {
      console.log(file);
      cb(null , file.originalname );
  }
});

const upload = multer({ storage: storage })

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "3007",
  database: "employeeSystem",
})

function toThaiDateString(date) {
  let monthNames = [
      "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
      "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
      "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  let year = date.getFullYear() + 543;
  let month = monthNames[date.getMonth()];
  let numOfDay = date.getDate();

  let hour = date.getHours().toString().padStart(2, "0");
  let minutes = date.getMinutes().toString().padStart(2, "0");
  let second = date.getSeconds().toString().padStart(2, "0");

  return `${numOfDay} ${month} ${year} ` +
      `${hour}:${minutes}:${second} น.`;
}

app.get("/score", (req, res) => {
    db.query("SELECT * FROM score", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
   /*เก็บค่าคำถาม คะแนน*/
  app.post("/AddScore", (req, res) => {
     
    const question	 = req.body.question;
    const score = req.body.score;

    db.query("INSERT INTO score (question,score) VALUES (?,?)",
      [question,score],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  app.post("/AddCommittee", (req, res) => {
     
    const fund	 = req.body.fund;
    const Committe = req.body.Committe;

    db.query("INSERT INTO addcommittee (fund,Committe) VALUES (?,?)",
      [fund,Committe],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });


/* แอดเก็บค่า วันที่ เวลา ที่ประชุม รายละเอียด*/
  app.post("/DateTime", (req, res) => {
     
    const Date = req.body.Date;
    const startTime = req.body.startTime;
    const endTime = req.body.endTime;
    const meeting = req.body.meeting;
    const particulars = req.body.particulars;
    const Email = req.body.Email;
    db.query("INSERT INTO adddatetime (Date,startTime,endTime,meeting,particulars,Email) VALUES (?,?,?,?,?,?)",
      [Date,	startTime,endTime,meeting,particulars,Email],

      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });


   

  app.get("/scoreTotal", (req, res) => {
    db.query("SELECT * FROM rate", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  


  app.post("/create", (req, res) => {
    const name = req.body.name;
    const totalScore = req.body.totalScore;

    db.query(
      "INSERT INTO rate (name,totalScore) VALUES (?,?)",
      [name,totalScore],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  app.put("/update", (req, res) => {
    const id = req.body.id;
    const sum = req.body.sum;
    db.query(
      "UPDATE score SET sum = ? WHERE id = ?",
      [sum, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });

  /*ประกาศสร้างทุนใหม่*/ 
  //app.post('/addScholarship', upload.array('file', 2), (req,res) => {
    app.post('/addScholarship', upload.array('file', 2), (req,res) => {
    const build = new Date().toISOString().slice(0, 16);
    const status = "recruit";
    const scholarshipName = req.body.scholarshipName;
    const academicYear = parseInt(req.body.academicYear);
    const term = req.body.term;
    const donorName = req.body.donorName;
    const details = req.body.details;
    const amount = parseInt(req.body.amount);
    const capital = parseInt(req.body.capital);
    const closeDate = req.body.closeDate;
    const idCard = req.body.idCard === 'true';
    const houseRegistration = req.body.houseRegistration === 'true';
    const essay = req.body.essay === 'true';
    const nisitPicture = req.body.nisitPicture === 'true';
    const housePicture = req.body.housePicture === 'true';
    const studyResults = req.body.studyResults === 'true';
    const diseaseEffects = req.body.diseaseEffects === 'true';
    const fileImg = fs.readFileSync("upload/"+req.files[0].filename);
    const fileDetails = fs.readFileSync("upload/"+req.files[1].filename);
    //const fileImg = req.body.fileImg;
    //const fileDetails = req.body.fileDetails;
    //const fileImg = fs.readFileSync("upload/"+req.files[0].filename);

    //INSERT INTO scholarship (build,status,scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects,fileImg,fileDetails) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
    db.query(
      "INSERT INTO scholarship (build,status,scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects,fileImg,fileDetails) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [build,status,scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects,fileImg,fileDetails],
      (err, result) => {
        if (err) {
          console.log(err);
          return
        } else {
          fs.unlink("upload/"+req.files[0].filename, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
          fs.unlink("upload/"+req.files[1].filename, (err) => {
            if (err) {
              console.error(err)
              return
            }
          })
          res.send(result);
        }
      }
    );
  })
  /*ลบทุน*/ 
  app.put("/deleteScholarship", (req, res) => {
    const scholarshipId = req.body.scholarshipId
    db.query("DELETE FROM scholarship WHERE scholarshipId =?",[scholarshipId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }); 
  });


  app.put("/Updatecommittee", (req, res) => {  
    const scholarshipId = req.body.scholarshipId;
    const status = "interview";
    const interviewDate = req.body.interviewDate;
    const startInterview = req.body.startInterview;
    const endInterview = req.body.endInterview;
    const criterion = req.body.criterion;
    const committee = req.body.committee;
    const meetingLink = req.body.meetingLink;
    const interviewDetails = req.body.interviewDetails;
    //console.log(scholarshipId);
    db.query("UPDATE totalscholarship SET status=? ,interviewDate=? ,startInterview=? ,endInterview=? ,criterion=? ,committee = ? ,meetingLink=? ,interviewDetails=? WHERE scholarshipId = ?",
      [status,interviewDate,startInterview,endInterview,criterion,committee,meetingLink,interviewDetails,scholarshipId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message:err.message})
        } else {
          //console.log(result);
          res.json({status:"Ok",message:"นัดสัมภาษณ์สำเร็จ"})
        }
      }
    );
  });

  /*ดึงข้อมูลจากเทเบิล scholarship*/ 
  app.get("/scholarshipAll", (req, res) => {
    db.query("SELECT * FROM scholarship ORDER BY build DESC", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.get("/scholarship/:scholarshipId", (req, res) => {
    const scholarshipId = req.params.scholarshipId;
    db.query("SELECT * FROM scholarship WHERE scholarshipId=?",[scholarshipId], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

  app.post("/AddProfile", (req, res) => {  
    const studentID	 = req.body.studentID;
    const myProfile = req.body.myProfile;
    const familyProfile = req.body.familyProfile;
    const incomeProfile = req.body.incomeProfile;
    db.query("INSERT INTO profile (studentID,myProfile,familyProfile,incomeProfile) VALUES (?,?,?,?)",
      [studentID,myProfile,familyProfile,incomeProfile],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values Inserted");
        }
      }
    );
  });

  app.put("/UpdateProfile", (req, res) => {  
    const studentID	 = req.body.studentID;
    const myProfile = req.body.myProfile;
    const familyProfile = req.body.familyProfile;
    const incomeProfile = req.body.incomeProfile;
    db.query("UPDATE profile SET myProfile = ?,familyProfile=?,incomeProfile=? WHERE studentID = ?",
      [myProfile,familyProfile,incomeProfile,studentID],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send("Values result");
        }
      }
    );
  });

  app.get("/profile/:studentID", (req, res) => {
    const studentID = req.params.studentID;
    db.query("SELECT * FROM profile WHERE studentID=?",[studentID], (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });


  //////////////การสมัคร + login////////////////////////////
  ////add gemail ลง mysql
  app.post('/addUser',(req,res)=>{
    const gmail = req.body.gmail;
    const role = req.body.role;
    /*const myProfile = "";
    const familyProfile = "";
    const incomeProfile = "";*/
    db.query(
      "INSERT INTO users (gmail, role) VALUES (?,?)",
      [gmail, role],
      (err, result) => {
        if (err) {
          res.json({status:"error",message:err.message})
        } else {
          res.json({status:"ok"})
        }
      }
    );
  });

  ////ตรวจว่ามีUsernameนี้หรือยัง
  app.post('/checkUser',(req,res)=>{
    const gmail = req.body.gmail;
    db.query(
      "SELECT * FROM users WHERE gmail=?",
      [gmail],
      (err, results) => {
         if (err) {
          res.json({status:"error",message:err.message})
          return
        }if(results.length === 0){
          res.json({status:"ok",newUser:true})
          return
        }
        res.json({status:"ok",newUser:false})
      }
    );
  });
  //////login google///
  app.post("/auth/google", async (req, res) => {
    try{
      const token = req.headers.authorization.split(' ')[1]
      //console.log(token);
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID
      });
      //console.log(ticket.getPayload());
      const {email,name,picture}=ticket.getPayload()
      res.status(201)
      res.json({status:"ok",email:email,name:name,picture:picture})
    }catch (err){
      res.json({status:"error",message: err.message})
    }
  })

  app.post("/dataUser", (req, res) => {
    const gmail = req.body.gmail;
    db.query("SELECT * FROM users WHERE gmail=?",[gmail], (err, result) => {
      if (err) {
        res.json({status:"error",message:err.message})
      } else {
        if(result.length === 0){
          res.json({status:"error",message:"ไม่พบข้อมูล"})
        }
        else{
          res.json({status:"ok",id:result[0].userId,role:result[0].role})
        }
      }
    });
  });
  ///////////////////////////////////////////////////////////////////////////

  /////////////////////contact//////////////////////////////////////////////
  app.get("/contact", (req, res) => {
    db.query("SELECT * FROM contact", (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result[0]})
      }
    });
  });

  app.put("/updateContact", (req, res) => {
    const facebook	 = req.body.facebook;
    const line = req.body.line;
    const gmail = req.body.gmail;
    const phone = req.body.phone;
    const location = req.body.location;
    db.query("UPDATE contact SET facebook=?, line=?, gmail=?, phone=?, location=? WHERE contactId = ?",
      [facebook,line,gmail,phone,location,1],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
        } else {
          res.json({status:"ok",message: "update สำเร็จ"})
        }
      }
    );
  });
  //////////////////////////////////////////////////////////////////////////

  app.post("/userProfile", (req, res) => {
    const userId = parseInt(req.body.userId);
    db.query("SELECT * FROM users WHERE userId=?",[userId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        if(result.length===0){
          res.json({status:"error",message:"ไม่พบข้อมูล"})
        }else{
          if(result[0].myProfile!==null)
            res.json({status:"ok",myProfile:result[0].myProfile,familyProfile:result[0].familyProfile,incomeProfile:result[0].incomeProfile})
          else
            res.json({status:"error",message:"ยังไม่ได้กรอกข้อมูล"})
        }
      }
    });
  });

  app.put("/updateUserProfile",(req, res) => {
    const userId = parseInt(req.body.userId);
    const myProfile = req.body.myProfile;
    const familyProfile = req.body.familyProfile;
    const incomeProfile = req.body.incomeProfile;
    db.query("UPDATE users SET myProfile = ?,familyProfile=?,incomeProfile=? WHERE userId = ?",
      [myProfile,familyProfile,incomeProfile,userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
        } else {
          res.json({status:"ok",message:"อัปเดตสำเร็จ"})
        }
      }
    );
  });

  app.post('/addTotalScholarship', (req,res) => {
    const build = new Date().toISOString().slice(0, 16);
    const status = "recruit";
    const scholarshipName = req.body.scholarshipName;
    const academicYear = parseInt(req.body.academicYear);
    const term = req.body.term;
    const donorName = req.body.donorName;
    const details = req.body.details;
    const amount = parseInt(req.body.amount);
    const capital = parseInt(req.body.capital);
    const closeDate = req.body.closeDate;
    const applicantDocuments = req.body.applicantDocuments;
    const urlBase64Img = req.body.urlBase64Img;
    const urlBase64Details = req.body.urlBase64Details;
    const committee = req.body.committee;
    db.query(
      "INSERT INTO totalscholarship (build,status,scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,applicantDocuments,urlBase64Img,urlBase64Details,committee) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [build,status,scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,applicantDocuments,urlBase64Img,urlBase64Details,committee],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สร้างทุนสำเร็จ"})
        }
      }
    );
  })

  app.post("/totalScholarship", (req, res) => {
    const dataMysql = req.body.dataMysql;
    const searchStatus = req.body.searchStatus;
    const searchName = req.body.searchName;
    const page = req.body.page;
    let where =""
    let arr =[]
    if(searchStatus!=="all"){
      where= " WHERE status=?";
      arr=[searchStatus]
      if(searchName!=="all"){
        where = " WHERE status=? AND LOCATE(?,scholarshipName)>0";
        arr=[searchStatus,searchName]
      }
    }
    else if(searchName!=="all"){
      where = " WHERE LOCATE(?,scholarshipName)>0";
      arr=[searchName]
    }

    db.query("SELECT "+dataMysql+" FROM totalscholarship"+where+" ORDER BY build DESC",arr, (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        //if(searchName!=="all")
          //result=result.filter(data => data.scholarshipName.search(searchName)!==-1)
        res.json({status:"ok",contact:result.slice((parseInt(page)-1)*5,parseInt(page)*5),len:result.length})
      }
    });
  });

  app.post("/scholarshipForId", (req, res) => {
    const scholarshipId  = req.body.scholarshipId ;
    db.query("SELECT * FROM totalscholarship WHERE scholarshipId=?",[scholarshipId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        if(result.length===0){
          res.json({status:"error",message:"ไม่พบข้อมูลทุนนี้"})
        }else{
          res.json({status:"ok",contact:result})
        }
      }
    });
  });

  app.put("/deleteScholarshipForId", (req, res) => {
    const scholarshipId = req.body.scholarshipId
    db.query("DELETE FROM totalscholarship WHERE scholarshipId =?",[scholarshipId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",message:"ลบสำเร็จ"})
      }
    }); 
  });
  app.put('/updateScholarshipForId', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const scholarshipName = req.body.scholarshipName;
    const academicYear = parseInt(req.body.academicYear);
    const term = req.body.term;
    const donorName = req.body.donorName;
    const details = req.body.details;
    const amount = parseInt(req.body.amount);
    const capital = parseInt(req.body.capital);
    const closeDate = req.body.closeDate;
    const applicantDocuments = req.body.applicantDocuments;
    const urlBase64Img = req.body.urlBase64Img;
    const urlBase64Details = req.body.urlBase64Details;
    const committee = req.body.committee;
    db.query(
      "UPDATE totalscholarship SET scholarshipName=?,academicYear=?,term=?,donorName=?,details=?,amount=?,capital=?,closeDate=?,applicantDocuments=?,urlBase64Img=?,urlBase64Details=?,committee=?  WHERE scholarshipId=?",
      [scholarshipName,academicYear,term,donorName,details,amount,capital,closeDate,applicantDocuments,urlBase64Img,urlBase64Details,committee,scholarshipId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"อัปเดตสำเร็จ"})
        }
      }
    );
  })

  app.post('/applyScholarship', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const userId = req.body.userId;
    const latestUpdate = new Date().toISOString();//.slice(0, 16); //toLocaleString("en-GB", { timeZone:"Asia/Bangkok" }) 
    const recruitStatus = req.body.recruitStatus;
    const myProfile = req.body.myProfile;
    const familyProfile = req.body.familyProfile;
    const incomeProfile = req.body.incomeProfile;
    const idCard = req.body.idCard;
    const houseRegistration = req.body.houseRegistration;
    const essay = req.body.essay;
    const nisitPicture = req.body.nisitPicture;
    const housePicture = req.body.housePicture;
    const studyResults = req.body.studyResults; 
    const diseaseEffects = req.body.diseaseEffects;
    db.query(
      "INSERT INTO totalhistory (scholarshipId,userId,latestUpdate,recruitStatus,myProfile,familyProfile,incomeProfile,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
      [scholarshipId,userId,latestUpdate,recruitStatus,myProfile,familyProfile,incomeProfile,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สมัครสำเร็จ"})
        }
      }
    );
  })

  ///////////แก้ไขข้อมูลที่สมัคร///////////////
  app.put('/updateApplyScholarship', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const userId = req.body.userId;
    const latestUpdate = new Date().toISOString();//.slice(0, 16); //new Date().toLocaleString("en-GB", { timeZone:"Asia/Bangkok" }) //new Date().toISOString().slice(0, 16);
    const recruitStatus = req.body.recruitStatus;
    const myProfile = req.body.myProfile;
    const familyProfile = req.body.familyProfile;
    const incomeProfile = req.body.incomeProfile;
    const idCard = req.body.idCard;
    const houseRegistration = req.body.houseRegistration;
    const essay = req.body.essay;
    const nisitPicture = req.body.nisitPicture;
    const housePicture = req.body.housePicture;
    const studyResults = req.body.studyResults; 
    const diseaseEffects = req.body.diseaseEffects;
    db.query(
      "UPDATE totalhistory SET latestUpdate=?,recruitStatus=?,myProfile=?,familyProfile=?,incomeProfile=?,idCard=?,houseRegistration=?,essay=?,nisitPicture=?,housePicture=?,studyResults=?,diseaseEffects=? WHERE scholarshipId=? AND userId=? ",
      [latestUpdate,recruitStatus,myProfile,familyProfile,incomeProfile,idCard,houseRegistration,essay,nisitPicture,housePicture,studyResults,diseaseEffects,scholarshipId,userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"แก้ไขการสมัครสำเร็จ"})
        }
      }
    );
  })

  ///////////ตรวจว่า user คนนี้สมัครทุนนี้หรือยัง ///////////////
  app.post('/checkApplyScholarship', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const userId = req.body.userId;
    db.query(
      "SELECT * FROM totalhistory WHERE scholarshipId=? AND userId=?",[scholarshipId,userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          if(result.length===0){
            res.json({status:"ok",message:"ยังไม่ได้สมัคร"})
          }else{
            res.json({status:"ok",message:"สมัครทุนนี้แล้ว",contact:result[0]})
          }
        }
      }
    );
  })

  ///////////ตรวจว่า user คนนี้สมัครทุนนี้อะไรบ้าง ///////////////
  app.post('/checkApply', (req,res) => {
    const userId = req.body.userId;
    db.query(
      "SELECT totalHistoryId,scholarshipId,userId,latestUpdate,recruitStatus,interviewStatus,anouncementStatus,adminComment FROM totalhistory WHERE userId=? ORDER BY latestUpdate DESC",[userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          if(result===[]){
            res.json({status:"ok",contact:result})
            return
          }
         res.json({status:"ok",contact:result})
        }
      }
    );
  })
  //totalhistory.scholarshipId=totalscholarship.scholarshipId
  app.post('/userStatus', (req,res) => {
    const userId = req.body.userId;

    db.query(
      "SELECT totalHistoryId,totalhistory.scholarshipId,userId,latestUpdate,recruitStatus,interviewStatus,anouncementStatus,adminComment,scholarshipName,interviewDate,startInterview,endInterview,interviewDetails,meetingLink,academicYear,term FROM totalhistory,totalscholarship WHERE totalhistory.scholarshipId=totalscholarship.scholarshipId AND userId=? ORDER BY latestUpdate DESC",[userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
         res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ///////////ตรวจว่า ทุนนี้มีใครสมัครบ้าง///////////////
  app.post('/checkScholarship', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const dataMysql= req.body.dataMysql;
    db.query(
      "SELECT "+dataMysql+ " FROM totalhistory WHERE scholarshipId=?",[scholarshipId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ///////////แอดมินเข้ามาอัปเดตสถานะให้ user///////////////
  app.put('/updateStatusUser', (req,res) => {
    const totalHistoryId = req.body.totalHistoryId;
    const latestUpdate = new Date().toISOString(); //new Date().toLocaleString("en-GB", { timeZone:"Asia/Bangkok" })//toLocaleString()//toLocaleString("th-TH", { timeZone: "UTC" }) //toThaiDateString(new Date())
    const adminComment = req.body.adminComment
    const recruitStatus = req.body.recruitStatus
    const interviewStatus = req.body.interviewStatus
    const anouncementStatus = req.body.anouncementStatus
    db.query(
      "UPDATE totalhistory SET latestUpdate=?,adminComment=?,recruitStatus=?,interviewStatus=?,anouncementStatus=? WHERE totalHistoryId=?"
      ,[latestUpdate,adminComment,recruitStatus,interviewStatus,anouncementStatus,totalHistoryId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ"})
        }
      }
    );
  })

  ///////////ดูรายชื่อผู้มีสิทธิสัมภาษณ์ หรือ ผู้ได้รับทุน///////////////
  app.post('/getPassList', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const status= req.body.status;
    const dataMysql= req.body.dataMysql;
    let whereMysql = "";
    if(status==="interview"){
      whereMysql=" AND recruitStatus=?"
    }
    else if(status==="anouncement"){
      whereMysql=" AND interviewStatus=?"
    }
      db.query(
        "SELECT "+dataMysql+" FROM totalhistory WHERE scholarshipId=?"+whereMysql,[scholarshipId,"ผ่าน"], (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  app.post('/committeeSetScore', (req,res) => {
    const scholarshipId = req.body.scholarshipId;
    const userId = req.body.userId;
    const emailCommittee =req.body.emailCommittee;
    const giveScore= JSON.parse(req.body.giveScore);
    db.query(
      "SELECT totalHistoryId,toatalScore FROM totalhistory WHERE scholarshipId=? AND userId=?",[scholarshipId,userId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } 
        else {
          try{
            let arrToatalScore=[]
            if(result[0].toatalScore===null){
              arrToatalScore.push({
                emailCommittee:emailCommittee,
                giveScore:giveScore
              })
            }else{
              result[0].toatalScore=JSON.parse(result[0].toatalScore)
              let index = result[0].toatalScore.findIndex(data => data.emailCommittee === emailCommittee)
              if(index!==-1){
                result[0].toatalScore[index].giveScore=giveScore
              }
              else{
                result[0].toatalScore.push({
                  emailCommittee:emailCommittee,
                  giveScore:giveScore
                })
              }
              arrToatalScore=result[0].toatalScore
            }
            arrToatalScore=JSON.stringify(arrToatalScore)
            db.query(
              "UPDATE totalhistory SET toatalScore=? WHERE totalHistoryId=?"
              ,[arrToatalScore,result[0].totalHistoryId],
              (err, result) => {
                if (err) {
                  res.json({status:"error",message: err.message})
                  return
                } else {
                  res.json({status:"ok",message:"สำเร็จ"})
                }
              }
            );
          }catch (err){
            res.json({status:"error",message: err.message})
          }
        }
      }
    );
  })

  
  ///////////ตรวจหาทุนที่กำลังอยู่ในช่วงสัมภาษณ์///////////////
  app.post('/interviewSchedule', (req,res) => {
    const dataMysql= req.body.dataMysql;
    const email= req.body.email;
    db.query(
      "SELECT "+dataMysql+ " FROM totalscholarship WHERE status=? AND JSON_SEARCH(JSON_EXTRACT(committee, '$[*].email'),'one',?) IS NOT NULL",["interview",email],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ///////////ตรวจหาทุนที่กำลังอยู่ในช่วงสัมภาษณ์///////////////
  app.post('/interviewAdmin', (req,res) => {
    const dataMysql= req.body.dataMysql;
    db.query(
      "SELECT "+dataMysql+ " FROM totalscholarship WHERE status=?",["interview"],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

    ///////////ดึงข้อมูลรายชื่อผู้ให้ทุนทั้งหมด///////////////
    app.get('/getAllDonorName', (req,res) => {
      db.query(
        "SELECT DISTINCT donorName  FROM totalscholarship",
        (err, result) => {
          if (err) {
            res.json({status:"error",message: err.message})
            return
          } else {
            res.json({status:"ok",contact:result})
          }
        }
      );
    })

    ///////////ดึงข้อมูลรายปีการศึกษาทั้งหมด///////////////
    app.get('/getAllAcademicYear', (req,res) => {
      db.query(
        "SELECT DISTINCT academicYear  FROM totalscholarship",
        (err, result) => {
          if (err) {
            res.json({status:"error",message: err.message})
            return
          } else {
            res.json({status:"ok",contact:result})
          }
        }
      );
    })
  
  ///////////ดึงรูปโฆษณาทั้งหมด///////////////
  app.get('/getAdvertimage', (req,res) => {
    db.query(
      "SELECT * FROM advert",
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ///////////แอดมินเข้ามาแก้ไขรูปโฆษณา///////////////
  app.put('/updateAdvert', (req,res) => {
    const advertId = parseInt(req.body.advertId) ;
    const advertImg = req.body.advertImg
    db.query(
      "UPDATE advert SET advertImg=? WHERE advertId=?"
      ,[advertImg,advertId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ"})
        }
      }
    );
  })

  app.post('/addAdvert', (req,res) => {
    const advertImg = req.body.advertImg
    db.query(
      "INSERT INTO advert (advertImg) VALUES (?)",
      [advertImg],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ",contact:result})
        }
      }
    );
  })


  app.put("/deleteAdvert", (req, res) => {
    const advertId = req.body.advertId
    db.query("DELETE FROM advert WHERE advertId =?",[advertId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
        return
      } else {
        res.json({status:"ok",message:"สำเร็จ",contact:result})
      }
    }); 
  });

  app.post('/addNews', (req,res) => {
    const newsTitle = req.body.newsTitle
    const newsImg = req.body.newsImg
    const newsDetails = req.body.newsDetails
    const newsLink = req.body.newsLink
    db.query(
      "INSERT INTO news (newsTitle,newsImg,newsDetails,newsLink) VALUES (?,?,?,?)",
      [newsTitle,newsImg,newsDetails,newsLink],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ",contact:result})
        }
      }
    );
  })

  app.put("/deleteNews", (req, res) => {
    const newsId = req.body.newsId
    db.query("DELETE FROM news WHERE newsId =?",[newsId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
        return
      } else {
        res.json({status:"ok",message:"สำเร็จ",contact:result})
      }
    }); 
  });

  ///////////แอดมินเข้ามาแก้ไขข่าวสาร///////////////
  app.put('/updateNews', (req,res) => {
    const newsId = parseInt(req.body.newsId) ;
    const newsTitle = req.body.newsTitle
    const newsImg = req.body.newsImg
    const newsDetails = req.body.newsDetails
    const newsLink = req.body.newsLink
    db.query(
      "UPDATE news SET newsTitle=?,newsImg=?,newsDetails=?,newsLink=? WHERE newsId=?"
      ,[newsTitle,newsImg,newsDetails,newsLink,newsId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ"})
        }
      }
    );
  })


  ///////////ดึงข้อมูลข่าวทั้งหมด///////////////
  app.get('/getNews', (req,res) => {
    db.query(
      "SELECT * FROM news",
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

   ///////////ดึงรูปหน้าแนะนำทั้งหมด///////////////
   app.get('/getIntroductionImage', (req,res) => {
    db.query(
      "SELECT * FROM introduction",
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })
   ///////////เพิ่มรูปหน้าแนะนำ///////////////
  app.post('/addIntroduction', (req,res) => {
    const introductionImg= req.body.introductionImg
    db.query(
      "INSERT INTO introduction (introductionImg) VALUES (?)",
      [introductionImg],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ",contact:result})
        }
      }
    );
  })

   ///////////ลบรูปหน้าแนะนำ///////////////
  app.put("/deleteIntroduction", (req, res) => {
    const introductionId = req.body.introductionId
    db.query("DELETE FROM introduction WHERE introductionId=?",[introductionId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
        return
      } else {
        res.json({status:"ok",message:"สำเร็จ",contact:result})
      }
    }); 
  });

  ///////////แอดมินเข้ามาแก้ไขรูปหน้าแนะนำ///////////////
  app.put('/updateIntroduction', (req,res) => {
    const introductionId = parseInt(req.body.introductionId) ;
    const introductionImg = req.body.introductionImg
    db.query(
      "UPDATE introduction SET introductionImg=? WHERE introductionId=?"
      ,[introductionImg,introductionId],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",message:"สำเร็จ"})
        }
      }
    );
  })


  /////อัปเดต สถานะของทุน//////
  app.put("/updateStatusScholarship", (req, res) => {
    const scholarshipId = req.body.scholarshipId;
    const status = req.body.status;
    //console.log(tmp);
    db.query("UPDATE totalscholarship SET status=? WHERE scholarshipId=?",[status,scholarshipId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",message:"อัปเดตสำเร็จ",contact:result})
      }
    });
  });

  /////ดูประวัติว่ารับทุนอะไรแล้วบ้าง//////
  app.post("/getHistoryReceive", (req, res) => {
    const userId = req.body.userId;
    db.query("SELECT scholarshipName,academicYear,ts.scholarshipId,userId,term FROM totalscholarship ts,totalhistory th WHERE th.userId=? AND ts.scholarshipId=th.scholarshipId AND anouncementStatus='ผ่าน'",[userId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result})
      }
    });
  });

  /////ดูคะแนนที่ได้จากทุนนั้น//////
  app.post("/getHistoryScore", (req, res) => {
    const scholarshipId = req.body.scholarshipId;
    const userId = req.body.userId;
    db.query("SELECT scholarshipName,criterion,committee,toatalScore,users.myProfile FROM totalscholarship ts,totalhistory th,users WHERE th.scholarshipId=? AND th.userId=? AND ts.scholarshipId=th.scholarshipId AND th.userId=users.userId",[scholarshipId,userId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result})
      }
    });
  });

  ////แอดมินดูข้อมูลนิสิตหน้าประว้ติ
  app.post('/adminGetUserData', (req,res) => {
    const searchName = req.body.searchName;
    const searchStudentID = req.body.searchStudentID;
    const searchMajor = req.body.searchMajor;
    const searchClass = req.body.searchClass;
    where_mysql = ""
    if(searchName !="none"){
      where_mysql +=" AND locate('"+searchName+"',JSON_EXTRACT(myProfile, '$.myFirstName'))>0"
    }
    if(searchStudentID !="none"){
      where_mysql +=" AND locate('"+searchStudentID+"',JSON_EXTRACT(myProfile, '$.studentID'))>0"
    }
    if(searchMajor !="none"){
      where_mysql +=" AND locate('"+searchMajor+"',JSON_EXTRACT(myProfile, '$.major'))>0"
    }
    if(searchClass !="none"){
      where_mysql +=" AND locate('"+searchClass+"',JSON_EXTRACT(myProfile, '$.class'))>0"
    }
    db.query(
      "SELECT userId,myProfile FROM users WHERE role='user'"+where_mysql,
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ////แอดมินดูข้อมูลผู้ให้บริจาค
  app.post('/adminGetDonorData', (req,res) => {
    const searchDonorName = req.body.searchDonorName
    const searchAcademicYear = req.body.searchAcademicYear
    where_mysql = ""
    if(searchDonorName !="none"){
      where_mysql +=" WHERE locate('"+searchDonorName+"',donorName)>0"
    }
    if(searchAcademicYear !="none"){
      if(where_mysql === ""){
        where_mysql +=" WHERE academicYear="+searchAcademicYear
      }else{
        where_mysql +=" AND academicYear="+searchAcademicYear
      }
    }
    db.query(
      "SELECT scholarshipId,scholarshipName,donorName,academicYear,amount,capital FROM totalscholarship"+where_mysql,
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  ////แอดมินดูรายชื่อกรรมการ
  app.get("/getAllCommittee", (req, res) => {
    db.query("SELECT userId,gmail,role FROM users WHERE role='committee'", (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  ////แอดมินดูประวัติกรรมการ
  app.post("/getHistoryCommittee", (req, res) => {
    const gmail = req.body.gmail
    db.query("SELECT scholarshipId,scholarshipName,interviewDate,startInterview,endInterview FROM totalscholarship WHERE JSON_SEARCH(JSON_EXTRACT(committee, '$[*].email'),'one',?) IS NOT NULL ORDER BY build DESC",[gmail], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  ////ดูrole จาก userid
  app.post("/getCheckRole", (req, res) => {
    const userId = req.body.userId
    db.query("SELECT gmail,role,myProfile FROM users WHERE userId=?",[userId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  ////เช็คว่า mail นี้เป็น role อะไร
  app.post("/getRoleFormGmail", (req, res) => {
    const gmail = req.body.gmail
    db.query("SELECT userId,role FROM users WHERE gmail=?",[gmail], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  ////เพิ่ม committee
  app.post("/addNewCommittee", (req, res) => {
    const gmail = req.body.gmail
    const role = "committee"
    db.query("INSERT INTO users (gmail,role) VALUES (?,?)",
      [gmail,role], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  ////อัปเดต role
  app.put("/editRole", (req, res) => {
    const gmail = req.body.gmail
    const role = req.body.role
    db.query("UPDATE users SET role=? WHERE gmail=?",[role,gmail], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result})
      }
    });
  });

  ////ลบ mail
  app.put("/deleteGmail", (req, res) => {
    const gmail = req.body.gmail
    db.query("DELETE FROM users WHERE gmail =?",[gmail], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        res.json({status:"ok",contact:result})
      }
    });
  });







  //"SELECT * FROM users WHERE JSON_EXTRACT(myProfile, '$.myFirstName')=? ",["ธาราดล"]
  //SELECT totalHistoryId,totalhistory.scholarshipId,userId,latestUpdate,recruitStatus,interviewStatus,anouncementStatus,adminComment,scholarshipName,interviewDate,startInterview,endInterview,interviewDetails,meetingLink FROM totalhistory,totalscholarship WHERE totalhistory.scholarshipId=totalscholarship.scholarshipId AND userId=? ORDER BY latestUpdate DESC"
  app.get('/test', (req,res) => {
    db.query(
      "SELECT JSON_SEARCH(JSON_EXTRACT(committee, '$[*].email'),'one','committeeG6.2@gmail.com') IS NOT NULL FROM totalscholarship WHERE scholarshipId=?",[12],
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  app.get('/test4', (req,res) => {
    const searchName = "none" //req.body.searchName;
    const searchStudentID = "none"//req.body.searchStudentID;
    const searchMajor = "คอม"//req.body.searchMajor;
    const searchClass = "3"//req.body.searchClass;
    where_mysql = ""
    if(searchName !="none"){
      where_mysql +=" AND locate('"+searchName+"',JSON_EXTRACT(myProfile, '$.myFirstName'))>0"
    }
    if(searchStudentID !="none"){
      /*if(where_mysql!=""){
        where_mysql+=" AND"
      }*/
      where_mysql +=" AND locate('"+searchStudentID+"',JSON_EXTRACT(myProfile, '$.studentID'))>0"
    }
    if(searchMajor !="none"){
      /*if(where_mysql!=""){
        where_mysql+=" AND"
      }*/
      where_mysql +=" AND locate('"+searchMajor+"',JSON_EXTRACT(myProfile, '$.major'))>0"
    }
    if(searchClass !="none"){
      /*if(where_mysql!=""){
        where_mysql+=" AND"
      }*/
      where_mysql +=" AND locate('"+searchClass+"',JSON_EXTRACT(myProfile, '$.class'))>0"
    }
    db.query(
      "SELECT userId,myProfile FROM users WHERE role='user'"+where_mysql,
      (err, result) => {
        if (err) {
          res.json({status:"error",message: err.message})
          return
        } else {
          res.json({status:"ok",contact:result})
        }
      }
    );
  })

  app.get("/test2", (req, res) => {
    db.query("SELECT scholarshipName,LOCATE(?,scholarshipName)>0 FROM totalscholarship WHERE LOCATE(?,scholarshipName)>0 ORDER BY build DESC",["te","te"], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        //if(searchName!=="all")
          //result=result.filter(data => data.scholarshipName.search(searchName)!==-1)
        res.json({status:"ok",contact:result,len:result.length})
      }
    });
  });

  app.post("/test3", (req, res) => {
    const scholarshipId = req.body.scholarshipId;
    const latestUpdate = new Date().toISOString(); 
    const interviewStatus = req.body.interviewStatus
    const anouncementStatus = req.body.anouncementStatus
    let tmp = req.body.chooseUserId
    tmp=tmp.replace("[","(");
    tmp=tmp.replace("]",")");
    //console.log(tmp);
    db.query("UPDATE totalhistory SET latestUpdate=?,interviewStatus=?,anouncementStatus=? WHERE scholarshipId=? AND userId IN "+tmp,[latestUpdate,interviewStatus,anouncementStatus,scholarshipId], (err, result) => {
      if (err) {
        res.json({status:"error",message: err.message})
      } else {
        //if(searchName!=="all")
          //result=result.filter(data => data.scholarshipName.search(searchName)!==-1)
        res.json({status:"ok",message:"อัปเดตสำเร็จ",contact:result})
      }
    });
  });

  app.listen(3001, () => {
    console.log("Yey, your server is running on port 3001");
  });

  /*  //////////////การสมัคร + login////////////////////////////
  ////สมัคร
    ///////ตรวจ token
  app.post('/authen',(req,res)=>{
    try{
      const token = req.headers.authorization.split(' ')[1]
      var decoded = jwt.verify(token, secret);
      res.json({status:"ok",decoded})
    }catch (err){
      res.json({status:"error",message: err.message})
    }
  })
  ///////
  app.post('/register',(req,res)=>{
    const role = req.body.role;
    bcrypt.hash(password, saltRounds, function(err, hash) {
      db.query(
        "INSERT INTO users (username, password, role) VALUES (?,?,?)",
        [username, hash, role],
        (err, result) => {
          if (err) {
            res.json({status:"error",message:err})
          } else {
            res.json({status:"ok"})
          }
        }
      );
    });
  });
  
  ///////ทำการ login + ให้ token
  app.post('/login',(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    db.query('SELECT * FROM users WHERE username=?',[username],(err,results)=>{
      if(err){
          res.json({status:"error",message: err})
          return
      }
      if(results.length == 0){
        res.json({status:"error",message: "no user found"})
        return
      }
      bcrypt.compare(password, results[0].password, function(err, result) {
          if(err){
            res.json({status:"error",message: err})
          }else if(result){
            var token = jwt.sign({ username:results[0].username , role:results[0].role }, secret, { expiresIn: '6h' });
            res.json({status:"ok",token:token ,message: "login success"})
          }else{
            res.json({status:"error",message: "wrong password"})
          }
      });
    });
  }); */
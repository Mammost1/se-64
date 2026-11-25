import './TotalScoreAdmin.css';
const TotalScoreAdmin = () => {
    return(<>
        <div className="container">
            <div id="container-TotalScore">
                <h2>รายชื่อลำดับคะแนน</h2>
            </div>
            <div id="container-TotalScore-box">
                <a>ทุน"มูลนิธิ ทางสู้ฝันปั่นคนเก่ง"</a>  <a1>จำนวน 1 ทุน</a1>
            </div>
            <div id="container-TotalScore-box1">
            </div>

            <div id="container-TotalScore-box2">
                <a>ลำดับที่ 1  นายหมูแพง ชาบูขึ้น  6xxxxxxxxx คะแนนเฉลี่ยรวม 50 คะแนน เคยได้ทุน  2  ครั้ง</a><input type={"checkbox"}></input>
                <br></br>
                <br></br>
                <a>ลำดับที่ 2  นายหมูแพง ชาบูขึ้น  6xxxxxxxxx คะแนนเฉลี่ยรวม 49 คะแนน เคยได้ทุน  2  ครั้ง</a><input type={"checkbox"}></input>
                <div>
                   <button className="container-TotalScore-btn-1">ยืนยันผู้ได้รับทุน</button>
                   <button className="container-TotalScore-btn">แก้ไข</button> 
                </div>
                
            </div>
             
    
           

        </div>
    </>)
}
export default TotalScoreAdmin;
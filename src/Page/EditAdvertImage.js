import React, { useState,useEffect } from 'react'
const EditAdvertImage = () => {
    const [imgData,setImgData] = useState({data:[
        "https://www.eng.ku.ac.th/wp-content/uploads/2021/02/covidposter-2048x640-1-1024x320.jpg",
        "https://www.eng.ku.ac.th/news/wp-content/uploads/2021/10/Hona-ne04-1024x590.jpg",
        "https://www.img.in.th/images/b745c596c45f84c2cf43a8d566784b75.png"
    ]})

    const dataToUrlBase64 =(index,file)=>{
        let newImgData = imgData.data;
        let document = "";
        let reader = new FileReader();
        reader.readAsDataURL(file)
        reader.onload = function () {
            document = reader.result;
            newImgData[index] = document
            setImgData({data:newImgData}) 
        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
            newImgData[index] = "#"
            setImgData({data:newImgData}) 
        };
    }
    const editImgData =(index,e)=>{
        if(e.target.files[0].size > 10000000){
            alert("File is too big!"+e.target.files[0].size);
        }
        else{
            dataToUrlBase64(index,e.target.files[0])
        }
    }

    return(<>
        <div class='pt-5'>
            <div className="App container-fluid" style={{}}>
                <div id="demo" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" class="active"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
                        <button type="button" data-bs-target="#demo" data-bs-slide-to="2"></button>
                    </div>
                    <div class="carousel-inner">
                        {imgData.data.map((data,index)=>{
                            return(<>
                                <div class={index===0?"carousel-item active":"carousel-item"}>
                                    <div class="input-group mb-3" style={{zIndex:"10"}}>
                                        <span class="input-group-text">{"Advert Image " + (index+1).toString()}</span>
                                        <input type="file" class="form-control" placeholder="file img" accept="image/*" onChange={(e)=>editImgData(index,e)} />
                                    </div>
                                    <img src={data} style={{width:"100%",height:"500px"}}/>
                                </div>
                            </>)
                        })}
                    </div>

                    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev">
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next">
                        <span class="carousel-control-next-icon"></span>
                    </button>
                </div>
            </div>
            
            <br/>
            <br/>
            <div style={{margin:"1%"}}>
                <div class="input-group mb-3" style={{zIndex:"10"}}>
                    <span class="input-group-text">{" New Advert Image "}</span>
                    <input type="file" class="form-control" placeholder="file img" accept="image/*" />
                </div>
                <img src={"https://www.eng.ku.ac.th/wp-content/uploads/2021/02/covidposter-2048x640-1-1024x320.jpg"} style={{width:"100%",height:"500px"}}/>
                <button>เพิ่มรูปใหม่</button>
            </div>

        </div>
    </>)
}
export default EditAdvertImage;

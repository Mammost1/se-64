import '../App.css';
import {IconContext} from "react-icons";
import {BsBroadcastPin, BsFillPlusCircleFill} from "react-icons/bs";
import { FaTrash,FaEdit } from "react-icons/fa";
import React, { useState,useEffect ,useContext} from 'react'
import axios from 'axios';
import ViewLoading from '../View/ViewLoading';
import ViewConfirm from '../View/ViewConfirm';
import { Modal } from 'bootstrap'
import { AuthContext } from "../Auth/Auth";

const Home = () => {
    const {role} = useContext(AuthContext)
    const [imgData,setImgData] = useState({data:[
        "https://www.eng.ku.ac.th/wp-content/uploads/2021/02/covidposter-2048x640-1-1024x320.jpg",
        "https://www.eng.ku.ac.th/news/wp-content/uploads/2021/10/Hona-ne04-1024x590.jpg",
        "https://www.img.in.th/images/b745c596c45f84c2cf43a8d566784b75.png"
    ]})
    const [tmpImgData,setTmpImgData] = useState("#")
    const [loadNewImage,setLoadNewImage] = useState(false)
    const [loading,setLoading] = useState(true)
    const [loadingNews,setLoadingNews] = useState(true)
    const [loadModal,setLoadModal] = useState(false)

    const [newsData,setNewsData] = useState({data:[]})
    const [tmpNewsData,setTmpNewsData] = useState({
        newsTitle:"",
        newsImg:"",
        newsDetails:"",
        newsLink:""
    })
    const [loadNews,setLoadNews] = useState(false)

    const bufferToBase64=(buffer)=>{
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode( bytes[ i ] );
        }
        return(binary)
    }

    const dataToUrlBase64 =(file)=>{
        if(file.size < 10000000){
            let document = "";
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function () {
                document = reader.result;
                setTmpImgData(document) 
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                setTmpImgData("#") 
            };
        }
        else{
            alert("File is too big!"+file.size);
        }
    }
    const editImege =(index,advertId)=>{
        setLoadNewImage(true)
        axios.put("http://localhost:3001/updateAdvert",{
            advertId:advertId,
            advertImg:tmpImgData
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newImgData = imgData.data;
                newImgData[index].advertImg = tmpImgData
                setImgData({data:newImgData}) 
                setLoadNewImage(false)
            }else{
                alert(response.data.message);
                setLoadNewImage(false)
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/updateAdvert)")
        })
    }
    const addImege =()=>{
        setLoadNewImage(true)
        axios.post("http://localhost:3001/addAdvert",{
            advertImg:tmpImgData
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact.insertId);
                let newImgData = imgData.data;
                newImgData.push({advertId:response.data.contact.insertId,advertImg:tmpImgData})
                setImgData({data:newImgData}) 
                setLoadNewImage(false)
                document.getElementById("myModal-close").click();
                //window.location.reload(false);
            }else{
                alert(response.data.message);
                setLoadNewImage(false)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/addAdvert)")
        })
    }

    const deleteImege =(advertId,index)=>{
        setLoadModal(true)
        axios.put("http://localhost:3001/deleteAdvert",{
            advertId:advertId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newImgData = imgData.data;
                newImgData.splice(index, 1)
                if(index === newImgData.length && newImgData.length !== 0){
                    document.getElementById("carousel-"+(index-1).toString()).click();
                }
                document.getElementById("myModal-delete-close"+index.toString()).click();
                setImgData({data:newImgData})
                setLoadModal(false)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/deleteAdvert)")
        })
    }

    const changeTmpNewsData =(name,value) =>{
        setTmpNewsData(tmpNewsData => ({
                ...tmpNewsData,
                [name]: value
        }));
    }

    const dataNewImgToUrlBase64 =(file)=>{
        if(file.size < 10000000){
            let document = "";
            let reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onload = function () {
                document = reader.result;
                changeTmpNewsData("newsImg",document) 
            };
            reader.onerror = function (error) {
                console.log('Error: ', error);
                changeTmpNewsData("newsImg","#") 
            };
        }
        else{
            alert("File is too big!"+file.size);
        }
    }

    const addNews=()=>{
        setLoadNews(true)
        axios.post("http://localhost:3001/addNews",{
            newsTitle:tmpNewsData.newsTitle,
            newsImg:tmpNewsData.newsImg,
            newsDetails:tmpNewsData.newsDetails,
            newsLink:tmpNewsData.newsLink
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact.insertId);
                let newNewsData = newsData.data;
                newNewsData.push({newsId:response.data.contact.insertId,newsTitle:tmpNewsData.newsTitle,newsImg:tmpNewsData.newsImg,newsDetails:tmpNewsData.newsDetails,newsLink:tmpNewsData.newsLink})
                setNewsData({data:newNewsData})
                setLoadNews(false)
                document.getElementById("myModalAddnew-close").click();
                //window.location.reload(false);
            }else{
                alert(response.data.message);
                setLoadNewImage(false)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/addNews)")
        })
    }

    const editNews =(newsId,index)=>{
        setLoadNews(true)
        axios.put("http://localhost:3001/updateNews",{
            newsId:newsId,
            newsTitle:tmpNewsData.newsTitle,
            newsImg:tmpNewsData.newsImg,
            newsDetails:tmpNewsData.newsDetails,
            newsLink:tmpNewsData.newsLink
        })
        .then((response) => {
            if(response.data.status==="ok"){
                //console.log(response.data);
                let newNewsData = newsData.data;
                newNewsData[index]={newsTitle:tmpNewsData.newsTitle,newsImg:tmpNewsData.newsImg,newsDetails:tmpNewsData.newsDetails,newsLink:tmpNewsData.newsLink}
                document.getElementById("myModalEditnew-close"+index.toString()).click();
                setNewsData({data:newNewsData})
                setLoadNews(false)
            }else{
                alert(response.data.message);
                setLoadNews(false)
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/updateNews)")
        })
    }


    const deleteNews=(newsId,index)=>{
        setLoadModal(true)
        axios.put("http://localhost:3001/deleteNews",{
            newsId:newsId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newNewsData = newsData.data;
                newNewsData.splice(index, 1)
                document.getElementById("myModal-delete-close-new"+index.toString()).click();
                setNewsData({data:newNewsData})
                setLoadModal(false)
                //alert("ลบแล้ว")
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/deleteNews)")
        })
    }


    useEffect(() => {
        axios.get("http://localhost:3001/getAdvertimage")
        .then((response) => {
            if(response.data.status==="ok"){
                response.data.contact.map((data)=>{
                    data.advertImg = bufferToBase64(data.advertImg.data)
                })
                console.log(response.data.contact);
                setImgData({data:response.data.contact});
            }
            else{
                alert(response.data.message)
            }
            setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ get http://localhost:3001/getAdvertimage ได้")
        })

        axios.get("http://localhost:3001/getNews")
        .then((response) => {
            if(response.data.status==="ok"){
                response.data.contact.map((data)=>{
                    data.newsImg = bufferToBase64(data.newsImg.data)
                })
                console.log(response.data.contact);
                setNewsData({data:response.data.contact})
            }
            else{
                alert(response.data.message)
            }
            setLoadingNews(false)
        },(err)=>{
            alert("ไม่สามารถ get http://localhost:3001/getNews ได้")
        })
    }, []);
    if(loading || loadingNews){
        return <ViewLoading/>
    }
    return(<> 
        <div class='pt-5'style={{fontFamily:'Prompt'}}>
            <div className="App container-fluid" >
                <div id="demo" class="carousel slide" data-bs-ride="carousel">
                    <div class="carousel-indicators">
                        {imgData.data.map((data,index)=>{
                            return <button type="button" id={"carousel-"+index.toString()} data-bs-target="#demo" data-bs-slide-to={index.toString()} class={index===0?"active":""}></button>
                        })} 
                    </div>
                    <div class="carousel-inner">
                        {imgData.data.map((data,index)=>{
                            return(<>
                                <div class={index===0?"carousel-item active":"carousel-item"}>
                                    <div class="mt-3">
                                        <div  style={{backgroundImage:"url("+data.advertImg+")",width:"100%",height:"350px",backgroundRepeat:'no-repeat',backgroundSize:'contain',backgroundPosition:'center'}}>
                                            {(()=>{
                                                if(role==="admin"){
                                                    return(<>
                                                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#myModal"+index.toString()} onClick={()=>setTmpImgData(data.advertImg)} >
                                                            <FaEdit style={{color:'#ffc902'}}/>
                                                        </button>
                                                        <button type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#myModal-delete"+index.toString()} >
                                                            <FaTrash style={{color:'#d21502'}}/>
                                                        </button>
                                                    </>)
                                                }
                                            })()}
                                        </div>
                                        
                                    </div>
                                    
                                </div>
                                {(()=>{
                                    if(role==="admin"){
                                        return(<>
                                            <ViewConfirm 
                                                modalId={"myModal-delete"+index.toString()} 
                                                heading="ลบรูป" 
                                                body={(<><img src={data.advertImg} style={{width:"100%",height:"auto"}}/><p>คุณยืนยันที่จะลบหรือไม่</p></>)}
                                                functionConfirm ={()=>deleteImege(data.advertId,index)} 
                                                closeId={"myModal-delete-close"+index.toString()}
                                                load={loadModal}
                                            />

                                            <div class="modal fade " id={"myModal"+index.toString()} > 
                                                <div class="modal-dialog">
                                                    <div class="modal-content">

                                                        <div class="modal-header">
                                                            <h4 class="modal-title">Edit image</h4>
                                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                                        </div>

                                                        <div class="modal-body">
                                                            {(()=>{
                                                                if(loadNewImage){
                                                                    return <div class="spinner-border text-warning"></div>
                                                                }else{
                                                                    return(<>
                                                                    <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                                        <input type="file" class="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataToUrlBase64(e.target.files[0])}/>
                                                                    </div>
                                                                    <img src={tmpImgData} style={{width:"100%",height:"auto"}}/> 
                                                                    </>)
                                                                }
                                                            })()}
                                                        </div>


                                                        <div class="modal-footer">
                                                            {(()=>{
                                                                if(tmpImgData!==data.advertImg && !loadNewImage){
                                                                    return <button type="button" class="btn btn-warning" onClick={()=>editImege(index,data.advertId)}>แก้ไข</button>
                                                                }
                                                            })()}
                                                            <button type="button" class="btn btn-danger close" data-bs-dismiss="modal">Close</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    }
                                })()}
                            </>)
                        })}
                    </div>
                    

                    <button class="carousel-control-prev" type="button" data-bs-target="#demo" data-bs-slide="prev" style={{backgroundColor:'black',opacity:'0.1'}}>
                        <span class="carousel-control-prev-icon"></span>
                    </button>
                    <button class="carousel-control-next" type="button" data-bs-target="#demo" data-bs-slide="next" style={{backgroundColor:'black',opacity:'0.1'}}>
                        <span class="carousel-control-next-icon" ></span>
                    </button>
                </div>
            </div>
            
            {(()=>{
                if(role==="admin"){
                    return(<>
                    <div class="d-flex pt-2 justify-content-center">
                        <button style={{borderRadius:'100px',marginLeft:'15px'}}  type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal"onClick={()=>setTmpImgData("")}>
                            เพิ่มรูปใหม่
                        </button>
                        <button style={{borderRadius:'100px',marginLeft:'15px'}}  type="button" class="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModalAddNew"onClick={()=>setTmpNewsData({newsTitle:"",newsImg:"",newsDetails:"",newsLink:""})} >
                            เพิ่มข่าวใหม่
                        </button>
                    </div>

                    <div class="modal fade" id="myModal">
                        <div class="modal-dialog">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h4  class="modal-title">เพิ่มรูปใหม่</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                {(()=>{
                                    if(loadNewImage){
                                        return <div class="spinner-border text-warning"></div>
                                    }else{
                                        return(<>
                                            <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                <input type="file" class="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataToUrlBase64(e.target.files[0])}/>
                                            </div>
                                            <img src={tmpImgData} style={{width:"100%",height:"auto"}}/> 
                                        </>)
                                    }
                                })()}
                            </div>
                            <div class="modal-footer">
                                {(()=>{
                                    if(tmpImgData!==""){
                                        return <button type="button" class="btn btn-primary" onClick={()=>addImege()}>เพิ่ม</button>
                                    }
                                })()}
                                <button type="button" id ="myModal-close" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>

                    <div class="modal fade" id="myModalAddNew">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                            <div class="modal-header">
                                <h4 class="modal-title">เพิ่มข่าวใหม่</h4>
                                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div class="modal-body">
                                {(()=>{
                                    if(loadNews){
                                        return <div class="spinner-border text-warning"></div>
                                    }else{
                                        return(<>
                                            <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                <span className="input-group-text">Title</span>
                                                <input type="text" class="form-control" placeholder="Title" value={tmpNewsData.newsTitle} onChange={(e)=>changeTmpNewsData("newsTitle",e.target.value)}/>
                                            </div>

                                            <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                <span className="input-group-text">Image</span>
                                                <input type="file" class="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataNewImgToUrlBase64(e.target.files[0])}/>
                                            </div>
                                            <img src={tmpNewsData.newsImg} style={{width:"100%",height:"auto"}}/> 

                                            <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                <span className="input-group-text">Details</span>
                                                <textarea style={{width:"100%",height:"200px"}} value={tmpNewsData.newsDetails} onChange={(e)=>changeTmpNewsData("newsDetails",e.target.value)}></textarea>
                                            </div>

                                            <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                <span className="input-group-text">Link</span>
                                                <input type="text" class="form-control" placeholder="Link" value={tmpNewsData.newsLink} onChange={(e)=>changeTmpNewsData("newsLink",e.target.value)}/>
                                            </div>
                                            </>)
                                    }
                                })()}
                            </div>
                            <div class="modal-footer">
                                {(()=>{
                                    if(tmpNewsData.newsTitle!=="",tmpNewsData.newsImg!=="",tmpNewsData.newsDetails!=="",tmpNewsData.newsLink!==""){
                                        return <button type="button" class="btn btn-primary" onClick={()=>addNews()}>เพิ่มข่าวใหม่</button>
                                    }
                                })()}
                                <button type="button" id ="myModalAddnew-close" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                            </div>
                            </div>
                        </div>
                    </div>
                    </>) 
                }
            })()}
            


            <div class='mt-2 overflow-auto' style={{backgroundColor:'rgba(196, 196, 196, 0.29)'}}>
            <div class='max-width' style={{marginTop:'',width:'100%',backgroundColor:'rgba(196, 196, 196, 0.29)'}}>
                <h1 style={{textAlign:'left',color:'#800000',fontFamily:'Prompt',width:''}}><BsBroadcastPin style={{color:'#800000',paddingBottom:5}}/> ข่าวสาร</h1>
            </div>
            <div class='d-inline-flex'>  
            {newsData.data.map((data,index)=>{
                return(<>          
                <div class='container'>
                    {(()=>{
                        if(role==="admin"){
                            return (<>
                                <button type="button" class="btn btn-sm" data-bs-toggle="modal"  data-bs-target={"#myModalUpdateNew"+index.toString()} onClick={()=>setTmpNewsData({newsTitle:data.newsTitle,newsImg:data.newsImg,newsDetails:data.newsDetails,newsLink:data.newsLink})}>
                                    <FaEdit style={{color:'#ffc902'}}/>
                                </button>
                                <button type="button" class="btn btn-sm" data-bs-toggle="modal"  data-bs-target={"#myModal-delete-new"+index.toString()} >
                                    <FaTrash style={{color:'#d21502'}}/>
                                </button>
                                <ViewConfirm 
                                    modalId={"myModal-delete-new"+index.toString()} 
                                        heading={"ลบข่าว " +data.newsTitle}
                                        body={
                                            (<>
                                                <div style={{width:"100%",justifyContent:"center",display:"flex"}}>
                                                    <img src={data.newsImg} style={{width:"80%",height:"auto"}} />
                                                </div>
                                                <br/>
                                                <div style={{width:"100%",justifyContent:"center",display:"flex"}}>
                                                    <textarea value={data.newsDetails} style={{width:"90%"}} rows="15"  disabled/>
                                                </div>
                                            </>)
                                        }
                                        functionConfirm ={()=>deleteNews(data.newsId,index)} 
                                        closeId={"myModal-delete-close-new"+index.toString()}
                                        load={loadModal}
                                />

                                <div class="modal fade" id={"myModalUpdateNew"+index.toString()}>
                                    <div class="modal-dialog modal-lg">
                                        <div class="modal-content">
                                        <div class="modal-header">
                                            <h4 class="modal-title">แก้ไขข่าว</h4>
                                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                        </div>
                                        <div class="modal-body">
                                            {(()=>{
                                                if(loadNews){
                                                    return <div class="spinner-border text-warning"></div>
                                                }else{
                                                    return(<>
                                                        <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                            <span className="input-group-text">Title</span>
                                                            <input type="text" class="form-control" placeholder="Title" value={tmpNewsData.newsTitle} onChange={(e)=>changeTmpNewsData("newsTitle",e.target.value)}/>
                                                        </div>

                                                        <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                            <span className="input-group-text">Image</span>
                                                            <input type="file" class="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataNewImgToUrlBase64(e.target.files[0])}/>
                                                        </div>
                                                        <img src={tmpNewsData.newsImg} style={{width:"100%",height:"auto"}}/> 

                                                        <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                            <span className="input-group-text">Details</span>
                                                            <textarea style={{width:"100%",height:"200px"}} value={tmpNewsData.newsDetails} onChange={(e)=>changeTmpNewsData("newsDetails",e.target.value)}></textarea>
                                                        </div>

                                                        <div class="input-group mb-3" style={{zIndex:"10"}}>
                                                            <span className="input-group-text">Link</span>
                                                            <input type="text" class="form-control" placeholder="Link" value={tmpNewsData.newsLink} onChange={(e)=>changeTmpNewsData("newsLink",e.target.value)}/>
                                                        </div>
                                                    </>)
                                                }
                                            })()}
                                        </div>

                                        <div class="modal-footer">
                                            {(()=>{
                                                if(tmpNewsData.newsTitle!=="",tmpNewsData.newsImg!=="",tmpNewsData.newsDetails!=="",tmpNewsData.newsLink!==""){
                                                    return <button type="button" class="btn btn-warning" onClick={()=>editNews(data.newsId,index)}>แก้ไขข่าว</button>
                                                }
                                            })()}
                                            <button type="button" id ={"myModalEditnew-close"+index.toString()} class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                        </div>

                                        </div>
                                    </div>
                                </div>
                            </>)
                        }
                    })()}
                    <div class='container' style={{backgroundColor:"",marginTop:'2%', marginBottom:'10%'}} onClick={()=>new Modal(document.getElementById("myModal-news"+index.toString()), {}).show()}>
                        <div class="border p-1" style={{color:'#',width:'300px',height:'300px'}}>
                            <img src={data.newsImg} style={{width:'100%',height:'60%'}}></img>
                            <div class='p-2 '>
                                <textarea class='d-flex justify-content-left' value={data.newsTitle} style={{color:'black',width:'100%',height:'100%',resize:'none',background:'transparent',border:'none'}} rows="3" cols="50" disabled/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="modal" id={"myModal-news"+index.toString()}>
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                        <div class="modal-header">
                            <h4 class="modal-title">{data.newsTitle}</h4>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <div class="modal-body">
                            <div style={{width:"100%",justifyContent:"center",display:"flex"}}>
                                <img src={data.newsImg} style={{width:"80%",height:"auto"}} />
                            </div>
                            <br/>
                            <div style={{width:"100%",justifyContent:"center",display:"flex"}}>
                                <textarea value={data.newsDetails} style={{width:"90%"}} rows="15"  disabled/>
                            </div>
                        </div>

                        <div class="modal-footer">
                            <a class='d-flex justify-content-left' href={data.newsLink} target="_blank" > <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Link</button></a>
                            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </div>

                        </div>
                    </div>
                </div>
                
                </>)

            })}
            </div> 
            </div>

            {/*<div class='row'>              
                <div class='col'>
                    <div class='container'style={{marginTop:'2%', marginBottom:'10%'}}>
                        <div class="border p-1" style={{color:'#',width:'300px',height:'300px'}}>
                            <div class="text-right">
                                <button type="button" class="btn btn-sm">
                                    <FaEdit style={{color:'#ffc902'}}/>
                                </button>
                                <button type="button" class="btn btn-sm">
                                    <FaTrash style={{color:'#d21502'}}/>
                                </button>
                            </div>
                            <img src='https://www.eng.ku.ac.th/news/wp-content/uploads/2021/08/02.jpg' style={{width:'100%',height:'60%'}}></img>
                            <div class='p-2 '>
                                <textarea class='d-flex justify-content-left' style={{color:'black',width:'100%',height:'100%',resize:'none',background:'transparent',border:'none'}} rows="3" cols="50" disabled>บริษัท พรอสเพอร์ เอ็นจิเนียริ่ง จำกัด (มหาชน) มอบทุนการศึกษา</textarea>
                                <a class='d-flex justify-content-left' href='#'>อ่านทั้งหมด »</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col' style={{marginLeft:'-30%'}}>
                    <div class='container'style={{marginTop:'2%', marginBottom:'10%'}}>
                        <div class="border p-1" style={{color:'#',width:'300px',height:'300px',}}>
                            <div style={{ backgroundColor:'#000'}}>
                                <IconContext.Provider value={{ size: 50, color:'#DCDCDC'}}>
                                
                                    <BsFillPlusCircleFill/>
                                
                                </IconContext.Provider>
                            </div>
                        </div>
                    </div>
                </div>
        </div>  */}
        {/*
            <ul class="pagination d-flex justify-content-center">
                <li class="page-item"><a class="page-link" href="#">Previous</a></li>
                <li class="page-item"><a class="page-link" href="#">1</a></li>
                <li class="page-item active"><a class="page-link" href="#">2</a></li>
                <li class="page-item"><a class="page-link" href="#">3</a></li>
                <li class="page-item"><a class="page-link" href="#">Next</a></li>
            </ul>
        */}    
        </div>

    </>)
}
export default Home;

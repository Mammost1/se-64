
import { FaTrash,FaEdit } from "react-icons/fa";
import { Modal } from 'bootstrap'
import React, { useState,useEffect,useContext } from 'react'
import axios from 'axios';
import ViewLoading from '../View/ViewLoading';
import ViewConfirm from '../View/ViewConfirm';
import { AuthContext } from "../Auth/Auth";

const Introduction = () => {
    const {role} = useContext(AuthContext)
    const [tmpImgData,setTmpImgData] = useState("")
    const [introductionImgData,setIntroductionImgData] = useState({data:[]})
    const [loadNewImage,setLoadNewImage] = useState(false)
    const [loadModal,setLoadModal] = useState(false)

    const [loading,setLoading] = useState(true)

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

    const addImege =()=>{
        setLoadNewImage(true)
        axios.post("http://localhost:3001/addIntroduction",{
            introductionImg:tmpImgData
        })
        .then((response) => {
            if(response.data.status==="ok"){
                console.log(response.data.contact.insertId);
                let newImgData = introductionImgData.data;
                newImgData.push({introductionId :response.data.contact.insertId,introductionImg:tmpImgData})
                setIntroductionImgData({data:newImgData}) 
                setLoadNewImage(false)
                document.getElementById("myModal-close").click();
                //window.location.reload(false);
            }else{
                alert(response.data.message);
                setLoadNewImage(false)
            }
        },(err)=>{
            alert("ไม่สามารถ post(http://localhost:3001/addIntroduction)")
        })
    }

    const deleteImege =(introductionId,index)=>{
        console.log(introductionId);
        console.log(index);
        setLoadModal(true)
        axios.put("http://localhost:3001/deleteIntroduction",{
            introductionId:introductionId
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newImgData = introductionImgData.data;
                newImgData.splice(index, 1)
                document.getElementById("myModal-delete-close"+index.toString()).click();
                setIntroductionImgData({data:newImgData})
                setLoadModal(false)
            }else{
                alert(response.data.message);
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/deleteIntroduction)")
        })
    }

    const editImege =(introductionId,index)=>{
        setLoadNewImage(true)
        axios.put("http://localhost:3001/updateIntroduction",{
            introductionId:introductionId,
            introductionImg:tmpImgData
        })
        .then((response) => {
            if(response.data.status==="ok"){
                let newImgData = introductionImgData.data;
                newImgData[index].introductionImg = tmpImgData
                setIntroductionImgData({data:newImgData}) 
                setLoadNewImage(false)
            }else{
                alert(response.data.message);
                setLoadNewImage(false)
            }
        },(err)=>{
            alert("ไม่สามารถ put(http://localhost:3001/updateIntroduction)")
        })
    }




    useEffect(() => {
        axios.get("http://localhost:3001/getIntroductionImage")
        .then((response) => {
            if(response.data.status==="ok"){
                response.data.contact.map((data)=>{
                    data.introductionImg = bufferToBase64(data.introductionImg.data)
                })
                //console.log(response.data.contact);
                setIntroductionImgData({data:response.data.contact})
                //setImgData({data:response.data.contact});
            }
            else{
                alert(response.data.message)
            }
            setLoading(false)
        },(err)=>{
            alert("ไม่สามารถ get http://localhost:3001/getIntroductionImage ได้")
        })
    }, []);
    if(loading){
        return <ViewLoading/>
    }
    return(<>
        <div className="container" >
            {(()=>{
                if(role==="admin"){
                    return (<>
                        <div className="modal fade" id="myModal">
                            <div className="modal-dialog">
                                <div className="modal-content">

                                <div className="modal-header">
                                    <h4 className="modal-title">เพิ่มรูปใหม่</h4>
                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                
                                <div className="modal-body">
                                    {(()=>{
                                        if(loadNewImage){
                                            return <div className="spinner-border text-warning"></div>
                                        }else{
                                            return(<>
                                                <div className="input-group mb-3" style={{zIndex:"10"}}>
                                                    <input type="file" className="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataToUrlBase64(e.target.files[0])}/>
                                                </div>
                                                <img src={tmpImgData} style={{width:"100%",height:"auto"}}/> 
                                            </>)
                                        }
                                    })()}
                                </div>
                                <div className="modal-footer">
                                    {(()=>{
                                        if(tmpImgData!==""){
                                            return <button type="button" className="btn btn-primary" onClick={()=>addImege()}>เพิ่ม</button>
                                        }
                                    })()}
                                    <button type="button" id ="myModal-close" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className='d-flex justify-content-center mt-3'>
                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#myModal" onClick={()=>setTmpImgData("")}>
                                    เพิ่มรูปใหม่
                            </button>
                        </div>
                    </>)
                }
            })()}
            <div>
                {introductionImgData.data.map((data,index)=>{
                    return(<>
                        <div className='d-flex justify-content-center mt-3'>
                            <img className="" src={data.introductionImg} style={{width:'1000px'}}/>
                            {(()=>{
                                if(role==="admin"){
                                    return (<>
                                        <div className='mt-2 d-flex flex-column align-items-center'>
                                            <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target={"#myModal-edit"+index.toString()} onClick={()=>setTmpImgData(data.introductionImg)}>
                                                <FaEdit style={{color:'#ffc902'}}/>
                                            </button>
                                            <button type="button" className="btn btn-secondary"data-bs-toggle="modal" data-bs-target={"#myModal-delete"+index.toString()}  >
                                                <FaTrash style={{color:'#d21502'}}/>
                                            </button>
                                        </div>  
                                    </>)
                                }
                            })()}
                        </div>
                        
                        {(()=>{
                            if(role==="admin"){
                                return(<>
                                    <ViewConfirm 
                                        modalId={"myModal-delete"+index.toString()} 
                                        heading="ลบรูป" 
                                        body={(<><img src={data.introductionImg} style={{width:"100%",height:"auto"}}/><p>คุณยืนยันที่จะลบหรือไม่</p></>)}
                                        functionConfirm ={()=>deleteImege(data.introductionId,index)} 
                                        closeId={"myModal-delete-close"+index.toString()}
                                        load={loadModal}
                                    />
                                    <div className="modal fade " id={"myModal-edit"+index.toString()} > 
                                        <div className="modal-dialog">
                                            <div className="modal-content">

                                                <div className="modal-header">
                                                    <h4 className="modal-title">Edit image</h4>
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>

                                                <div className="modal-body">
                                                    {(()=>{
                                                        if(loadNewImage){
                                                            return <div className="spinner-border text-warning"></div>
                                                        }else{
                                                            return(<>
                                                                <div className="input-group mb-3" style={{zIndex:"10"}}>
                                                                    <input type="file" className="form-control" placeholder="file img" accept="image/*" onChange={(e)=>dataToUrlBase64(e.target.files[0])}/>
                                                                </div>
                                                                <img src={tmpImgData} style={{width:"100%",height:"auto"}}/> 
                                                            </>)
                                                        }
                                                    })()}
                                                </div>

                                                <div className="modal-footer">
                                                    {(()=>{
                                                        if(tmpImgData!==data.advertImg && !loadNewImage){
                                                            return <button type="button" className="btn btn-warning" onClick={()=>editImege(data.introductionId,index)}>แก้ไข</button>
                                                        }
                                                    })()}
                                                        <button type="button" className="btn btn-danger close" data-bs-dismiss="modal">Close</button>
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
        </div>
    </>)
}
export default Introduction;
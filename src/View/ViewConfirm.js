import '../App.css';
import { useRef } from 'react';
import { Modal } from 'bootstrap';
//const { Modal } = bootstrap

const ViewConfirm = (props) => {
    const {modalId,heading,body,functionConfirm,closeId,load}=props
    return(<>
    <div class="modal fade" id={modalId}>
        <div class="modal-dialog" id="modal-box">
            <div class="modal-content">


            <div class="modal-header">
                <h4 class="modal-title">{heading}</h4>
                <button type="button" id={closeId} class="btn-close" data-bs-dismiss="modal"></button>
            </div>


            <div class="modal-body">
                {(()=>{
                    if(load){
                        return <div class="spinner-border text-warning"></div>
                    }else{
                        return body
                    }
                })()}
            </div>

        
            <div class="modal-footer">
                {(()=>{
                    if(!load){
                        return(<>
                            <button type="button" class="btn btn-success" onClick={()=>functionConfirm()}>ยืนยัน</button>
                            <button type="button" id={closeId} class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                        </>) 
                    }
                })()}
            </div>

            </div>
        </div>
    </div>
    </>)
}
export default ViewConfirm;
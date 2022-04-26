import '../App.css';
import './ViewLoading.css'
const ViewLoading = () => {
    return(<div className='wrapper'>
       <div className="loading-container">
           <div className='bubble1 bubble' style={{width:'30px',height:'30px',marginRight:'5px'}}></div>
           <div className='bubble2 bubble' style={{width:'30px',height:'30px',marginRight:'5px'}} ></div>
           <div className='bubble3 bubble'style={{width:'30px',height:'30px',marginRight:'5px'}} ></div>
        </div>
        <div style={{fontFamily:'Prompt',fontWeight:'500', color:"#680C07" ,fontSize:'80%',alignItems:'center'}}>Loading...</div>
    </div>)
}
export default ViewLoading;

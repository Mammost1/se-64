import { Button,Offcanvas } from 'react-bootstrap';
import React,{useState} from 'react';
import './ViewOffcanvas.css'
const ViewOffcanvas = (props) => {
    const {buttonName,placement,name,title,body}=props

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    //const handleShow = () => setShow(true);
    const toggleShow = () => setShow((s) => !s);
  
    return (
      <>
        <Button variant={!show?"primary":"danger"} onClick={toggleShow} className="me-2">
          {buttonName}
        </Button>
        <Offcanvas show={show} onHide={handleClose} placement={placement} name={name}>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>{title}</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {body}
          </Offcanvas.Body>
        </Offcanvas>
      </>
    );
  }
  export default ViewOffcanvas;
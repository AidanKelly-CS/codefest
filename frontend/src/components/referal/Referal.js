// Define a Referal component
import './referal.css';
import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Referal({ id, name, location, age, difficulty, isFlagged, date, eligibleForSupport, isProcessed, virtual, inPerson, timeAM, timePM, updateEligible, updateNotEligible }) {

  const [supportStatus, setSupportStatus] = useState(null);

  const handleSupportStatusChange = (event) => {
    const value = event.target.value;
    setSupportStatus(value);
    console.log(supportStatus);
  };


  const [Eligible, setIsEligible] = useState(false); // State for the checkbox

  const handleEligibleCheckboxChange = (event) => {
    setIsEligible(event.target.checked);
  };

  const [Virtual, setVirtual] = useState(false); // State for the checkbox

  const handleVirtualCheckboxChange = (event) => {
    setVirtual(event.target.checked);
  };

  const [inPersonCheckbox, setInPerson] = useState(false); // State for the checkbox

  const handleInPersonCheckboxChange = (event) => {
    setInPerson(event.target.checked);
  };

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClose2 = () => setShow2(false);
  const handleShow2 = () => setShow2(true);
  const handleSave = () => {
    if(supportStatus === "eligible")
    {
      console.log("hoho", id);
      updateEligible(id, Virtual, inPersonCheckbox);
    }else{
      updateNotEligible(id);
      console.log("Not Eligible hello");
    }
    isProcessed=true;
    setShow2(false);
  }

    return (
      <>
      {isProcessed==false &&
      <div class="container">

        <div class="box">
          <p>Name: {name}</p>
          <p>Location: {location}</p>
          <p>Age: {age}</p>
          <p>Difficulty: {difficulty}</p>
          <Button variant="primary" onClick={handleShow}>
            View Details
          </Button>
        </div>
        <div class="box">
          <p>Flagged: {isFlagged ? "Yes": "No"}</p>
        </div>
        
        <div class="boxProcess">
        <Button variant="primary" onClick={handleShow2}>
            Process this Referral
          </Button>
        </div>

        <div class="box">
          <p>Date: {date}</p>
        </div>
        <hr />

      </div>}
    
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>Name:</h5>
    <p>{name}</p>
    <h5>Location:</h5>
    <p>{location}</p>
    <h5>Age:</h5>
    <p>{age}</p>
    <h5>Difficulty:</h5>
    <p>{difficulty}</p>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>

  <Modal show={show2} onHide={handleClose2}>
    <Modal.Header closeButton>
      <Modal.Title>Details</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h5>Name:</h5>
    <p>{name}</p>
    <h5>Location:</h5>
    <p>{location}</p>
    <h5>Age:</h5>
    <p>{age}</p>
    <h5>Difficulty:</h5>
    <p>{difficulty}</p>
    <h5>Date:</h5>
    <p>{date}</p>

    <hr/>

    {/* <div style={{ display: 'flex', alignItems: 'center' }}>
  <h5 style={{ marginRight: '10px' }}>Eligible for Support</h5>
  <input 
    type="checkbox"
    name="isEligibleCheckbox"
    onChange={handleEligibleCheckboxChange} 
    checked={Eligible}
  />
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <h5 style={{ marginRight: '10px' }}>Not Eligible for Support</h5>
  <input 
    type="checkbox"
    name="isEligibleCheckbox"
    onChange={handleEligibleCheckboxChange} 
    checked={Eligible}
  />
</div> */}


<div style={{ display: 'flex', alignItems: 'center' }}>
  <h5 style={{ marginRight: '10px' }}>Eligible for Support</h5>
  <input 
    type="radio"
    name="supportStatus"
    value="eligible"
    onChange={handleSupportStatusChange} 
    checked={supportStatus === 'eligible'}
  />
</div>

<div style={{ display: 'flex', alignItems: 'center' }}>
  <h5 style={{ marginRight: '10px' }}>Not Eligible for Support</h5>
  <input 
    type="radio"
    name="supportStatus"
    value="notEligible"
    onChange={handleSupportStatusChange} 
    checked={supportStatus === 'notEligible'}
  />
</div>





<hr/>

<h5>Preferred method of therapy delivery:</h5>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <h6 style={{ marginRight: '10px' }}>Virtual</h6>
  <input 
    type="checkbox"
    name="Virtual"
    onChange={handleVirtualCheckboxChange} 
    checked={Virtual}
  />
</div>
<div style={{ display: 'flex', alignItems: 'center' }}>
  <h6 style={{ marginRight: '10px' }}>In Person</h6>
  <input 
    type="checkbox"
    name="inPersonCheckbox"
    onChange={handleInPersonCheckboxChange} 
    checked={inPersonCheckbox}
  />
</div>

    </Modal.Body>
    <Modal.Footer>
      <Button variant="primary" onClick={handleSave}>
        Save
      </Button>
      <Button variant="secondary" onClick={handleClose2}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
  </>
      
    );

    
  }

  export default Referal;
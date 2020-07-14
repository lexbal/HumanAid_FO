import React, { useState } from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';

import "./Contact.css";
import ContactForm from './ContactForm/ContactForm';

const Contact = () => {
  return (
    <div className='contact'>
      <Card style={{ width: '35rem', justifyContent: "center" }}>
        <Card.Header>Contacter-nous</Card.Header>
        <Card.Body>
          <ContactForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(
  null,
  null
)(Contact)

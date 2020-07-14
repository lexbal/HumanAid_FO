import React, { useState } from 'react';
import { connect } from "react-redux";
import Card from 'react-bootstrap/Card';

import ContactForm from './ContactForm/ContactForm';


const Contact = () => {
  return (
    <div className='Contact'>
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

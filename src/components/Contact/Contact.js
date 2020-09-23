import React from 'react';
import Card from 'react-bootstrap/Card';

import "./Contact.css";
import ContactForm from './ContactForm/ContactForm';

const Contact = () => {
  return (
    <div className='Contact'>
      <Card>
        <Card.Body>
          <h3>Formulaire de contact</h3>
          <ContactForm />
        </Card.Body>
      </Card>
    </div>
  );
};

export default Contact;

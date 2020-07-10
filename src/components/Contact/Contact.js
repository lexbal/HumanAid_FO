import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import { mail } from '../../redux/actions/user';


const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMail: (fields) => {
      dispatch(mail(fields))
    }
  }
}

const Contact = ({ sendMail, error }) => {
  const [fields, setField] = useState({
    name: "",
    email: "",
    content: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    setField({ ...fields, [name]: value });

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMail(fields);
  }

  return (
    <div className='Contact'>
      <Card style={{ width: '35rem', margin: "auto", marginTop: "10%" }}>
        <Card.Header>Contacter-nous</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="nameGroup">
              <Form.Control
                type="text"
                name="name"
                placeholder="Nom"
                value={fields.name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="emailGroup">
              <Form.Control
                type="text"
                name="email"
                placeholder="E-mail"
                value={fields.email}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="contentGroup">
              <FormControl
                as="textarea"
                name="content"
                aria-label="With textarea"
                placeholder="Exprimez-vous votre requête ici !"
                value={fields.content}
                onChange={handleChange}
              />
            </Form.Group>

            { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

            <Button variant="primary" type="submit">
              Envoyer
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Contact)

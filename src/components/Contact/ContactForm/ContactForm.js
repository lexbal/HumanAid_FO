import React, { useState } from 'react';
import { connect } from "react-redux";
import {
  Form, Button, FormControl, Alert
} from 'react-bootstrap';
import PropTypes from'prop-types';

import { mail } from '../../../redux/actions/mail';
import './ContactForm.css';


const mapStateToProps = (state) => {
  return {
    loading: state.mail.loading,
    error: state.mail.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendMail: (fields) => {
      dispatch(mail(fields))
    }
  }
}

const ContactForm = ({ sendMail, error }) => {
  // eslint-disable-next-line
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const [fields, setField] = useState({
    name: "",
    email: "",
    content: "",
  });
  const [errors, setError] = useState({
    name: null,
    email: null,
    content: null,
  });

  const handleChange = (event) => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    setField({ ...fields, [name]: value });

    if (name === "email") {
      setError({ ...errors, email: !validEmailRegex.test(value) ? "Email invalide ! (exemple: exemple@gmail.com)" : "" });
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMail(fields);
  }

  return (
    <div className='ContactForm'>
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
                  isValid={fields.email}
                  isInvalid={errors.email}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group controlId="contentGroup">
                <FormControl
                  as="textarea"
                  name="content"
                  aria-label="With textarea"
                  placeholder="Exprimez-vous votre requête ici !"
                  value={fields.content}
                  onChange={handleChange}
                  required
                />
            </Form.Group>

            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}

            <Button variant="primary" type="submit" id="contact">
                Envoyer
            </Button>
        </Form>
    </div>
  );
};

ContactForm.propTypes = {
  sendMail: PropTypes.func.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm)

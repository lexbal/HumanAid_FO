import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import PropTypes from'prop-types';

import { login } from '../../../redux/actions/user';


const mapDispatchToProps = (dispatch) => {
  return {
    createConnexion: (email, password) => {
      dispatch(login({email: email, password: password}))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}


const Login = ({ createConnexion, loggedIn, error }) => {
  const [fields, setField] = useState({
    email: "",
    password: ""
  });

  const handleChange = (event) => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    setField({ ...fields, [name]: value });

    return true;
  }

  const handleSubmit = (event) => {
    createConnexion(fields.email, fields.password);
    event.preventDefault();
  }

  return (
    !loggedIn ? (
      <div className="Login">
        <Card style={{ width: '18rem', justifyContent: "center" }}>
          <Card.Header>Connexion</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="usernameGroup">
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={fields.email}
                  onChange={handleChange}
                  autoFocus
                />
              </Form.Group>
              <Form.Group controlId="passwordGroup">
                <Form.Control
                  type="password"
                  name="password"
                  value={fields.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                />
              </Form.Group>
              { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

              <Button variant="primary" type="submit">
                Se connecter
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </div>
    ) : (
      <Redirect to='/'/>
    )
  );
}

Login.propTypes = {
  createConnexion: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)

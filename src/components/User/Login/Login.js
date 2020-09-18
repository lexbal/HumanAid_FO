import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Alert, Card, Button,
  Form, InputGroup
} from 'react-bootstrap';
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faKey } from '@fortawesome/free-solid-svg-icons';

import { login } from '../../../redux/actions/user';
import './Login.css';


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
        <Card className="shadow">
          <Card.Body>
            <h3>Connexion</h3>

            <Form onSubmit={handleSubmit}>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faUser}/>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="text"
                  name="email"
                  placeholder="Email"
                  value={fields.email}
                  onChange={handleChange}
                  autoFocus required
                />
              </InputGroup>

              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text id="basic-addon1">
                    <FontAwesomeIcon icon={faKey}/>
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <Form.Control
                  type="password"
                  name="password"
                  value={fields.password}
                  onChange={handleChange}
                  placeholder="Mot de passe"
                  required
                />
              </InputGroup>

              { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

              <Button variant="primary" type="submit" id="connect">
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
};

Login.propTypes = {
  createConnexion: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

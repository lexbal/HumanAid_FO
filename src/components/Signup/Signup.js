import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';

import PropTypes from'prop-types';

import { signup } from '../../redux/actions/user';
import './Signup.css';


const mapDispatchToProps = (dispatch) => {
  return {
    createProfile: (user) => {
      dispatch(signup(user))
    }
  }
}

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}


const Signup = ({ createProfile, loggedIn, error }) => {
  const [fields, setField] = useState({
    username: "",
    description: "",
    siret: "",
    address: "",
    website: "",
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    setField({ ...fields, [name]: value });

    return true;
  }

  const handleSubmit = (event) => {
    createProfile(fields);
    event.preventDefault();
  }

  return (
    !loggedIn ? (
    <div className='SignUp'>
      <Card style={{ width: '35rem', margin: "auto", marginTop: "10%" }}>
        <Card.Header>Créer un compte</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="rolesGroup">
              <Form.Label>Vous êtes ?</Form.Label>
              <Form.Control
                as="select"
                name="roles"
                value={fields.roles}
                onChange={handleChange}
              >
                <option>Choose...</option>
                <option>Association</option>
                <option>Entreprise</option>
              </Form.Control>
            </Form.Group>

            <Form.Label>Informations de connexion</Form.Label>

            <Form.Group controlId="siretGroup">
              <Form.Control
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={fields.username}
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
            <Form.Group controlId="passwordGroup">
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={fields.password}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Label>Vos informations</Form.Label>

            {
              (fields.roles === "Entreprise" || fields.roles === "Association") &&
              <>
                <Form.Group controlId="nameGroup">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={"Nom de l'" + fields.roles}
                    value={fields.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="descriptionGroup">
                  <FormControl
                    as="textarea"
                    name="description"
                    aria-label="With textarea"
                    placeholder="Description"
                    value={fields.description}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="websiteGroup">
                  <Form.Control
                    type="text"
                    name="website"
                    placeholder="Site Web"
                    value={fields.website}
                    onChange={handleChange}
                  />
                </Form.Group>
              </>
            }

            {
              fields.roles === "Entreprise" &&
              <Form.Group controlId="siretGroup">
                <Form.Control
                  type="text"
                  name="siret"
                  placeholder="Siret"
                  value={fields.siret}
                  onChange={handleChange}
                />
              </Form.Group>
            }
            <Form.Group controlId="locationGroup">
              <Form.Control
                type="text"
                name="address"
                placeholder="Adresse"
                value={fields.address}
                onChange={handleChange}
              />
            </Form.Group>
            { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

            <Button variant="primary" type="submit">
              S'inscrire
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

Signup.propTypes = {
    createProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

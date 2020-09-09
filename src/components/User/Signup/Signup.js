import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import {
  Alert, Button, Form,
  FormControl, Card, Col
} from 'react-bootstrap';

import PropTypes from'prop-types';

import { signup } from '../../../redux/actions/user';
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
    photo: null,
    description: "",
    siret: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
      country: "",
      department: "",
      region: ""
    },
    website: "",
    name: "",
    email: "",
    password: "",
    roles: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    let value    = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    if (name === "address") {
      const id   = target.id;
      setField({ ...fields, address: {...fields.address, [id]: value} });
    } else {
      setField({ ...fields, [name]: (target.type === "file") ? target.files[0] : value });
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createProfile(fields);
  }

  return (
    !loggedIn ? (
    <div className='SignUp'>
      <Card style={{ width: '65rem', margin: "auto", marginTop: "2%" }}>
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
            <hr/>

            <Form.Group controlId="siretGroup">
              <Form.Control
                type="text"
                name="username"
                placeholder="Nom d'utilisateur"
                value={fields.username}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                id="emailGroup"    
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
            <hr/>

            {
              (fields.roles === "Entreprise" || fields.roles === "Association") &&
              <>
                <Form.Label>Informations professionnelles</Form.Label>
                <hr/>
                <Form.Group controlId="nameGroup">
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={"Nom de l'" + fields.roles}
                    value={fields.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group>
                  <FormControl
                    as="textarea"
                    name="description"
                    id="description"
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

            {(fields.roles === "Entreprise" || fields.roles === "Association") && <hr/>}

            <Form.Label>Vos informations</Form.Label>
            <hr/>

            <Form.Group>
              <Form.File 
                id="custom-file-translate-scss"
                label="Photo de profile/Logo"
                name="photo"
                lang="fr"
                custom
                onChange={handleChange}
              />
            </Form.Group>

            <hr/>
            <Form.Label>Informations géographique</Form.Label>
            <hr/>

            <Form.Group>
              <Form.Row>
                <Col>
                  <Form.Control
                    type="text"
                    name="address"
                    id="street"
                    placeholder="Adresse"
                    value={fields.address.street}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="address"
                    id="zipcode"
                    placeholder="Code postal"
                    value={fields.address.zipcode}
                    onChange={handleChange}
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    name="address"
                    id="city"
                    placeholder="Ville"
                    value={fields.address.city}
                    onChange={handleChange}
                  />
                </Col>
              </Form.Row> 
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                id="country"
                placeholder="Pays"
                value={fields.address.country}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                id="department"
                placeholder="Département"
                value={fields.address.department}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Control
                type="text"
                name="address"
                id="region"
                placeholder="Région"
                value={fields.address.region}
                onChange={handleChange}
              />
            </Form.Group>

            <hr/>

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

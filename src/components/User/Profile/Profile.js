import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { getUser, updateUser } from '../../../redux/actions/user';

import { 
  Form, Button, 
  Card, Alert, FormControl 
} from 'react-bootstrap';

const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    email: state.user.email,
    role: state.user.role,
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: (id) => {
      dispatch(getUser(id))
    },
    updateProfile: (user) => {
      dispatch(updateUser(user))
    }
  }
}


const Profile = ({ username, email, getUser, updateProfile, role, loggedIn, error }) => {
  useEffect(() => {
    getUser(username ? username : email);
  // eslint-disable-next-line
  }, []);
  
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
    updateProfile(fields);
    event.preventDefault();
  }

  return (
    loggedIn ? (
      <div className="Profile">
        <Card style={{ width: '80%', justifyContent: "center" }}>
          <Card.Header>Profil</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>

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
                (role === "ROLE_ASSOC" || role === "ROLE_COMP") &&
                <>
                  <Form.Group controlId="nameGroup">
                    <Form.Control
                      type="text"
                      name="name"
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
                role === "ROLE_COMP" &&
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
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

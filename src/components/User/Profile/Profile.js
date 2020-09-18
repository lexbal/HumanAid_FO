import React, { useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from'prop-types';
import {
  Form, Button, Col,
  Card, Alert, FormControl, Row
} from 'react-bootstrap';

import { getUser, setUser, updateUser } from '../../../redux/actions/user';


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    username: state.user.username,
    email: state.user.email,
    role: state.user.role,
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch(setUser(user))
    },
    getUser: (id) => {
      dispatch(getUser(id))
    },
    updateProfile: (user) => {
      dispatch(updateUser(user))
    }
  }
}


const Profile = ({ user, username, email, getUser, setUser, updateProfile, role, loggedIn, error }) => {
  useEffect(() => {
    getUser(username ? username : email);
  // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    let value    = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    if (name === "address") {
      const id   = target.id;
      user.address = {...user.address, [id]: value};
    } else {
      user[name] = (target.type === "file") ? target.files[0] : value;
    }

    setUser(user);

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    updateProfile(user);
  }

  return (
    loggedIn ? (
      <div className="Profile">
        <Card style={{ width: '90%', justifyContent: "center" }}>
          <Card.Header>Profil</Card.Header>
          <Card.Body>
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col>
                  <Form.Label>Informations de connexion</Form.Label>
                  <hr/>

                  <Form.Group>
                    <Form.Control
                      id="username"
                      type="text"
                      name="username"
                      placeholder="Nom d'utilisateur"
                      defaultValue={user.username}
                      onChange={handleChange}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Control
                      id="email"
                      type="text"
                      name="email"
                      placeholder="E-mail"
                      defaultValue={user.email}
                      onChange={handleChange}
                        />
                  </Form.Group>
                </Col>
                <Col style={{ borderLeft: "1px lightgrey solid" }}>
                  <Form.Label>Informations de l'utilisateur</Form.Label>
                  <hr/>

                  {
                    (role === "ROLE_ASSOC" || role === "ROLE_COMP") &&
                    <>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          id="name"
                          name="name"
                          placeholder={role === "ROLE_COMP" ? "Nom de l'Entreprise" : "Nom de l'Association"}
                          defaultValue={user.name}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <FormControl
                          as="textarea"
                          id="description"
                          name="description"
                          aria-label="With textarea"
                          placeholder="Description"
                          defaultValue={user.description}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          id="website"
                          name="website"
                          placeholder="Site Web"
                          defaultValue={user.website}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  }

                  {
                    role === "ROLE_COMP" &&
                    <Form.Group>
                      <Form.Control
                        type="text"
                        id="siret"
                        name="siret"
                        placeholder="Siret"
                        defaultValue={user.siret}
                        onChange={handleChange}
                      />
                    </Form.Group>
                  }
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col>
                  <Form.Label>Informations géographique</Form.Label>
                  <hr/>

                  {
                    user.address &&
                    <>
                      <Form.Group>
                        <Form.Row>
                          <Col>
                            <Form.Control
                              type="text"
                              name="address"
                              id="street"
                              placeholder="Adresse"
                              defaultValue={user.address.street}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              name="address"
                              id="zipcode"
                              placeholder="Code postal"
                              defaultValue={user.address.zipcode}
                              onChange={handleChange}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              type="text"
                              name="address"
                              id="city"
                              placeholder="Ville"
                              defaultValue={user.address.city}
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
                          defaultValue={user.address.country}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="address"
                          id="department"
                          placeholder="Département"
                          defaultValue={user.address.department}
                          onChange={handleChange}
                        />
                      </Form.Group>
                      <Form.Group>
                        <Form.Control
                          type="text"
                          name="address"
                          id="region"
                          placeholder="Région"
                          defaultValue={user.address.region}
                          onChange={handleChange}
                        />
                      </Form.Group>
                    </>
                  }

                  <hr/>
                </Col>
              </Row>
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

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  updateProfile: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Profile)

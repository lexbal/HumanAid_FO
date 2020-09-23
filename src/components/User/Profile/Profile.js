import React, { useEffect, useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import PropTypes from'prop-types';
import CryptoJS from "crypto-js";
import {
  Form, Button, Col,
  Card, Alert, Row, Spinner
} from 'react-bootstrap';

import { getUser, setUser, updateUser } from '../../../redux/actions/user';
import './Profile.css';
import Part1 from './Part/Part1';
import Part2 from './Part/Part2';
import Part3 from './Part/Part3';


const mapStateToProps = (state) => {
  return {
    user: state.user.user,
    username: state.user.username,
    email: state.user.email,
    loading: state.user.loading,
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


const Profile = ({ user, username, email, getUser, setUser, updateProfile, loading, loggedIn, error }) => {
  const validImageType = [
    "image/png",
    "image/jpeg",
    "image/svg+xml"
  ];
  // eslint-disable-next-line
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const validLandlineRegex = RegExp(/^(?=.*[0-9])\S{6,15}$/);
  const [invalid, setInvalid] = useState(false);
  const [visible, setVisible] = useState(false);
  const [errors, setError] = useState({
    username: null,
    photo: null,
    description: null,
    siret: null,
    landline: null,
    manager_first_name: null,
    manager_last_name: null,
    facebook: null,
    twitter: null,
    address: {
      street: null,
      city: null,
      zipcode: null,
      country: null,
      department: null,
      region: null
    },
    website: null,
    name: null,
    email: null,
    password: null,
    roles: null,
  });

  useEffect(() => {
    let string = CryptoJS.AES.encrypt(username ? username : email, process.env.REACT_APP_SECRET).toString();
    let encryptedId = string.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');
    getUser(encryptedId);
  // eslint-disable-next-line
  }, []);

  const handleChange = (event) => {
    const target = event.target;
    let value    = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    if (name === "address") {
      const id   = target.id;
      user.address = {...user.address, [id]: value};
      setError({ ...errors, address: {...errors.address, [id]: !value ? "Ce champ est vide !" : ""} });
    } else {
      if (target.type === "file") {
        if (validImageType.includes(target.files[0].type)) {
          user.file = target.files[0];
        }
      } else {
        user[name] = (target.type === "file") ? target.files[0] : value;
      }

      switch (name) {
        case 'email':
          setError({ ...errors, email: !validEmailRegex.test(value) ? "Email invalide ! (exemple: exemple@gmail.com)" : "" });
          break;
        case 'photo':
          setError({ ...errors, photo: !validImageType.includes(target.files[0].type) ? "Les types de fichiers autorisés sont : png, jpg, jpeg, svg" : "" });
          break;
        case 'landline':
          setError({ ...errors, landline: !validLandlineRegex.test(value) ? "Numéro de téléphone incorrect !" : "" });
          break;
        case 'siret':
          setError({ ...errors, siret: (!value.length === 14) ? "Le numéro de siret doit contenir 14 caractères" : "" });
          break;
        default:
          setError({ ...errors, [name]: !value ? "Ce champ est vide !" : "" });
      }
    }

    setUser(user);

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    for (let value of Object.keys(errors)) {
      if (value === "address") {
        for (let value of Object.keys(errors.address)) {
          if (errors.address[value]) {
            setInvalid(true);

            return;
          }
        }
      } else {
        if (errors[value]) {
          setInvalid(true);

          return;
        }
      }
    }

    setVisible(true);
    setInvalid(false);
    updateProfile(user);
  }

  return (
    loggedIn ? (
      <div className="Profile">
        <Card className="shadow">
          <Card.Body>
            <h3>Votre profil</h3>

            {
              user && !loading && (
                <Form onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                      <Part1 user={user} errors={errors} handleChange={handleChange} />
                    </Col>
                    <Col style={{ borderLeft: "1px lightgrey solid" }}>
                      <Part2 user={user} errors={errors} handleChange={handleChange} />
                    </Col>
                  </Row>
                  <hr/>
                  {
                    user.roles && (
                      <Row>
                        { 
                          (user.roles.includes("COMP") || user.roles.includes("ASSOC") || user.roles.includes("ADMIN")) &&  
                            <Col>
                              <Part3 user={user} errors={errors} handleChange={handleChange} />
                            </Col>
                        }
                      </Row>
                    )
                  }

                  {invalid && <Alert variant="danger">Les champs précédents ne sont pas valides</Alert>}
                  {!error && !invalid && visible && <Alert variant="success">Modifications enregistrées !</Alert>}
                  { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

                  <Button variant="primary" type="submit">
                    Enregistrer
                  </Button>
                </Form>
              )
            }

          {
            loading &&
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          }
            
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

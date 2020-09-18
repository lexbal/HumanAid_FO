import React, { useState } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Alert, Button, Form, Card
} from 'react-bootstrap';
import PropTypes from'prop-types';

import { signup } from '../../../redux/actions/user';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';
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
  const validImageType = [
    "image/png",
    "image/jpeg",
    "image/svg+xml"
  ]
  const validEmailRegex = RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
  const validPwdRegex = RegExp(/^(?=.*[A-z])(?=.*[A-Z])(?=.*[0-9])\S{6,12}$/);
  const [currentStep, setCurrentStep] = useState(1);
  const [invalid, setInvalid] = useState(false);
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
  const [errors, setError] = useState({
    username: null,
    photo: null,
    description: null,
    siret: null,
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

  const handleChange = (event) => {
    const target = event.target;
    let value    = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    if (name === "address") {
      const id   = target.id;
      setField({ ...fields, address: {...fields.address, [id]: value} });
      setError({ ...errors, address: {...errors.address, [id]: !value ? "Ce champ est vide !" : ""} });
    } else {
      if (target.type === "file") {
        if (validImageType.includes(target.files[0].type)) {
          setField({ ...fields, [name]: target.files[0] });
        }
      } else {
        setField({ ...fields, [name]: value });
      }

      switch (name) {
        case 'email':
          setError({ ...errors, email: !validEmailRegex.test(value) ? "Email invalide ! (exemple: exemple@gmail.com)" : "" });
          break;
        case 'password':
          setError({ ...errors, password: !validPwdRegex.test(value) ? "Le mot de passe doit contenir au moins une majuscule, un chiffre et taille comprise entre 6 et 16 caractères" : "" });
          break;
        case 'photo':
          setError({ ...errors, photo: !validImageType.includes(target.files[0].type) ? "Les types de fichiers autorisés sont : png, jpg, jpeg, svg" : "" });console.log(!validImageType.includes(target.files[0].type) ? "Les types de fichiers autorisés sont : png, jpg, jpeg, svg" : "");
          break;
        default:
          setError({ ...errors, [name]: !value ? "Ce champ est vide !" : "" });
      }
    }

    return true;
  }

  const next = () => {
    if (currentStep === 1) {
      for (let value of ["username", "email", "password"]) {
        if (errors[value] || !fields[value]) {
          setInvalid(true);

          return;
        }
      }
    } else if (currentStep === 2) {
      for (let value of ["street", "zipcode", "city", "country", "department", "region"]) {
        if (errors.address[value] || !fields.address[value]) {
          setInvalid(true);

          return;
        }
      }
    } else if (currentStep === 3) {
      for (let value of ["photo", "name", "description", "website", "siret"]) {
        if (errors[value] || !fields[value]) {
          setInvalid(true);

          return;
        }
      }
    }

    setInvalid(false);
    setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1);
  }

  const prev = () => {
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
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

    setInvalid(false);
    createProfile(fields);
  }

  return (
    !loggedIn ? (
    <div className='SignUp'>
      <Card className='shadow'>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <div className="title">
              <h3>- Inscription -</h3>
              <h5>
                {currentStep === 1 && " Informations de connexion"}
                {currentStep === 2 && " Coordonnées géographiques"}
                {currentStep === 3 && " Informtions professionnelles"}
              </h5>
            </div>

            <Step1
              currentStep={currentStep}
              handleChange={handleChange}
              fields={fields}
              errors={errors}
            />

            <Step2
              currentStep={currentStep}
              handleChange={handleChange}
              fields={fields}
              errors={errors}
            />

            {
              (fields.roles === "Entreprise" || fields.roles === "Association") &&
              <Step3
                currentStep={currentStep}
                handleChange={handleChange}
                fields={fields}
                errors={errors}
              />
            }

            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}
            {invalid && <Alert variant="danger">Les champs précédents ne sont pas valides</Alert>}

            {currentStep !== 1 && (
              <Button variant="secondary mt-2" type="button" onClick={prev}>
                Précédent
              </Button>
            )}

            {currentStep < 3 && !(currentStep === 2 && (fields.roles !== "Entreprise" && fields.roles !== "Association")) && (
              <Button variant="primary float-right mt-2" type="button" onClick={next}>
                Suivant
              </Button>
            )}
            {
              ((currentStep === 2 && (fields.roles !== "Entreprise" && fields.roles !== "Association")) ||
              (currentStep === 3 && (fields.roles === "Entreprise" || fields.roles === "Association"))) &&
              <Button variant="primary float-right mt-2" type="submit">
                S'inscrire
              </Button>
            }
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
  createProfile: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup);

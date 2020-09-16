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
  const [currentStep, setCurrentStep] = useState(1);
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

  const next = () => {
    setCurrentStep(currentStep >= 2 ? 3 : currentStep + 1);
  }

  const prev = () => {
    setCurrentStep(currentStep <= 1 ? 1 : currentStep - 1);
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
            <Step1
              currentStep={currentStep}
              handleChange={handleChange}
              fields={fields}
            />

            <Step2
              currentStep={currentStep}
              handleChange={handleChange}
              fields={fields}
            />

            {
              (fields.roles === "Entreprise" || fields.roles === "Association") &&
              <Step3
                currentStep={currentStep}
                handleChange={handleChange}
                fields={fields}
              />
            }

            { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

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
    createProfile: PropTypes.func.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Signup)

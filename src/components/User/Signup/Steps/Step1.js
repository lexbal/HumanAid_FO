import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';

const Step1 = ({fields, handleChange, currentStep}) => {
  return (
    currentStep === 1 &&
    <div className="step1">
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

      <hr/>

      <Form.Group as={Row} controlId="usernameGroup">
        <Form.Label column sm="2">
          Nom d'utilisateur :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="username"
            placeholder="Nom d'utilisateur"
            value={fields.username}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="emailGroup">
        <Form.Label column sm="2">
          Email :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="email"
            placeholder="E-mail"
            value={fields.email}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
      <Form.Group as={Row} controlId="passwordGroup">
        <Form.Label column sm="2">
          Mot de passe :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={fields.password}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default Step1;

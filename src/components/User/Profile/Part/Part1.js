import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';

const Part1 = ({ user, errors, handleChange }) => {
  return (
    <div className="part1">
      <Form.Label>Informations de connexion</Form.Label>

      <hr/>
      
      <div className="part">
        <Form.Group as={Row} controlId="usernameGroup">
            <Form.Label column sm="4">
                Nom d'utilisateur :
            </Form.Label>
            <Col sm="8">
                <Form.Control
                    id="username"
                    type="text"
                    name="username"
                    placeholder="Nom d'utilisateur"
                    defaultValue={user.username}
                    onChange={handleChange}
                    isValid={user.username}
                    isInvalid={errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="emailGroup">
            <Form.Label column sm="4">
                Email :
            </Form.Label>
            <Col sm="8">
                <Form.Control
                    id="email"
                    type="text"
                    name="email"
                    placeholder="E-mail"
                    defaultValue={user.email}
                    onChange={handleChange}
                    isValid={user.email}
                    isInvalid={errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
            </Col>
        </Form.Group>
      </div>
    </div>
  );
};

Part1.propTypes = {
  user: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired
};

export default Part1;

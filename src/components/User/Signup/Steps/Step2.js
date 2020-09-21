import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';

const Step2 = ({fields, errors, handleChange, currentStep}) => {
  return (
    currentStep === 2 &&
    <div className="step2">
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Adresse :
        </Form.Label>
        <Col sm={10}>
          <Form.Row>
            <Col>
              <Form.Control
                type="text"
                name="address"
                id="street"
                placeholder="Adresse"
                value={fields.address.street}
                onChange={handleChange}
                isValid={fields.address.street}
                isInvalid={errors.address.street}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address.street}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="address"
                id="zipcode"
                placeholder="Code postal"
                value={fields.address.zipcode}
                onChange={handleChange}
                isValid={fields.address.zipcode}
                isInvalid={errors.address.zipcode}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address.zipcode}
              </Form.Control.Feedback>
            </Col>
            <Col>
              <Form.Control
                type="text"
                name="address"
                id="city"
                placeholder="Ville"
                value={fields.address.city}
                onChange={handleChange}
                isValid={fields.address.city}
                isInvalid={errors.address.city}
              />
              <Form.Control.Feedback type="invalid">
                {errors.address.city}
              </Form.Control.Feedback>
            </Col>
          </Form.Row>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Pays :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="address"
            id="country"
            placeholder="Pays"
            value={fields.address.country}
            onChange={handleChange}
            isValid={fields.address.country}
            isInvalid={errors.address.country}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address.country}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Département :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="address"
            id="department"
            placeholder="Département"
            value={fields.address.department}
            onChange={handleChange}
            isValid={fields.address.department}
            isInvalid={errors.address.department}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address.department}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Région :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="address"
            id="region"
            placeholder="Région"
            value={fields.address.region}
            onChange={handleChange}
            isValid={fields.address.region}
            isInvalid={errors.address.region}
          />
          <Form.Control.Feedback type="invalid">
            {errors.address.region}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>
    </div>
  );
};

Step2.propTypes = {
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  currentStep: PropTypes.number
};

export default Step2;

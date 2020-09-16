import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';

const Step2 = ({fields, handleChange, currentStep}) => {
  return (
    currentStep === 2 &&
    <div className="step2">
      <Form.Label>Informations géographique</Form.Label>
      <hr/>

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
          />
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
          />
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
          />
        </Col>
      </Form.Group>
    </div>
  );
};

export default Step2;

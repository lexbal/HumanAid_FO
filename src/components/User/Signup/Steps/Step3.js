import React from 'react';
import {
  Form, FormControl, Col, Row
} from 'react-bootstrap';

const Step3 = ({fields, handleChange, currentStep}) => {
  return (
    currentStep === 3 &&
    <div className="step3">
      <Form.Label>Informations professionnelles</Form.Label>

      <hr/>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Logo :
        </Form.Label>
        <Col sm="10">
          <Form.File
            id="custom-file-translate-scss"
            label="Logo"
            name="photo"
            lang="fr"
            custom
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="nameGroup">
        <Form.Label column sm="2">
          Nom :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="name"
            placeholder={"Nom de l'" + fields.roles}
            value={fields.name}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Description :
        </Form.Label>
        <Col sm="10">
          <FormControl
            as="textarea"
            name="description"
            id="description"
            aria-label="With textarea"
            placeholder="Description"
            value={fields.description}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      <Form.Group as={Row} controlId="websiteGroup">
        <Form.Label column sm="2">
          Lien vers votre site web :
        </Form.Label>
        <Col sm="10">
          <Form.Control
            type="text"
            name="website"
            placeholder="Site Web"
            value={fields.website}
            onChange={handleChange}
          />
        </Col>
      </Form.Group>

      {
        fields.roles === "Entreprise" &&
        <Form.Group as={Row} controlId="siretGroup">
          <Form.Label column sm="2">
            Siret :
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              name="siret"
              placeholder="Siret"
              value={fields.siret}
              onChange={handleChange}
            />
          </Col>
        </Form.Group>
      }
    </div>
  );
};

export default Step3;

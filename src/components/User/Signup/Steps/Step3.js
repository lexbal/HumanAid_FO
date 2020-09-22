import React from 'react';
import {
  Form, FormControl, Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';

const Step3 = ({fields, errors, handleChange, currentStep}) => {
  return (
    currentStep === 3 &&
    <div className="step3">
      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Logo :
        </Form.Label>
        <Col sm="10">
          <Form.File
            id="custom-file-translate-scss"
            lang="fr"
            custom
          >
            <Form.File.Input
              name="photo"
              isValid={fields.photo}
              isInvalid={errors.photo}
              onChange={handleChange}
            />
            <Form.File.Label data-browse="Upload">
              {fields.photo ? fields.photo.name : "Insérer une image"}
            </Form.File.Label>
            <Form.Control.Feedback type="invalid">
              {errors.photo}
            </Form.Control.Feedback>
          </Form.File>
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
            isValid={fields.name}
            isInvalid={errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      {
        fields.roles === "Association" &&
        <Form.Group as={Row}>
          <Form.Label column sm="2">
            Président/Représentant :
          </Form.Label>
          <Col sm={10}>
            <Form.Row>
              <Col>
                <Form.Control
                  type="text"
                  name="manager_last_name"
                  placeholder="Nom"
                  value={fields.manager_last_name}
                  onChange={handleChange}
                  isValid={fields.manager_last_name}
                  isInvalid={errors.manager_last_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.manager_last_name}
                </Form.Control.Feedback>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  name="manager_first_name"
                  placeholder="Prénom"
                  value={fields.manager_first_name}
                  onChange={handleChange}
                  isValid={fields.manager_first_name}
                  isInvalid={errors.manager_first_name}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.manager_first_name}
                </Form.Control.Feedback>
              </Col>
            </Form.Row>
          </Col>
        </Form.Group>
      }

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
            isValid={fields.website}
            isInvalid={errors.website}
          />
          <Form.Control.Feedback type="invalid">
            {errors.website}
          </Form.Control.Feedback>
        </Col>
      </Form.Group>

      <Form.Group as={Row}>
        <Form.Label column sm="2">
          Téléphone :
        </Form.Label>
        <Col sm="10">
          <FormControl
            type="text"
            name="landline"
            placeholder="Téléphone"
            value={fields.landline}
            onChange={handleChange}
            isValid={fields.landline}
            isInvalid={errors.landline}
          />
          <Form.Control.Feedback type="invalid">
            {errors.landline}
          </Form.Control.Feedback>
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
            isValid={fields.description}
            isInvalid={errors.description}
          />
          <Form.Control.Feedback type="invalid">
            {errors.description}
          </Form.Control.Feedback>
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
              isValid={fields.siret}
              isInvalid={errors.siret}
            />
            <Form.Control.Feedback type="invalid">
              {errors.siret}
            </Form.Control.Feedback>
          </Col>
        </Form.Group>
      }
    </div>
  );
};

Step3.propTypes = {
  fields: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  handleChange: PropTypes.func.isRequired,
  currentStep: PropTypes.number
};

export default Step3;

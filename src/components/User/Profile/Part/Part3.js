import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';

const Part3 = ({ user, errors, handleChange }) => {
    return (
        <div className="part3">
            <Form.Label>Informations professionnelles</Form.Label>

            <hr/>

            <div className="part">
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
                                onChange={handleChange}
                            />
                            <Form.File.Label data-browse="Upload">
                                {user.photo && !user.file ? user.photo : null}
                                {user.file ? user.file : null}
                                {!user.file && !user.photo ? "Insérer une image" : null}
                            </Form.File.Label>
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
                            placeholder={"Nom de l'" + user.roles}
                            defaultValue={user.name}
                            onChange={handleChange}
                            isValid={user.name}
                            isInvalid={errors.name}
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.name}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {
                    user.roles.includes("ASSOC") &&
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
                                        defaultValue={user.manager_last_name}
                                        onChange={handleChange}
                                        isValid={user.manager_last_name}
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
                                        defaultValue={user.manager_first_name}
                                        onChange={handleChange}
                                        isValid={user.manager_first_name}
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
                            defaultValue={user.website}
                            onChange={handleChange}
                            isValid={user.website}
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
                        <Form.Control
                            type="text"
                            name="landline"
                            placeholder="Téléphone"
                            defaultValue={user.landline}
                            onChange={handleChange}
                            isValid={user.landline}
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
                        <Form.Control
                            as="textarea"
                            name="description"
                            id="description"
                            aria-label="With textarea"
                            placeholder="Description"
                            defaultValue={user.description}
                            onChange={handleChange}
                            isValid={user.description}
                            isInvalid={errors.description} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.description}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Lien page facebook :
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="facebook"
                            placeholder="Facebook"
                            defaultValue={user.facebook}
                            onChange={handleChange}
                            isValid={user.facebook}
                            isInvalid={errors.facebook} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.facebook}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                <Form.Group as={Row}>
                    <Form.Label column sm="2">
                        Lien page Twitter :
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control
                            type="text"
                            name="twitter"
                            placeholder="Twitter"
                            defaultValue={user.twitter}
                            onChange={handleChange}
                            isValid={user.twitter}
                            isInvalid={errors.twitter} 
                        />
                        <Form.Control.Feedback type="invalid">
                            {errors.twitter}
                        </Form.Control.Feedback>
                    </Col>
                </Form.Group>

                {
                    user.roles.includes("COMP") &&
                    <Form.Group as={Row} controlId="siretGroup">
                        <Form.Label column sm="2">
                            Siret :
                        </Form.Label>
                        <Col sm="10">
                            <Form.Control
                                type="text"
                                name="siret"
                                placeholder="Siret"
                                defaultValue={user.siret}
                                onChange={handleChange}
                                isValid={user.siret}
                                isInvalid={errors.siret} 
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.siret}
                            </Form.Control.Feedback>
                        </Col>
                    </Form.Group>
                }
            </div>
        </div>
    );
};

Part3.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Part3;
import React from 'react';
import {
  Form, Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';

const Part2 = ({ user, errors, handleChange }) => {
  return (
    <div className="part2">
        <Form.Label>Coordonnées géographiques</Form.Label>

        <hr/>

        <div className="part">
            <Form.Group as={Row}>
                <Form.Label column sm={3}>
                    Adresse :
                </Form.Label>
                <Col sm={9}>
                    <Form.Row>
                        <Col>
                            <Form.Control
                                type="text"
                                name="address"
                                id="street"
                                placeholder="Adresse"
                                defaultValue={user.address ? user.address.street : ""}
                                onChange={handleChange}
                                isValid={user.address ? user.address.street : ""}
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
                                defaultValue={user.address ? user.address.zipcode : ""}
                                onChange={handleChange}
                                isValid={user.address ? user.address.zipcode : ""}
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
                                defaultValue={user.address ? user.address.city : ""}
                                onChange={handleChange}
                                isValid={user.address ? user.address.city : ""}
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
                <Form.Label column sm={3}>
                    Pays :
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        name="address"
                        id="country"
                        placeholder="Pays"
                        defaultValue={user.address ? user.address.country : ""}
                        onChange={handleChange}
                        isValid={user.address ? user.address.country : ""}
                        isInvalid={errors.address.country}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address.country}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>
                    Département :
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        name="address"
                        id="department"
                        placeholder="Département"
                        defaultValue={user.address ? user.address.department : ""}
                        onChange={handleChange}
                        isValid={user.address ? user.address.department : ""}
                        isInvalid={errors.address.department}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address.department}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
            <Form.Group as={Row}>
                <Form.Label column sm={3}>
                    Région :
                </Form.Label>
                <Col sm={9}>
                    <Form.Control
                        type="text"
                        name="address"
                        id="region"
                        placeholder="Région"
                        defaultValue={user.address ? user.address.region : ""}
                        onChange={handleChange}
                        isValid={user.address ? user.address.region : ""}
                        isInvalid={errors.address.region}
                    />
                    <Form.Control.Feedback type="invalid">
                        {errors.address.region}
                    </Form.Control.Feedback>
                </Col>
            </Form.Group>
        </div>
    </div>
  );
};

Part2.propTypes = {
    user: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired,
    handleChange: PropTypes.func.isRequired
};

export default Part2;

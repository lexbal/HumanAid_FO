import React from 'react';
import {Col, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

const Company = ({ id, name, description }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card style={{ width: '95%' }}>
        <Card.Header>
            {name}
        </Card.Header>
        <Card.Body>
          {description}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Company;

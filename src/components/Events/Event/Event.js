import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Event.css';

const Event = ({ id, title, description }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card style={{ width: '95%' }}>
        <Card.Header>
          <div style={{ float: 'left', width: '90%' }}>
            {title}
          </div>
          <div style={{ float: 'right' }}>
            <Link to={`/event/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <FontAwesomeIcon icon={faInfoCircle} color="grey"/>
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
          {description}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Event;

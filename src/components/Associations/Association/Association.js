import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Association.css';

const Association = ({ id, name, description }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card className="assoc-card">
        <Card.Header>
          <div className="assoc-name">
            {name}
          </div>
          <div className="assoc-link">
            <Link to={`/association/detail/${id}`}>
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

Association.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
};

export default Association;

import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Event.css';

const Event = ({ id, title, description, categories, publish_date }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card style={{ width: '95%' }}>
        <Card.Header>
          <div style={{ float: 'left', width: '90%' }} className="title">
            {title}
          </div>
          <div style={{ float: 'right' }}>
            <Link to={`/event/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <FontAwesomeIcon icon={faInfoCircle} color="grey"/>
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
            {categories && (
              <div>
                {categories.split(',').map((element, i) =>
                  <Badge pill variant="primary">
                    {element}
                  </Badge>
                )}
              </div>
            )}
          <Card.Text className="description">
            {description}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small className="text-muted">Publié le {new Date(publish_date).toLocaleString()}</small>
        </Card.Footer>
      </Card>
    </Col>
  );
};

export default Event;

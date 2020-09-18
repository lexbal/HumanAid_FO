import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Badge } from 'react-bootstrap';
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Event.css';

const Event = ({ id, title, description, categories, publish_date }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card className="event-card">
        <Card.Header>
          <div className="event-name">
            {title}
          </div>
          <div className="event-link">
            <Link to={`/event/detail/${id}`}>
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

Event.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  categories: PropTypes.array.isRequired, 
  publish_date: PropTypes.string.isRequired
};

export default Event;

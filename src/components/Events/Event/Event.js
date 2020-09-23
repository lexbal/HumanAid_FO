import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card, Badge } from 'react-bootstrap';
import PropTypes from'prop-types';
import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faStar } from '@fortawesome/free-solid-svg-icons';

import './Event.css';

const Event = ({ id, title, description, categories, rating, publish_date }) => {
  let string = CryptoJS.AES.encrypt((typeof id === "number") ? id.toString() : id, process.env.REACT_APP_SECRET).toString();
  let encryptedId = string.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');

  return (
    <Col xs={4} md={4} lg={4}>
      <Card className="event-card shadow">
        <Card.Header>
          <div className="event-name">
            <div className="event-card-title">
              {title}
            </div>
            {categories && (
              <div className="badge-category">
                {categories.split(',').map((element, i) =>
                  <Badge pill variant="primary">
                    {element}
                  </Badge>
                )}
              </div>
            )}
            {
              rating && (
                <div className="event-rating">
                  {rating}<FontAwesomeIcon icon={faStar} size="1x" color="yellow"/>
                </div>
              )
            }
          </div>
          <div className="event-link">
            <Link to={`/event/detail/${encryptedId}`}>
              <FontAwesomeIcon icon={faInfoCircle} color="grey"/>
            </Link>
          </div>
        </Card.Header>
        <Card.Body>
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
  rating: PropTypes.string.isRequired,
  publish_date: PropTypes.string.isRequired
};

export default Event;

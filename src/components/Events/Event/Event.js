import React from 'react';
import { Link } from "react-router-dom";
import { Col, Card } from 'react-bootstrap';

import './Event.css';

const Event = ({ id, title, description, star_date }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card style={{ width: 'auto' }}>
        <Link to={`/event/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <div className="card-body">
            <h4>{star_date}</h4>
            <h5 className="card-title">{title}</h5>
            <p className="card-body">{description}</p>
          </div>
        </Link>
      </Card>
    </Col>
  );
};

export default Event;

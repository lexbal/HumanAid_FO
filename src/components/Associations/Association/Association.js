import React from 'react';
import {Col, Card} from 'react-bootstrap';
import { Link } from "react-router-dom";

import './Association.css';

const Association = ({ id, title, description }) => {
  return (
    <Col xs={4} md={4} lg={4}>
      <Card style={{ width: 'auto' }}>
        <Link to={`/association/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-body">{description}</p>
          </div>
        </Link>
      </Card>
    </Col>
  );
};

export default Association;

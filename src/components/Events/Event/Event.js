import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import './Event.css';

const Event = ({ title, description }) => {
  return (
    <div className='event'>
      <Row>
        <Col xs={4} md={4} lg={4}>
          <Image
            src={require(`../../../no-image-found.png`)}
            alt=""
            height="250"
            onerror="this.src='../../../no-image-found.png'" rounded />
        </Col>
        <Col xs={8} md={8} lg={8}>
          <h5>{title}</h5>
          <p>{description}</p>
        </Col>
      </Row>
    </div>
  );
};

export default Event

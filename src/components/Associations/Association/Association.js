import React from 'react';
import { Col, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
//import CryptoJS from "crypto-js";
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';

import './Association.css';

const Association = ({ id, name, description }) => {
  /*let test = CryptoJS.AES.encrypt((typeof id === "number") ? id.toString() : id, process.env.REACT_APP_SECRET).toString();
  let encryptedId = test.replace(/\+/g,'p1L2u3S').replace(/\//g,'s1L2a3S4h').replace(/=/g,'e1Q2u3A4l');*/

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

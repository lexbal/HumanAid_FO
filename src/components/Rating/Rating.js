import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';


const Rating = ({ username, rating, comment, publish_date }) => {
    return (
        <div className='Rating'>
            <Row>    
                <Col xs={2} md={2} lg={2}>
                    <Row> 
                        <Col className="text-center">{username}</Col>
                    </Row>
                    <Row> 
                        <Col className="text-center">{rating}<FontAwesomeIcon icon={faStar} size="1x" color="yellow"/></Col>
                    </Row>
                </Col>   
                <Col xs={10} md={10} lg={10}>
                    <Row> 
                        <Col>{comment}</Col>
                    </Row>
                    <Row> 
                        <Col className="text-right"><small>Publié le {new Date(publish_date).toLocaleString()}</small></Col>
                    </Row>
                </Col>
            </Row>
        </div>
    );
};

export default Rating;
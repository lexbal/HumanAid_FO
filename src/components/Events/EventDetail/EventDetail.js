import React, { useEffect } from 'react';
import {
  Row, Col, Card, Container, ListGroup
} from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from'prop-types';
//import CryptoJS from "crypto-js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import notFound from '../../../images/no-image-found.png';
import { getEvent } from '../../../redux/actions/event';
import Rating from '../../Rating/Rating';
import RatingForm from '../../Rating/RatingForm/RatingForm';
import './EventDetail.css';

const mapStateToProps = (state) => {
  return {
    loggedIn: state.user.loggedIn,
    event: state.events.event
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleEvent: id => {
      dispatch(getEvent(id))
    }
  }
}

const EventDetail = ({ getSingleEvent, event, loggedIn }) => {
  let { id } = useParams();
  //let decryptedId = null;

  useEffect(() => {
    /*let bytes = CryptoJS.AES.decrypt(id, process.env.REACT_APP_SECRET);
    decryptedId = bytes.toString(CryptoJS.enc.Utf8).replace(/s1L2a3S4h/g, '/');*/
    getSingleEvent(id);
  // eslint-disable-next-line
  }, []);

  const handleClick  = (path) => {
    window.open(path, '_blank');
  }

  return (
    <div className='event-detail'>
      <Container>
        <Card className="assoc-container">
            <Card.Body>
            <Row>
              {event.event &&
                <>
                  <Col xs={4} md={4} lg={4}>
                    <Card>
                      {event.event.photo && <Card.Img variant="top" src={process.env.REACT_APP_STATIC_HOST + event.event.photo}/>}
                      {!event.event.photo && <Card.Img variant="top" src={notFound}/>}
                      <Card.Body>
                        <Card.Text>
                          <span className="informations">Organisateur :</span>
                          <span className="text-right">{event.event.name}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Email :</span>
                          <span className="text-right">{event.event.email}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Telephone :</span>
                          <span className="text-right">{event.event.landline}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Adresse :</span>
                          <span className="text-right">{event.event.street}</span>
                        </Card.Text>
                        <Card.Text className="networks">
                          <FontAwesomeIcon icon={faFacebookSquare} size="2x" color="#3b5998" onClick={() => handleClick(event.event.facebook)}/>
                          <FontAwesomeIcon icon={faTwitterSquare} size="2x" onClick={() => handleClick(event.event.twitter)}/>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={8} md={8} lg={8}>
                    <h4>{event.event.title ? event.event.title : "Title not found"}</h4>
                    {
                      event.event.start_date &&
                      <h6>
                        Date de l'événement : {event.event.end_date && <>du </>}
                        {new Date(event.event.start_date).toLocaleString()}
                        {event.event.end_date && <> à {new Date(event.event.end_date).toLocaleString()} </>}
                      </h6>
                    }
                    <p>{event.event.description ? event.event.description : "Aucune description disponible"}</p>

                    <Row className="comments">
                      <Col>
                        <h5>Commentaires :</h5>
                      </Col>
                    </Row>
                    <Row>
                      <ListGroup className="ratings">
                        {event.ratings && event.ratings.map(({username, rating, comment, publish_date}, i) =>
                            <ListGroup.Item key={i}><Rating username={username} rating={rating} comment={comment} publish_date={publish_date} /></ListGroup.Item>
                          )
                        }
                        {loggedIn && <ListGroup.Item><RatingForm event_id={id} /></ListGroup.Item>}
                      </ListGroup>
                    </Row>
                  </Col>
                </>
              }
            </Row>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

EventDetail.propTypes = {
  getSingleEvent: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  event: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail);

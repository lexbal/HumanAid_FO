import React, { useEffect } from 'react';
import { Container, Col, Row, Card } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import CryptoJS from "crypto-js";
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import Event from '../../Events/Event/Event';
import { getAssoc } from '../../../redux/actions/assoc';
import notFound from '../../../images/no-image-found.png';
import './AssocDetail.css';

const mapStateToProps = (state) => {
  return {
    assoc: state.assocs.assoc,
    error: state.assocs.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleAssoc: id => {
      dispatch(getAssoc(id))
    }
  }
}

const AssocDetail = ({ getSingleAssoc, assoc }) => {
  let { id } = useParams();

  const handleClick  = (path) => {
    window.open(path, '_blank');
  }

  useEffect(() => {
    let newId = id.replace(/p1L2u3S/g, '+' ).replace(/s1L2a3S4h/g, '/').replace(/e1Q2u3A4l/g, '=');
    let decryptedId = CryptoJS.AES.decrypt(newId, process.env.REACT_APP_SECRET).toString(CryptoJS.enc.Utf8);
    getSingleAssoc(decryptedId);
  // eslint-disable-next-line
  }, []);

  return (
    <div className='assoc-detail'>
      <Container>
        <Card className="assoc-container">
          <Card.Body>
            <Row>
              {assoc.assoc &&
                <>
                  <Col xs={4} md={4} lg={4}>
                    <Card className="card-info">
                      {assoc.assoc.photo && <Card.Img variant="top" src={process.env.REACT_APP_STATIC_HOST + assoc.assoc.photo}/>}
                      {!assoc.assoc.photo && <Card.Img variant="top" src={notFound}/>}
                      <Card.Body>
                        <Card.Text>
                          <span className="informations">Président :</span>
                          <span className="text-right">{assoc.assoc.manager_first_name + " " + assoc.assoc.manager_last_name}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Email :</span>
                          <span className="text-right">{assoc.assoc.email}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Telephone :</span>
                          <span className="text-right">{assoc.assoc.landline}</span>
                        </Card.Text>
                        <Card.Text>
                          <span className="informations">Adresse :</span>
                          <span className="text-right">{assoc.assoc.street}</span>
                        </Card.Text>
                        {
                          (assoc.assoc.twitter || assoc.assoc.facebook) && (
                            <Card.Text className="networks">
                              {assoc.assoc.facebook && <FontAwesomeIcon icon={faFacebookSquare} size="2x" color="#3b5998" onClick={() => handleClick(assoc.assoc.facebook)}/>}
                              {assoc.assoc.twitter && <FontAwesomeIcon icon={faTwitterSquare} size="2x" onClick={() => handleClick(assoc.assoc.twitter)}/>}
                            </Card.Text>
                          )
                        }
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col xs={8} md={8} lg={8}>
                    <Row>
                      <Col>
                        <h4>{assoc.assoc.name}</h4>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {assoc.assoc.description}
                      </Col>
                    </Row>
                    {assoc.events && (
                      <div className="assoc-events">
                        <Row>
                          <Col>
                            <h5>Nos évènements :</h5>
                          </Col>
                        </Row>
                        <Row>
                          {
                            assoc.events.map(({id, title, description, categories, rating, publish_date}, i) =>
                              <Event id={id} title={title} description={description} categories={categories} publish_date={publish_date} rating={rating} key={i}/>
                            )
                          }
                        </Row>
                      </div>
                    )}
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

AssocDetail.propTypes = {
  getSingleAssoc: PropTypes.func.isRequired,
  assoc: PropTypes.object.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssocDetail);

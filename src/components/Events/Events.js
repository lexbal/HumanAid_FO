import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Container, Spinner, Button, Card } from 'react-bootstrap';
import { Link } from "react-router-dom";
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Event from './Event/Event';
import Pagination from '../Pagination/Pagination';
import { getEvents } from '../../redux/actions/event';
import './Events.css';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
    role: state.user.role,
    events: state.events.events
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: () => {
      dispatch(getEvents())
    }
  }
}

const Events = ({ role, events, loading, getAllEvents }) => {
  const [eventsPerPage]               = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastEvent              = currentPage * eventsPerPage;
  const indexOfFirstEvent             = indexOfLastEvent - eventsPerPage;
  const currentEvents                 = events.length > 0 ? events.slice(indexOfFirstEvent, indexOfLastEvent) : [];

  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='Events'>
      <Container>
        <Row>
          {
            !loading && events && events.length > 0 && currentEvents.map(({id, title, description, categories, rating, publish_date}, i) =>
              <Event id={id} title={title} description={description} categories={categories} publish_date={publish_date} rating={rating} key={i}/>
            )
          }
          {
            !loading && events.length === 0 && (
              <Col>
                <Card className="no-data">
                  <Card.Body>
                    <Card.Title>Aucun évènements de programmée pour le moment</Card.Title>
                    {role === "ROLE_ASSOC" &&
                      <>
                        <Card.Text>
                          <h5>Gagner en visibilité et créer l'annonce de votre évènements maintenant</h5>
                          <Link to="/event/add" style={{ marginRight: '10px' }}>
                            <Button>
                              <FontAwesomeIcon icon={faPlus} color="white"/>
                              Ajoutez un évènement
                            </Button>
                          </Link>
                        </Card.Text>
                      </>
                    }
                  </Card.Body>
                </Card>
              </Col>
            )
          }
          {
            loading &&
            <Col>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </Col>
          }
        </Row>
        {
          !loading && events && events.length > 0 &&
          <Pagination
            entitiesPerPage={eventsPerPage}
            totalEntities={events.length}
            setCurrentPage={setCurrentPage}
          />
        }
      </Container>
    </div>
  );
};

Events.propTypes = {
  getAllEvents: PropTypes.func.isRequired,
  role: PropTypes.string.isRequired,
  events: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events);

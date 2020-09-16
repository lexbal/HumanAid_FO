import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import { Row, Col, Container, Spinner, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Event from './Event/Event';
import Pagination from '../Pagination/Pagination';
import { getEvents } from '../../redux/actions/event';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
    role: state.user.role,
    events: state.events.events,
    error: state.events.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEvents: () => {
      dispatch(getEvents())
    }
  }
}

const Events = ({ role, events, loading, error, getAllEvents }) => {
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
    <div className='events'>
      <Container>
        <Row>
          {
            !loading && events && events.length > 0 && currentEvents.map(({id, title, description, categories, publish_date}, i) =>
              <Event id={id} title={title} description={description} categories={categories} publish_date={publish_date} key={i}/>
            )
          }
          {
            !loading && events.length === 0 && (
              <Col>
                <h1>Aucun évènements !</h1>
                {role === "ROLE_ASSOC" &&
                  <>
                    <h5>Gagner en visibilité et créer l'annonce de votre évènements maintenant</h5>
                    <Button>
                      <FontAwesomeIcon icon={faPlus} color="white"/>
                      Ajoutez un évènement
                    </Button>
                  </>
                }
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

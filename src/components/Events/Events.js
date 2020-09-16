import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './Events.css';
import { Row, Col, Container, Spinner } from 'react-bootstrap';

import Event from './Event/Event';
import Pagination from '../Pagination/Pagination';
import { getEvents } from '../../redux/actions/event';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
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

const Events = ({ events, loading, error, getAllEvents }) => {
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
            !loading && events.length === 0 &&
            <Col>
              Aucun évènements !
            </Col>
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

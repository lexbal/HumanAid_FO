import React, { useEffect } from 'react';
import { Container, ListGroup, Spinner, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';

import Event from './Event/Event';
import { getEvents } from '../../redux/actions/event';
import './Events.css';

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
  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='events'>
      <Container>
        <ListGroup>
          {
            !loading && events && events.length > 0 && events.map(({description, title}, i) =>
              <ListGroup.Item key={i}>
                <Event title={title} description={description}/>
              </ListGroup.Item>
            )
          }
          {
            loading &&
            <ListGroup.Item>
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </ListGroup.Item>
          }
        </ListGroup>
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

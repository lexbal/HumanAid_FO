import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import './Event/Event.css';
import { Row, Col } from 'react-bootstrap';

import Event from './Event/Event';
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
  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='events'>
      <Container>
        <Row>
          {
            !loading && events && events.length > 0 && events.map(({id, title, description, star_date}, i) =>
                <Event id={id} title={title} description={description} star_date={star_date} key={i}/>
            )
          }
          {
            !loading && events.length === 0 &&
            <Col>Aucun évènements !</Col>
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
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

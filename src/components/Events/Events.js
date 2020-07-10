import React, { useEffect } from 'react';
import { Container, ListGroup, Spinner, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import './Event/Event.css'
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
          {
            !loading && events && events.length > 0 && events.map(({title, id,star_date,description}, i) =>
              <div class="card" key={i} classname="event-item">
                <Link to={`/event/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <div class="card-body">
                    <h4>{star_date}</h4>
                    <h5 class="card-title">{title}</h5>
                    <p class="card-body">{description}</p>
                  </div>
                </Link>
              </div>
            )
          }
          {
            !loading && events.length === 0 &&
            <div class="card">
              Aucun évènements !
            </div>
          }
          {
            loading &&
            <div class="card">
              <Spinner animation="border" role="status">
                <span className="sr-only">Loading...</span>
              </Spinner>
            </div>
          }
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Events)

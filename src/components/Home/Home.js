import React, { useEffect } from 'react';
import './Home.css';
import { Carousel, Row, Col, Spinner } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getEvents } from '../../redux/actions/event';
import Event from '../Events/Event/Event';
import Companies from '../Companies/Companies';
import slide from '../../images/slide1.jpg';

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

const Home = ({ events, loading, error, getAllEvents }) => {
  useEffect(() => {
    getAllEvents();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='home'>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={slide}
            alt="HumanAid"
          />
          <Carousel.Caption>
            <h3>HumanAid</h3>
            <p>Solution digitale répertoriant les évènements associatifs à but non lucratif</p>
          </Carousel.Caption>
            </Carousel.Item>
        {
          !loading && events && events.length > 0 && events.slice(0, 5).map(({id, title, description, categories, publish_date}, i) =>
            <Carousel.Item key={i}>
              <img
                className="d-block w-100"
                src="holder.js/800x400?text=First slide&bg=373940"
                alt=""
              />
              <Carousel.Caption>
                <h3>{title}</h3>
                <p>{description}</p>
              </Carousel.Caption>
            </Carousel.Item>
          )
        }
      </Carousel>
      {events && events.length > 0 && (
        <div className='events'>
          <Row>
            {
              !loading && events.slice(0, 6).map(({id, title, description, categories, publish_date}, i) =>
                <Event id={id} title={title} description={description} categories={categories} publish_date={publish_date} key={i}/>
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
        </div>
      )}
       <Companies />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

import React, { useEffect } from 'react';
import {
  Row, Col, Image, Container
} from 'react-bootstrap';
import { useParams } from "react-router-dom";

import { connect } from 'react-redux';

import { getEvent } from '../../redux/actions/event';
import './EventDetail.css';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
    event: state.events.event,
    error: state.events.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleEvent: id => {
      dispatch(getEvent(id))
    }
  }
}

const EventDetail = ({ getSingleEvent, event }) => {
  let { id } = useParams();

  useEffect(() => {
    getSingleEvent(id);
  // eslint-disable-next-line
  }, []);

  return (
    <div className='event-detail'>
      <Container>
        <Row>
          <Col xs={4} md={4} lg={4}>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <Image src="holder.js/171x180" rounded />
              </Col>
            </Row>
            <Row>
              <Col xs={12} md={12} lg={12}>
                <h5>test</h5>
                <p>test</p>
              </Col>
            </Row>
          </Col>
          <Col xs={8} md={8} lg={8}>
            <h5>test</h5>
            <p>test</p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventDetail)

import React, { useEffect } from 'react';
import {
  Row, Col, Image, Container
} from 'react-bootstrap';

import { connect } from 'react-redux';

import { getAssoc } from '../../redux/actions/event';
import './AssocDetail.css';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
    assoc: state.events.assoc,
    error: state.events.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getSingleAssoc: () => {
      dispatch(getAssoc())
    }
  }
}

const AssocDetail = ({ getSingleAssoc, event }) => {
  useEffect(() => {
    getSingleEvent();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='assoc-detail'>
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
)(AssocDetail)
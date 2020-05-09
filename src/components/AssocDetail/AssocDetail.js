import React, { useEffect } from 'react';
import {
  Row, Col, Image, Container
} from 'react-bootstrap';
import { useParams } from "react-router-dom";

import { connect } from 'react-redux';

import { getAssoc } from '../../redux/actions/assoc';
import './AssocDetail.css';

const mapStateToProps = (state) => {
  return {
    loading: state.assocs.loading,
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

const AssocDetail = ({ getSingleAssoc, event }) => {
  let { id } = useParams();

  useEffect(() => {
    console.log(id)
    getSingleAssoc(id);
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

import React, { useEffect } from 'react';
import { Container, Col, Row, Image } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getAssoc } from '../../../redux/actions/assoc';
import notFound from '../../../images/no-image-found.png';
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

const AssocDetail = ({ getSingleAssoc, assoc }) => {
  let { id } = useParams();

  useEffect(() => {
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
                <Image
                  src={notFound}
                  alt=""
                  height="250"
                  onerror="this.src='../../../images/no-image-found.png'" rounded />
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
            <h5>{assoc.name}</h5>
            <p>{assoc.description}</p>
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

import React, { useEffect } from 'react';
import { Container, Row, Spinner, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Association from './Association/Association';
import { getAssociations } from '../../redux/actions/assoc';
import './Associations.css';

const mapStateToProps = (state) => {
  return {
    loading: state.assocs.loading,
    assocs: state.assocs.assocs,
    error: state.assocs.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssociations: () => {
      dispatch(getAssociations())
    }
  }
}

const Associations = ({ assocs, loading, error, getAllAssociations }) => {
  useEffect(() => {
    getAllAssociations();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='assocs'>
      <Container>
        <Row>
          {
            !loading && assocs && assocs.length > 0 && assocs.map(({description, name, id}, i) =>
              <Association id={id} name={name} description={description} key={i}/>
            )
          }
          {
            !loading && assocs.length === 0 &&
            <Col>
              Aucune association !
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
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Associations)

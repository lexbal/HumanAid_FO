import React, { useEffect } from 'react';
import { Container, ListGroup, Spinner, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';

import Association from './Association/Association';
import { getAssociations } from '../../redux/actions/assoc';
import './Associations.css';

const mapStateToProps = (state) => {
  return {
    loading: state.events.loading,
    assocs: state.events.assocs,
    error: state.events.error
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
    <div className='events'>
      <Container>
        <ListGroup>
          {
            !loading && assocs && assocs.length > 0 && assocs.map(({description, title}, i) =>
              <ListGroup.Item key={i}>
                <Association title={title} description={description}/>
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
)(Associations)
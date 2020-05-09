import React, { useEffect } from 'react';
import { Container, ListGroup, Spinner, Pagination } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

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
        <ListGroup>
          {
            !loading && assocs && assocs.length > 0 && assocs.map(({description, name, id}, i) =>
              <ListGroup.Item key={i}>
                <Link to={`/associations/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                  <Association name={name} description={description}/>
                </Link>
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

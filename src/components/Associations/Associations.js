import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Pagination from '../Pagination/Pagination';
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
  const [assocsPerPage]               = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const indexOfLastAssoc              = currentPage * assocsPerPage;
  const indexOfFirstAssoc             = indexOfLastAssoc - assocsPerPage;
  const currentAssocs                 = assocs.length > 0 ? assocs.slice(indexOfFirstAssoc, indexOfLastAssoc) : [];

  useEffect(() => {
    getAllAssociations();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='assocs'>
      <Container>
        <Row>
          {
            !loading && assocs && assocs.length > 0 && currentAssocs.map(({description, name, id}, i) =>
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
        {
          !loading && assocs && assocs.length > 0 && 
          <Pagination
            entitiesPerPage={assocsPerPage}
            totalEntities={assocs.length}
            setCurrentPage={setCurrentPage}
          />
        }
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Associations)

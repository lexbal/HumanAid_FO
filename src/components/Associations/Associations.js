import React, { useEffect } from 'react';
import { Container, ListGroup, Spinner, Pagination, Button, Card } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PlusSign from '../../image/plus.svg';
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
          {
            !loading && assocs && assocs.length > 0 && assocs.map(({description, name, id}, i) =>
              <div class="card" key={i}>
                
                  <img class="card-img-top" src="..." alt="Card image"/>
                  <h5 class="card-title">{name}</h5>
                      <div class="card-body">
                        <p>{description}</p>
                      </div>
                      <Link to={`/association/detail/${id}`} style={{ color: 'inherit', textDecoration: 'inherit'}}>
                      <button>Détail</button>
                </Link>
              </div>
            )
          }
          {
            !loading && assocs.length === 0 &&
            <div class="card">
              Aucune association !
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
)(Associations)

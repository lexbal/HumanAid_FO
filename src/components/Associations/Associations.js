import React, { useEffect, useState } from 'react';
import { Container, Row, Spinner, Col, Card, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";
import PropTypes from'prop-types';

import Pagination from '../Pagination/Pagination';
import Association from './Association/Association';
import { getAssociations } from '../../redux/actions/assoc';
import './Associations.css';

const mapStateToProps = (state) => {
  return {
    loading: state.assocs.loading,
    assocs: state.assocs.assocs
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllAssociations: () => {
      dispatch(getAssociations())
    }
  }
}

const Associations = ({ assocs, loading, getAllAssociations }) => {
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
              <Card className="no-data">
                <Card.Body>
                  <Card.Title>Aucune association ne s'est inscrite pour le moment</Card.Title>
                  <Card.Text>
                    <p>Vous êtes une association et vous aimeriez gagner de la visibilité ? Inscrivez-vous gratuitement dès maintenant !</p>
                    <Link to="/signup">
                      <Button>
                        S'inscrire
                      </Button>
                    </Link>
                  </Card.Text>
                </Card.Body>
              </Card>
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

Associations.propTypes = {
  getAllAssociations: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  assocs: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Associations);

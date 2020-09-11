import React, { useEffect } from 'react';
import { Container, Row, Spinner, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

import Company from './Company/Company';
import { getCompanies } from '../../redux/actions/company';
import './Companies.css';

const mapStateToProps = (state) => {
  return {
    loading: state.companies.loading,
    companies: state.companies.companies,
    error: state.companies.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => {
        dispatch(getCompanies(5))
    }
  }
}

const Companies = ({ companies, loading, error, getCompanies }) => {
  useEffect(() => {
    getCompanies();
  // eslint-disable-next-line
  }, []);

  return (
    <div className='companies'>
      <Container>
        <Row>
          {
            !loading && companies && companies.length > 0 && companies.map(({description, name, id}, i) =>
              <Company id={id} name={name} description={description} key={i}/>
            )
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
)(Companies)

import React, { useEffect } from 'react';
import {  Row, Spinner, Col, Image } from 'react-bootstrap';
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
    companies && companies.length > 0 && (
      <div className='companies'>
        <Row>
          {
            !loading && companies.map(({photo}, i) =>
              (
                <div>
                  {photo && <Image src={process.env.REACT_APP_API_HOST + "images/" + photo} className="logo" key={i}/>}
                </div>
              )
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
      </div>
    )
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Companies)

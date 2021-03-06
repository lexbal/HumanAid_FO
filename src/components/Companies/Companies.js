import React, { useEffect } from 'react';
import { Row, Spinner, Col, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import PropTypes from'prop-types';

import { getCompanies } from '../../redux/actions/company';
import './Companies.css';

const mapStateToProps = (state) => {
  return {
    loading: state.companies.loading,
    companies: state.companies.companies
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getCompanies: () => {
        dispatch(getCompanies(5))
    }
  }
}

const Companies = ({ companies, loading, getCompanies }) => {
  useEffect(() => {
    getCompanies();
  // eslint-disable-next-line
  }, []);

  return (
    companies && companies.length > 0 && (
      <div className='companies'>
        <Row>
          <Col>
            <h2>Les entreprises donnatrices</h2>
          </Col>
        </Row>
        <Row>
          {
            !loading && companies.map(({photo}, i) =>
              (
                <div>
                  {photo && <Image src={process.env.REACT_APP_STATIC_HOST + photo} className="logo" key={i}/>}
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

Companies.propTypes = {
  getCompanies: PropTypes.func.isRequired,
  companies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Companies);

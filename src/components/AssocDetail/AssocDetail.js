import React, { useEffect } from 'react';
import { Container,Spinner } from 'react-bootstrap';
import { useParams } from "react-router-dom";
import { connect } from 'react-redux';
import { getAssoc } from '../../redux/actions/assoc';
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

const AssocDetail = ({ assoc, getSingleAssoc,loading, event  }) => {
  let { id } = useParams();

  useEffect(() => {
    console.log(id)
    getSingleAssoc(id);
  // eslint-disable-next-line
  }, []);

  return (
    <div className='assoc-detail'>
      <Container>
      {
        !loading && assoc && assoc.length > 0 && assoc.map(({description, name, location,email,website}, i) =>
        <div>
          <p>ceci est un test</p>
          <p>{description}</p>
        </div>
        )
      }
      {
       loading &&
          <Spinner animation="border" role="status">
            <span className="sr-only">Loading...</span>
          </Spinner>
      }
      </Container>
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AssocDetail)

import React from 'react';
import { Row, Col } from 'react-bootstrap';
import PropTypes from'prop-types';

const Pagination = ({ entitiesPerPage, totalEntities, setCurrentPage }) => {
    const pageNumbers = [];
    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };

    for (let i = 1; i <= Math.ceil(totalEntities / entitiesPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <Row>
            <Col>
                <nav>
                    <ul className='pagination justify-content-center'>
                        {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <a onClick={(e) => paginate(e, number)} href={'?page=' + number} className='page-link'>
                            {number}
                            </a>
                        </li>
                        ))}
                    </ul>
                </nav>
            </Col>
        </Row>
    );
};

Pagination.propTypes = {
    entitiesPerPage: PropTypes.number.isRequired,
    totalEntities: PropTypes.number.isRequired,
    setCurrentPage: PropTypes.func.isRequired
};

export default Pagination;

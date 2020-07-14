import React from 'react';
import { Row, Col } from 'react-bootstrap';

const Pagination = ({ entitiesPerPage, totalEntities, setCurrentPage }) => {
    // Change page
    const paginate = (e, pageNumber) => {
        e.preventDefault();
        setCurrentPage(pageNumber);
    };
    const pageNumbers = [];

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

export default Pagination;
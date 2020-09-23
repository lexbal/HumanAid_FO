import React from 'react';
import { Container, Col, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import ContactForm from './components/Contact/ContactForm/ContactForm';

const Footer = withRouter(({ location }) => {
    const includePaths = ["/", "/signup", "/profile", "/login", "/associations", "/events", "/event/add", "/contact"];
    const excludePaths = ["/login", "/signup", "/contact", "/event/add", "/profile"];
    const facebookLink = "https://www.facebook.com/HumanAid-100879451546535/";
    const twitterLink  = "https://twitter.com/human_aid";
    const handleClick  = (path) => {
        window.open(path, '_blank');
    }

    if (location.pathname.startsWith("/association/detail/") || location.pathname.startsWith("/event/detail/")) {
        let path = location.pathname.split('detail/');
    
        if (path[1].indexOf('/') >= 0) {
            return null;
        }
    }

    if (excludePaths.includes(location.pathname)) {
        return null;
    }

    if (!includePaths.includes(location.pathname) && (!location.pathname.startsWith("/association/detail/") && !location.pathname.startsWith("/event/detail/"))) {
        return null;
    }

    return (
        <div className="Footer">
            <Container>
                <Row className="titles">
                    <Col>
                        <h5>Contactez-nous :</h5>
                    </Col>
                    <Col>
                        <h5>Nos réseaux :</h5>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col>
                        <ContactForm />
                    </Col>
                    <Col className="network-icons">
                        <FontAwesomeIcon icon={faFacebook} size="5x" onClick={() => handleClick(facebookLink)}/>
                    </Col>
                    <Col className="network-icons">
                        <FontAwesomeIcon icon={faTwitterSquare} size="5x" onClick={() => handleClick(twitterLink)}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <small>Made by HumanAid &copy; 2020</small>
                    </Col>
                </Row>
            </Container>
        </div>
    );
});

export default Footer;

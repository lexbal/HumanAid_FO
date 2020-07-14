import React from 'react';
import { connect } from "react-redux";

import { Container, Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitterSquare } from "@fortawesome/free-brands-svg-icons";

import './Footer.css';
import ContactForm from './components/Contact/ContactForm/ContactForm';

const Footer = () => {
    const facebookLink = "https://www.facebook.com/HumanAid-100879451546535/";
    const twitterLink  = "https://twitter.com/human_aid";
    
    const handleClick  = (path) => {
        window.location.replace(path);
    }

    return (
        <div className="Footer">
            <Container>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <h5>Contactez-nous :</h5>
                    </Col>
                    <Col style={{ textAlign: "left" }}>
                        <h5>Réseaux :</h5>
                    </Col>
                    <Col></Col>
                </Row>
                <Row>
                    <Col style={{ textAlign: "left" }}>
                        <ContactForm />
                    </Col>
                    <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
                        <FontAwesomeIcon icon={faFacebook} size="5x" onClick={() => handleClick(facebookLink)}/>
                    </Col>
                    <Col style={{ marginTop: "auto", marginBottom: "auto" }}>
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
}

export default connect(
  null,
  null
)(Footer)

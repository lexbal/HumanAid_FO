import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Alert, Card, Button, Form,
  Col, Row
} from 'react-bootstrap';
import PropTypes from'prop-types';
import Select from 'react-select';
import DateTimePicker from 'react-datetime-picker';

import { createEvent, getCategories } from '../../../redux/actions/event';
import './EventForm.css';


const mapStateToProps = (state) => {
  return {
    eventCategories: state.events.categories,
    loggedIn: state.user.loggedIn,
    error: state.user.error
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getAllEventCategory: () => {
      dispatch(getCategories())
    },
    createEvent: (event) => {
      dispatch(createEvent(event))
    }
  }
}

const EventForm = ({ getAllEventCategory, createEvent, eventCategories, loggedIn, error }) => {
  const [visible, setVisible] = useState(false);
  const [fields, setField] = useState({
    title: "",
    description: "",
    categories: [],
    start: "",
    end: "",
  });
  const [errors, setError] = useState({
    title: "",
    description: "",
    categories: [],
    start: "",
    end: "",
  });

  const handleChange = (event, inputName = null) => {
    let value = [];
    
    if (event) {
      value = (event.length > 0) ? event[0] : event; 
    }
    
    let name  = inputName;

    if (!inputName) {
      const target = event.target;
      value  = target.type === 'checkbox' ? target.checked : target.value;
      name   = target.name;
    }

    if (name === 'categories') {
      setField({ ...fields, categories: (event) ? event : [] });
    } else {
      setError({ ...errors, [name]: !value ? "Ce champ est vide !" : ""});
      setField({ ...fields, [name]: value });
    }

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setVisible(true);
    createEvent(fields);
  }

  useEffect(() => {
    getAllEventCategory();
  // eslint-disable-next-line
  }, []);

  return (
    loggedIn ? (
    <div className='eventForm'>
      <Card className="shadow">
        <Card.Body>
          <h3>Informations de l'évènement</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} controlId="titleGroup">
              <Form.Label column sm="2">
                Nom/Titre de l'événement :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Nom/Titre"
                  value={fields.title}
                  onChange={handleChange}
                  isValid={fields.title}
                  isInvalid={errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="descriptionGroup">
              <Form.Label column sm="2">
                Description de l'événement :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="Description"
                  value={fields.description}
                  onChange={handleChange}
                  isValid={fields.description}
                  isInvalid={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="categoriesGroup">
              <Form.Label column sm="2">
                Catégorie d'événement :
              </Form.Label>
              <Col sm="10">
                <Select
                  isMulti
                  name="categories"
                  options={eventCategories ? eventCategories.map(({id, label}, i) => {
                    return {value: id, label: label};
                  }) : []}
                  onChange={e => handleChange(e, 'categories')}
                  value={fields.categories}
                  className="basic-multi-select"
                  classNamePrefix="select"
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="startGroup">
              <Form.Label column sm="2">
                Date de début :
              </Form.Label>
              <Col sm="10">
                <DateTimePicker
                  onChange={e => handleChange(e, 'start')}
                  value={fields.start}
                  placeholder="Date de début"
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} controlId="endGroup">
              <Form.Label column sm="2">
                Date de fin :
              </Form.Label>
              <Col sm="10">
                <DateTimePicker
                  onChange={e => handleChange(e, 'end')}
                  value={fields.end}
                  placeholder="Date de fin"
                />
              </Col>
            </Form.Group>

            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}
            {!error && visible && <Alert variant="success">L'annonce de votre événement a été créer avec succès</Alert>}

            <Button variant="primary" type="submit">
              Poster
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    ) : (
      <Redirect to='/'/>
    )
  );
};

EventForm.propTypes = {
  getAllEventCategory: PropTypes.func.isRequired,
  createEvent: PropTypes.func.isRequired, 
  eventCategories: PropTypes.array.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  error: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ])
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm);

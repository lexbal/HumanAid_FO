import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  Alert, Card, Button, Form
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
  const [fields, setField] = useState({
    title: "",
    description: "",
    categories: [],
    start: "",
    end: "",
  });

  const handleChange = (event, inputName = null) => {
    let value = (event.length > 0) ? event[0].id : event; 
    let name  = inputName;

    if (!inputName) {
      const target = event.target;
      value  = target.type === 'checkbox' ? target.checked : target.value;
      name   = target.name;
    }
    
    setField({ ...fields, [name]: value });

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    createEvent(fields);
  }

  useEffect(() => {
    getAllEventCategory();
  // eslint-disable-next-line
  }, []);

  return (
    loggedIn ? (
    <div className='eventForm'>
      <Card className="event-form-card">
        <Card.Header>Informations de l'évènement</Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="titleGroup">
              <Form.Control
                type="text"
                name="title"
                placeholder="Titre"
                value={fields.title}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="descriptionGroup">
              <Form.Control
                type="text"
                name="description"
                placeholder="Description"
                value={fields.description}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="categoriesGroup">
              <Select
                isMulti
                name="categories"
                options={eventCategories}
                onChange={e => handleChange(e, 'categories')}
                value={fields.categories}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>

            <Form.Group controlId="startGroup">
              <DateTimePicker
                onChange={e => handleChange(e, 'start')}
                value={fields.start}
                placeholder="Date de début"
              />
            </Form.Group>

            <Form.Group controlId="endGroup">
              <DateTimePicker
                onChange={e => handleChange(e, 'end')}
                value={fields.end}
                placeholder="Date de fin"
              />
            </Form.Group>

            {error && <Alert variant="danger">Une erreur est survenue !</Alert>}

            <Button variant="primary" type="submit">
              Envoyer
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

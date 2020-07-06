import React, { useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormControl from 'react-bootstrap/FormControl';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert';
import Select from 'react-select';

import { getCategories } from '../../redux/actions/event';


const mapStateToProps = (state) => {
  return {
    categories: state.events.categories,
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

const EventForm = ({ getAllEventCategory, categories, loggedIn, error }) => {
  const [fields, setField] = useState({
    title: "",
    description: "",
    categories: [],
    start: "",
    end: "",
  });

  const handleChange = (event) => {
    const target = event.target;
    const value  = target.type === 'checkbox' ? target.checked : target.value;
    const name   = target.name;

    setField({ ...fields, [name]: value });

    return true;
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  useEffect(() => {
    getAllEventCategory();
  // eslint-disable-next-line
  }, []);

  return (
    loggedIn ? (
    <div className='EventForm'>
      <Card style={{ width: '35rem', margin: "auto", marginTop: "10%" }}>
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

            <Form.Group controlId="categoryGroup">
              <Select
                isMulti
                name="colors"
                options={categories}
                className="basic-multi-select"
                classNamePrefix="select"
              />
            </Form.Group>

            <Form.Group controlId="startGroup">
              <Form.Control
                type="text"
                name="start"
                placeholder="Date de début"
                value={fields.start}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="endGroup">
              <FormControl
                type="text"
                name="end"
                placeholder="Date de fin"
                value={fields.end}
                onChange={handleChange}
              />
            </Form.Group>

            { error && <Alert variant="danger">Une erreur est survenue !</Alert>}

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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EventForm)

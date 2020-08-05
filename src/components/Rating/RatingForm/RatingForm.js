import React, { useState } from 'react';
import { Form, Alert, FormControl, Button } from 'react-bootstrap';
import { connect } from "react-redux";
import { createRating } from '../../../redux/actions/rating';

import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

const mapStateToProps = (state) => {
    return {
      loggedIn: state.user.loggedIn,
      error: state.user.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        createRating: (fields, id) => {
            dispatch(createRating(fields, id))
        }
    }
}

const RatingForm = ({ event_id, createRating, loggedIn, error }) => {
    const [fields, setField] = useState({
        rating: "",
        comment: ""
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
        
        createRating(fields, event_id);
    }
    
    return (
        <div className='RatingForm'>
            <Form onSubmit={handleSubmit}>   
                <Form.Label>Ajouter un commentaire</Form.Label> 
                <Box component="fieldset" mb={1} borderColor="transparent">
                    <Rating
                        name="rating"
                        value={fields.rating}
                        onChange={handleChange}
                    />
                </Box>
                <Form.Group controlId="commentGroup">
                    <FormControl
                    as="textarea"
                    name="comment"
                    aria-label="With textarea"
                    placeholder="Exprimez-vous votre requête ici !"
                    value={fields.content}
                    onChange={handleChange}
                    />
                </Form.Group>
    
                { error && <Alert variant="danger">Une erreur est survenue !</Alert>}
    
                <Button variant="primary" type="submit">
                    Envoyer
                </Button>
            </Form>
        </div>
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(RatingForm)
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Card, CardContent, CardMedia, Typography, Input, Button, Grid } from '@material-ui/core';

import './HotdogForm.css';

class HotdogForm extends Component {
  constructor() {
    super();
  }

  render() {
    const { hotdog: { name, _id, price } } = this.props;

    return (
      <Card className="HotdogCard">
        <CardMedia></CardMedia>
        <CardContent>
          <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
            {_id && (
              <h1>Hotdog {_id.slice(_id.length - 4, _id.length)}</h1>
            )}
            {!_id && (
              <h1>New hotdog</h1>
            )}
            <Input type="text" defaultValue={name}/>
            <Input type="text" defaultValue={price}/>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="flex-end"
              className="action-row"
            >
              {_id && (
                <Button variant="contained"
                        color="secondary" onClick={() => (console.log(2))}>Delete</Button>
              )}
              <Button variant="contained"
                      color="primary" onClick={() => (console.log(1))}>
                {_id ? 'Edit' : 'Submit'}
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    );
  }
}

HotdogForm.propTypes = {
  hotdog: PropTypes.shape({
    _id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
  })
};

HotdogForm.defaultProps = {
  hotdog: {
    _id: null,
    price: 0.00,
    name: '',
  }
};

export default HotdogForm;

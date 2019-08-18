import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Card, CardContent, CardMedia, Input, Button, Grid } from '@material-ui/core';

import './HotdogForm.css';

function HotdogForm({ hotdog, hotdog: { name, _id, price, image }, updateList, data, onChange }) {
  function deleteHotdog(_id) {
    axios.delete(`http://localhost:3001/hotdogs/${_id}`).then(() => {
      const list = data.filter(hotdog => (hotdog._id === _id));
      updateList(list);
    })
  }

  function saveHotdog() {
    axios.post('http://localhost:3001/hotdogs', { hotdog }).then(() => {
      updateList(data);
    })
  }

  return (
    <>
      {_id && (
        <Card className="HotdogCard">
          {image && (
            <CardMedia
              className="card-image"
              image={image}
              title={name}
            />
          )}
          <CardContent>
            <Grid
              container
              direction="column"
              justify="center"
              alignItems="center"
            >
              <h1>Hotdog #{_id.slice(_id.length - 4, _id.length)}</h1>
              <Input type="text" defaultValue={name} onChange={({ target: { value } }) => onChange('name', value, _id)} placeholder="Name..." />
              <Input type="number" defaultValue={price} onChange={({ target: { value } }) => onChange('price', value, _id)} placeholder="Price..." />
              <Input type="text" defaultValue={image} onChange={({ target: { value } }) => onChange('image', value, _id)} placeholder="Image..." />
              <Grid
                container
                direction="row"
                justify="space-between"
                alignItems="flex-end"
                className="action-row"
              >
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => deleteHotdog(_id)}
                >
                  Delete
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={saveHotdog}
                >
                  Save
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      )}
      {!_id && (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Input required type="text" defaultValue={name} onChange={({ target: { value } }) => onChange('name', value)} placeholder="Name..." />
          <Input type="number" defaultValue={price} onChange={({ target: { value } }) => onChange('price', value)} placeholder="Price..." />
          <Input type="text" defaultValue={image} onChange={({ target: { value } }) => onChange('image', value)} placeholder="Image..." />
        </Grid>
      )}
    </>
  );
}

HotdogForm.propTypes = {
  hotdog: PropTypes.shape({
    _id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  }),
  onChange: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

HotdogForm.defaultProps = {
  hotdog: {
    _id: null,
    price: 0.00,
    name: '',
    image: '',
  },
};

export default HotdogForm;

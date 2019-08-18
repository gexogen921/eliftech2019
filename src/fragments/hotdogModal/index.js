import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Dialog, DialogContent, DialogTitle, DialogActions } from '@material-ui/core';

import HotdogForm from '../hotdogForm';

function HotdogModal({ isOpen, handleModal, updateList, data }) {
  const [hotdog, setHotdog] = useState({});

  function handleChange(field, value) {
    setHotdog({
      ...hotdog,
      [field]: value,
    });
  }

  function createHotdog() {
    axios.put('/hotdogs', { hotdog }).then(({ data: { hotdog } }) => {
      data.push(hotdog);
      updateList(data);
      handleModal(false);
    });
  }

  return (
    <Dialog open={isOpen} onClose={() => handleModal(!isOpen)}>
      <DialogTitle id="form-dialog-title">New Hotdog</DialogTitle>
      <DialogContent>
        <HotdogForm onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button onClick={() => handleModal(false)} color="primary">
          Cancel
        </Button>
        <Button onClick={createHotdog} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}

HotdogModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  updateList: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.shape({
    _id: PropTypes.string,
    price: PropTypes.number,
    name: PropTypes.string,
    image: PropTypes.string,
  })).isRequired,
};

export default HotdogModal;

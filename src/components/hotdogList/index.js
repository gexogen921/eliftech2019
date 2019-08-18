import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { Grid, Fab } from '@material-ui/core';
import { PlusOneRounded } from '@material-ui/icons';

import HotdogForm from '../../fragments/hotdogForm';
import HotdogModal from '../../fragments/hotdogModal';

import './HotdogList.css';

export default function HotdogList() {
  const [data, handleData] = useState([]);
  const [toggle, handleToggle] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:3001/hotdogs').then(({ data }) => {
      handleData(data.hotdogs)
    })
  }, [data.length]);

  function updateList(list) {
    handleData(list);
  }

  function handleChange(field, value, _id) {
    const list = data.map(hotdog => {
      if (hotdog._id === _id) {
        hotdog[field] = field === 'price' ? +value : value;
      }

      return hotdog;
    });

    updateList(list);
  }

  return (
    <div className="HotdogList">
      <Grid container justify="space-evenly">
        {data.map(hotdog => (
          <HotdogForm hotdog={hotdog} key={hotdog._id} data={data} updateList={updateList} onChange={handleChange} />
        ))}
      </Grid>
      <Fab
        color="secondary"
        aria-label="edit"
        className="new-item"
        onClick={() => handleToggle(true)}
      >
        <PlusOneRounded />
      </Fab>
      {toggle && (<HotdogModal isOpen={toggle} handleModal={handleToggle} data={data} updateList={updateList} />)}
    </div>
  );
}

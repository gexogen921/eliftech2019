import React from 'react';
import {
  AppBar,
  Typography,
} from '@material-ui/core';

import HotdogList from './components/hotdogList';

import './App.css';

export default function App() {
  return (
    <div className="App">
      <AppBar position="static" className="header">
        <Typography className="brand-text" color="secondary">Test task</Typography>
      </AppBar>
      <HotdogList />
    </div>
  );
}

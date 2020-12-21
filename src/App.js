import React, { useState } from 'react';

import Header from './containers/Header';
import SideBar from './containers/SideBar';
import Home from './containers/Home';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="App">
          <SideBar />
          <Header />
          <Home />
        </div>
    );
  }
}

export default App;

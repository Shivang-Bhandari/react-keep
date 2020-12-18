import React, { useState } from 'react';

import Header from './containers/Header';
import SideBar from './containers/SideBar';

import './App.scss';

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div className="App">
          <Header />
          <SideBar />
        </div>
    );
  }
}

export default App;

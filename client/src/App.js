import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Layout from './components/Layout.js';
import Routes from './Routes.js';


class App extends Component {

  render() {
    return (
      <div className="app-container" >
				<Layout />
				<div className="app-content" >
				 <Routes />
				</div>
			</div>
    );
  }
}

export default App;

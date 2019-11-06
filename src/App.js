import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import NavBar from './components/navBar';
import Jumbotron from './components/hero';
import Pricing from './components/pricing';

function App() {
  return (
    <div className="App">
      <NavBar />
      <Jumbotron />
      <Pricing />
    </div>
  );
}

export default App;

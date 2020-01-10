import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Jumbotron from './components/hero';
import Pricing from './components/pricing';
import ContactSection from './components/contactSection';
import Footer from './components/footer';

function App() {
  return (
    <div className="App">
      <Jumbotron />
      <Pricing />
      <hr/>
      <ContactSection />
      <Footer />
    </div>
  );
}

export default App;

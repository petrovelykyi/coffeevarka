import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Routes from './components/Routes/Routes';
import Footer from './components/Footer/Footer';

import './App.scss';

const App = () => (
  <Router>
    <div className="flyout">
      <Navbar />
      <div className="app__bg">
        <Routes />
      </div>
      <Footer />
    </div>
  </Router>
);

export default App;

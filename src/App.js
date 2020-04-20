import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image'

import Home from './components/Home/Home';
import logo from './logo_complet.png';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" style={{ zIndex: 9 }}>
          <Link to="/" className="navbar-brand">
            <Image src={logo}/>
          </Link>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Accueil</Link>
            <Link to="/events" className="nav-link">Évènements</Link>
            <Link to="/associations" className="nav-link">Associations</Link>
            <Link to="/contact" className="nav-link">Nous contacter</Link>
          </Nav>
          <Nav>
            <Link to="/login" className="nav-link">Se connecter</Link>
            <Link to="/signup" className="nav-link">S'inscrire</Link>
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home}/>
      </Router>
    </div>
  );
}

export default App;

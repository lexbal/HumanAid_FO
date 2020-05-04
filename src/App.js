import React from 'react';
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import Contact from './components/Contact/Contact';
import logo from './logo_complet.png';
import './App.css';
import { logout } from './redux/actions/user';


const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    loggedIn: state.user.loggedIn
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeConnexion: () => {
      dispatch(logout())
    }
  }
}


const App = ({ username, loggedIn, removeConnexion }) => {
  const handleLogout = () => {
    removeConnexion()
  }

  return (
    <div className="App">
      <Router>
        <Navbar bg="dark" variant="dark" style={{ zIndex: 9 }} fixed="top">
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
            {
              loggedIn ?
                <>
                  <Navbar.Text>
                    Connecté en tant que {username}
                  </Navbar.Text>
                  <Link className="nav-link" onClick={handleLogout}>Se déconnecter</Link>
                </>
               :
                <>
                  <Link to="/login" className="nav-link">Se connecter</Link>
                  <Link to="/signup" className="nav-link">S'inscrire</Link>
                </>
            }
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/contact" component={Contact}/>
      </Router>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

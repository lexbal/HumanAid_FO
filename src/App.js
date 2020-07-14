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
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

import Home from './components/Home/Home';
import Signup from './components/Signup/Signup';
import Login from './components/Login/Login';
import AssocDetail from './components/AssocDetail/AssocDetail';
import Contact from './components/Contact/Contact';
import Associations from './components/Associations/Associations';
import Events from './components/Events/Events';
import EventForm from './components/EventForm/EventForm';
import EventDetail from './components/EventDetail/EventDetail';
import logo from './image/logo_complet.png';
import './App.css';
import { logout } from './redux/actions/user';


const mapStateToProps = (state) => {
  return {
    username: state.user.username,
    role: state.user.role,
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


const App = ({ username, role, loggedIn, removeConnexion }) => {
  const handleLogout = () => {
    removeConnexion()
  }

  return (
    <div className="App">
      <Router>
        <Navbar className="App-header sticky-top">
          <Link to="/" className="navbar-brand">
            <Image src={logo} className="logo"/>
          </Link>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link header-link">Accueil</Link>
            <Link to="/events" className="nav-link header-link">Évènements</Link>
            <Link to="/associations" className="nav-link header-link">Associations</Link>
            {
              loggedIn && role === "ROLE_ASSOC" &&
                <>
                    <Link to="/event/add" className="nav-link header-link">Ajoutez un évènement</Link>
                </>
            }
            <Link to="/contact" className="nav-link header-link">Nous contacter</Link>
          </Nav>
          <Nav>
            {
              loggedIn ?
                <>
                  <NavDropdown title={<><FontAwesomeIcon icon={faUserCircle} color="white"/><FontAwesomeIcon icon={faCaretDown} color="white"/></>} id="basic-nav-dropdown" className="dropdown-menu-right">
                    <NavDropdown.Header>
                      Connecté en tant que {username}
                    </NavDropdown.Header>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt} color="dark"/> Se déconnecter</NavDropdown.Item>
                  </NavDropdown>
                </>
               :
                <>
                  <Link to="/login" className="nav-link header-link">Se connecter</Link>
                  <Link to="/signup" className="nav-link header-link">S'inscrire</Link>
                </>
            }
          </Nav>
        </Navbar>
        <Route exact path="/" component={Home}/>
        <Route exact path="/signup" component={Signup}/>
        <Route exact path="/login" component={Login}/>
        <Route exact path="/association/detail/:id" component={AssocDetail}/>
        <Route exact path="/associations" component={Associations}/>
        <Route exact path="/events" component={Events}/>
        <Route exact path="/event/detail/:id" component={EventDetail}/>
        <Route exact path="/event/add" component={EventForm}/>
        <Route exact path="/contact" component={Contact}/>
      </Router>
    </div>
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

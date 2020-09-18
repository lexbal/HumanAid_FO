import React from 'react';
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  Navbar,
  Nav, Image,
  NavDropdown,
  Button
} from 'react-bootstrap';
import PropTypes from'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faCaretDown, faSignOutAlt, faPlus, faEdit } from '@fortawesome/free-solid-svg-icons';

import { logout } from './redux/actions/user';
import logo from './images/logo_complet.png';


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


const Header = withRouter(({ location, username, role, loggedIn, removeConnexion }) => {
  const includePaths = ["/", "/signup", "/profile", "/login", "/association/detail/:id", "/associations", "/events", "/event/detail/:id", "/event/add", "/contact"];

  const handleLogout = () => {
    removeConnexion()
  }

  if (!includePaths.includes(location.pathname)) {
    return null;
  }

  return (
    <Navbar className="App-header sticky-top">
      <Link to="/" className="navbar-brand">
        <Image src={logo} className="logo"/>
      </Link>
      <Nav className="mr-auto">
        <Link to="/" className="nav-link header-link">Accueil</Link>
        <Link to="/events" className="nav-link header-link">Évènements</Link>
        <Link to="/associations" className="nav-link header-link">Associations</Link>
        <Link to="/contact" className="nav-link header-link">Nous contacter</Link>
      </Nav>
      <Nav>
        {
          loggedIn && role === "ROLE_ASSOC" &&
            <>
                <Link to="/event/add" style={{ marginRight: '10px' }}>
                  <Button>
                    <FontAwesomeIcon icon={faPlus} color="white"/>
                    Ajoutez un évènement
                  </Button>
                </Link>
            </>
        }
        {
          loggedIn ?
            <>
              <NavDropdown title={<><FontAwesomeIcon icon={faUserCircle} color="white"/><FontAwesomeIcon icon={faCaretDown} color="white"/></>} id="basic-nav-dropdown" className="dropdown-menu-right">
                <NavDropdown.Header>
                  Connecté en tant que {username}
                </NavDropdown.Header>
                <NavDropdown.Divider />
                <Link to="/profile" className="dropdown-item"><FontAwesomeIcon icon={faEdit} color="dark"/> Editer le profil</Link>
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
  )
});

Header.propTypes = {
  removeConnexion: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  roles: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);

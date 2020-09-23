import React from 'react';
import {
  BrowserRouter as Router,
  Route, Switch
} from "react-router-dom";

import Header from './Header';
import Home from './components/Home/Home';
import Signup from './components/User/Signup/Signup';
import Login from './components/User/Login/Login';
import Profile from './components/User/Profile/Profile';
import AssocDetail from './components/Associations/AssocDetail/AssocDetail';
import Contact from './components/Contact/Contact';
import Associations from './components/Associations/Associations';
import Events from './components/Events/Events';
import EventForm from './components/Events/EventForm/EventForm';
import EventDetail from './components/Events/EventDetail/EventDetail';
import NotFound from './components/NotFound/NotFound';
import Footer from './Footer';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/signup" component={Signup}/>
          <Route exact path="/profile" component={Profile}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/association/detail/:id" component={AssocDetail}/>
          <Route exact path="/associations" component={Associations}/>
          <Route exact path="/events" component={Events}/>
          <Route exact path="/event/detail/:id" component={EventDetail}/>
          <Route exact path="/event/add" component={EventForm}/>
          <Route exact path="/contact" component={Contact}/>
          <Route component={NotFound}/>
        </Switch>
        <Footer />
      </Router>
    </div>
  );
};

export default App;

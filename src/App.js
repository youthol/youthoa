import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotMatch from '@/pages/404';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Users from '@/pages/Auth/User';
import Roles from '@/pages/Auth/Role';
import Permissions from '@/pages/Auth/Permission';
import Manager from '@/pages/Manager';
import AppSignin from '@/pages/App/Signin';
import AppDevice from '@/pages/App/Device';
import AppSchedule from '@/pages/App/Schedule';
import AppWorkload from '@/pages/App/Workload';
import AppPhonebook from '@/pages/App/Phonebook';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/perms" component={Permissions} />
          <Route exact path="/manager" component={Manager} />
          <Route exact path="/signin" component={AppSignin} />
          <Route exact path="/device" component={AppDevice} />
          <Route exact path="/schedule" component={AppSchedule} />
          <Route exact path="/workload" component={AppWorkload} />
          <Route exact path="/phonebook" component={AppPhonebook} />
          <Redirect to="/" />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;

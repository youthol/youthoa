import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import SigninIndex from '../containers/Signin/Index'
import EquipmentIndex from '../containers/Equipment/Index'
import ScheduleIndex from '../containers/Schedule/Index'
import WorkloadIndex from '../containers/Workload/Index'
import PhonebookIndex from '../containers/Phonebook/Index'

class Router extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/signin" component={SigninIndex} />
        <Route exact path="/equipment" component={EquipmentIndex} />
        <Route exact path="/schedule" component={ScheduleIndex} />
        <Route exact path="/workload" component={WorkloadIndex} />
        <Route exact path="/phonebook" component={PhonebookIndex} />
      </Switch>
    );
  }
}

export default Router;

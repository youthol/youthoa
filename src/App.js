import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import NotMatch from "@/pages/404";
import Home from "@/pages/Home";
import Login from "@/pages/Auth/Login";
import Users from "@/pages/Auth/Users";
import ImportUsersTable from "@/pages/Auth/Users/Import";
import Roles from "@/pages/Auth/Roles";
import Perms from "@/pages/Auth/Perms";
import Manages from "@/pages/Manager";
import ExportSigninTable from "@/pages/Manager/ExportSigninTable";
import AppSignin from "@/pages/App/Signin";
import AppDevice from "@/pages/App/Device";
import AppSchedule from "@/pages/App/Schedule";
import AppWorkload from "@/pages/App/Workload";
import AppPhonebook from "@/pages/App/Phonebook";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Basic Routes */}
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/manage" component={Manages} />
          {/* Auth Routes */}
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/import" component={ImportUsersTable} />
          <Route exact path="/users/export" component={ImportUsersTable} />
          <Route exact path="/users/add" component={ImportUsersTable} />
          <Route exact path="/users/edit/:id" component={ImportUsersTable} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/roles/export" component={ImportUsersTable} />
          <Route exact path="/roles/add" component={ImportUsersTable} />
          <Route exact path="/roles/edit/:id" component={ImportUsersTable} />
          <Route exact path="/perms" component={Perms} />
          <Route exact path="/prems/export" component={ImportUsersTable} />
          {/* Features Routes */}
          <Route exact path="/signin" component={AppSignin} />
          <Route exact path="/signin/export" component={ExportSigninTable} />
          <Route exact path="/device" component={AppDevice} />
          <Route exact path="/schedule" component={AppSchedule} />
          <Route exact path="/workload" component={AppWorkload} />
          <Route exact path="/phonebook" component={AppPhonebook} />
          {/* NotMatch Routes */}
          <Redirect to="/" />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;

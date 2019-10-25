import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NotMatch from '@/pages/404';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Users from '@/pages/Auth/Users';
import UserAdd from '@/pages/Auth/Users/Add';
import UserEdit from '@/pages/Auth/Users/Edit';
import ImportUsersTable from '@/pages/Auth/Users/Import';
import Roles from '@/pages/Auth/Roles';
import RoleAdd from '@/pages/Auth/Roles/Add';
import RoleEdit from '@/pages/Auth/Roles/Edit';
import Perms from '@/pages/Auth/Perms';
import PermEdit from '@/pages/Auth/Perms/Edit';
import Manages from '@/pages/Manager';
import ExportSigninTable from '@/pages/Manager/ExportSigninTable';
import ImportHygieneTable from '@/pages/Manager/ImportHygieneTable';
import DeleteHygiene from '@/pages/Manager/DeleteHygiene';
import ExportPhoneBook from '@/pages/Manager/ExportPhoneBook';
import ImportPhoneBook from '@/pages/Manager/ImportPhoneBook';
import AppSignin from '@/pages/App/Signin';
import AppDevice from '@/pages/App/Device';
import AppSchedule from '@/pages/App/Schedule';
import AppWorkload from '@/pages/App/Workload';
import AppPhonebook from '@/pages/App/Phonebook';
import './scss/base.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          {/* Basic Routes */}
          <Route exact path="/" component={Home} />
          {/* Auth Routes */}
          <Route exact path="/login" component={Login} />
          <Route exact path="/users" component={Users} />
          <Route exact path="/users/import" component={ImportUsersTable} />
          <Route exact path="/users/add" component={UserAdd} />
          <Route exact path="/users/edit/:id" component={UserEdit} />
          <Route exact path="/roles" component={Roles} />
          <Route exact path="/roles/add" component={RoleAdd} />
          <Route exact path="/roles/edit/:id" component={RoleEdit} />
          <Route exact path="/perms" component={Perms} />
          <Route exact path="/perms/edit/:id" component={PermEdit} />
          {/* Manages Routes */}
          <Route exact path="/manage" component={Manages} />
          <Route exact path="/manage/impt-hygiene-tb" component={ImportHygieneTable} />
          <Route exact path="/manage/del-hygiene" component={DeleteHygiene} />
          {/* Features Routes */}
          <Route exact path="/signin" component={AppSignin} />
          <Route exact path="/signin/export" component={ExportSigninTable} />
          <Route exact path="/device" component={AppDevice} />
          <Route exact path="/schedule" component={AppSchedule} />
          <Route exact path="/workload" component={AppWorkload} />
          <Route exact path="/phonebook" component={AppPhonebook} />
          <Route exact path="/phonebook/export" component={ExportPhoneBook} />
          <Route exact path="/phonebook/import" component={ImportPhoneBook} />
          {/* NotMatch Routes */}
          <Redirect to="/" />
          <Route component={NotMatch} />
        </Switch>
      </Router>
    );
  }
}

export default App;

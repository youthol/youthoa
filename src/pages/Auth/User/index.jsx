import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class User extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>User</div>
      </BasicLayout>
    );
  }
}

export default User;

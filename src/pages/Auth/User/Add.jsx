import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class UserAdd extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>UserAdd</div>
      </BasicLayout>
    );
  }
}

export default UserAdd;

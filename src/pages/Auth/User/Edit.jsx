import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';

class UserEdit extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>UserEdit</div>
      </BasicLayout>
    );
  }
}

export default UserEdit;

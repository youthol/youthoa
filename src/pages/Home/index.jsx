import React, { Component } from 'react';
import { Spin } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

class Home extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div style={{ textAlign: 'center' }}>
          <Spin />
          <h1>Hey!</h1>
        </div>
      </BasicLayout>
    );
  }
}

export default Home;

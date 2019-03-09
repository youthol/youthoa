import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Manager from '@/pages/Manager';
import { getHygiene } from '../../../api/menage';

class index extends Component {
  async componentDidMount() {
    const data = await getHygiene();
    console.log(data);
  }
  render() {
    return (
      <Manager>
        <span>删除数据</span>
      </Manager>
    );
  }
}

index.propTypes = {};

export default index;

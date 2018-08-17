import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'antd';
import './common.css'

const NavCrumb = props => {
  return (
    <Breadcrumb className="breadcrumb">
      <Breadcrumb.Item>Application</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="">Sign in</a>
      </Breadcrumb.Item>
    </Breadcrumb>
  );
};

NavCrumb.propTypes = {
  
};

export default NavCrumb;

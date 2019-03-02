import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Icon } from 'antd';
import './style.scss'

const Search = Input.Search;

const SigninInput = props => {
  return (
    <Col xs={24} md={16} lg={12} className="signin-btn">
      <Search
        placeholder="请输入学号签到"
        enterButton="签到"
        size="large"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={props.inputValue}
        onChange={props.handleChange}
        onSearch={props.handleSubmit}
      />
    </Col>
  );
};

SigninInput.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SigninInput;

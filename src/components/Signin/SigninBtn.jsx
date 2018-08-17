import React from 'react';
import PropTypes from 'prop-types';
import { Col, Input, Icon } from 'antd';

const { Search } = Input;

const SigninBtn = props => {
  return (
    <Col xs={24} md={16} lg={12}>
      <Search
        size="large"
        placeholder="请输入学号签到"
        enterButton="签到"
        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
        value={props.inputValue}
        onChange={props.handleChange}
        onSearch={props.handleSubmit}
      />
    </Col>
  );
};

SigninBtn.propTypes = {
  inputValue: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

export default SigninBtn;

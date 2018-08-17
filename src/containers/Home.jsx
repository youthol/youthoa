import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import { updateUserinfo } from '../actions/userinfo';

const { Content } = Layout;

class Home extends Component {
  handleClick= () => {
    console.log(this.props)
  }
  render() {
    return (
      <Content className="page__bd">
        <p onClick={this.handleClick}>Dashboard!!!</p>
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  userinfo: state.userinfo
});

const mapDispatchToProps = dispatch => ({
  updateUserinfo: bindActionCreators(updateUserinfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

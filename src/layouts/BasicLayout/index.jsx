import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Modal, Icon, message } from 'antd';
import moment from 'moment';
import SiderLayout from '@/layouts/SiderLayout';
import { deleteUserInfo } from '@/actions/userinfo';
import './style.scss';

const { Header, Content, Footer } = Layout;

class BasicLayout extends Component {
  state = {
    isAuth: false
  };
  componentDidMount() {
    const { token, expires_at } = sessionStorage;
    const { userinfo } = this.props;
    if (token && moment().isBefore(expires_at) && !!userinfo) {
      this.setState({ isAuth: true });
    } else {
      sessionStorage.clear();
      this.setState({ isAuth: false });
    }
  }

  handleLogin = e => {
    if (this.props.history.location.pathname === '/login') {
      message.info('请登录');
    } else {
      this.props.history.push('/login');
    }
  };
  handleLogout = e => {
    Modal.confirm({
      title: '是否退出当前账号',
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expires_at');
        sessionStorage.removeItem('username');
        this.props.deleteUserInfo();
        message.success('已退出');
        this.setState({ isAuth: false });
        if (this.props.history.location.pathname !== '/') {
          this.props.history.push('/');
        }
      }
    });
  };
  currentYear() {
    return new Date().getFullYear();
  }

  render() {
    return (
      <Layout className="page__layout">
        <SiderLayout isAuth={this.state.isAuth} />
        <Layout>
          <Header className="page__hd">
            <div className="header-title">
              <span>{this.props.title || 'YOUTHOA'}</span>
            </div>
            <div className="header-user">
              {this.state.isAuth ? (
                <Icon
                  type="user"
                  title="退出"
                  style={{ color: '#08c' }}
                  onClick={this.handleLogout}
                />
              ) : (
                <Icon type="user" title="登录" onClick={this.handleLogin} />
              )}
            </div>
          </Header>
          <Content className="page__bd">{this.props.children}</Content>
          <Footer className="page__ft">
            <span>© {this.currentYear()} 青春在线网站 版权所有</span>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl,
  userinfo: state.userinfo.userinfo,
  roles: state.userinfo.roles,
  permissions: state.userinfo.permissions
});

const mapDispatchToProps = dispatch => ({
  deleteUserInfo: bindActionCreators(deleteUserInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicLayout);

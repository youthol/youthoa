import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Layout, Modal, Icon, message } from 'antd';
import SiderLayout from '@/layouts/SiderLayout';
import { setUserInfo, deleteUserInfo } from '@/pages/Login/redux/actions';
import { checkLogin } from '@/utils/auth';
import './style.scss';

const { Header, Content, Footer } = Layout;

class BasicLayout extends Component {
  state = {
    isAuth: false
  };
  componentDidMount() {
    switch (checkLogin()) { // todo 待优化, 1,2 无含义,建议使用 常量 优化
      case 1:
        this.props.setUserInfo();
        this.setState({ isAuth: true });
        break;
      case 2:
        sessionStorage.clear();
        this.props.deleteUserInfo();
        this.props.history.push('/login');
        this.setState({ isAuth: false });
        break;
      default:
        this.setState({ isAuth: false });
    }
  }

  handleLogin = () => {
    if (this.props.history.location.pathname === '/login') {
      message.info('请登录');
    } else {
      this.props.history.push('/login');
    }
  };
  handleLogout = () => {
    Modal.confirm({
      title: '是否退出当前账号',
      okType: 'danger',
      okText: '是',
      cancelText: '否',
      onOk: () => {
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('expires_at');
        this.props.deleteUserInfo();
        message.success('已退出');
        this.setState({ isAuth: false });
        if (this.props.history.location.pathname !== '/') {
          this.props.history.push('/');
        }
      }
    });
  };

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
            <span>© {new Date().getFullYear()} 青春在线网站版权所有</span>
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

const mapDispatchToProps = dispatch => ({
  setUserInfo: bindActionCreators(setUserInfo, dispatch),
  deleteUserInfo: bindActionCreators(deleteUserInfo, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(BasicLayout));

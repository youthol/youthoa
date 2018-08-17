import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { Layout } from 'antd';
import Routes from './routes';
import configureStore from './store';
import PageHeader from './layouts/PageHeader';
import PageFooter from './layouts/PageFooter';
import PageSider from './layouts/PageSider';

const store = configureStore();

class App extends Component {
  state = {
    collapsed: false
  };
  handleCollapse = collapsed => {
    this.setState({ collapsed });
  };
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router>
            <Layout className="page__layout">
              <PageSider
                collapsed={this.state.collapsed}
                handleCollapse={this.handleCollapse}
              />
              <Layout>
                <PageHeader title="青春在线办公平台" />
                <Routes />
                <PageFooter year="2018" />
              </Layout>
            </Layout>
          </Router>
        </Provider>
      </div>
    );
  }
}

export default App;

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from '@/store';
import App from '@/App';
import '@/scss/reset.scss';
import '@/scss/base.scss';
import registerServiceWorker from '@/registerServiceWorker';
// start 国际化-中文
// antd 目前的默认文案是英文, 中文需要自行配置
import zhCN from 'antd/es/locale/zh_CN';
import { ConfigProvider } from 'antd';
// end 国际化-中文


ReactDOM.render(
  <ConfigProvider locale={zhCN}>
    <Provider store={store}>
      <App />
    </Provider>
  </ConfigProvider>,
  document.getElementById('root')
);
registerServiceWorker();

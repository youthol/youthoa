import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import NotFoundImage from '@/assets/404.png';
import BasicLayout from '@/layouts/BasicLayout';
import './style.scss';

class NotMatch extends Component {
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div className="exception-content">
          <img src={NotFoundImage} className="imgException" alt="页面不存在" />
          <div className="prompt">
            <h3 className="title">抱歉，你访问的页面不存在</h3>
            <p className="description">
              您要找的页面没有找到，请返回
              <Link to="/"> 首页 </Link>
              继续浏览
            </p>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default NotMatch;

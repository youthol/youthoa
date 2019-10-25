import React, { Component } from 'react';
import BasicLayout from '@/layouts/BasicLayout';
import { getBirthday } from '../../api/birthday';
import { checkTime } from '../../lib/checkTime';
import './style.scss';

class Home extends Component {
  constructor() {
    super();
    this.state = {};
  }

  /**
   * 异步获取是否有人过生日
   */
  getBirthday = async () => {
    const data = await getBirthday();
    if (data.data.code) {
      this.setState({
        birthday: data.data.msg
      });
    }
  };

  componentDidMount() {
    this.getBirthday();
  }

  render() {
    return (
      <BasicLayout>
        <div style={{ textAlign: 'center' }}>
          <h1 className="main-title">{checkTime() + '好哟'}</h1>
          <p className="birthday">{this.state.birthday ? this.state.birthday : null}</p>
        </div>
      </BasicLayout>
    );
  }
}

export default Home;

import React, { Component } from 'react';
import { DatePicker, Button } from 'antd';
import BasicLayout from '@/layouts/BasicLayout';

const { MonthPicker, RangePicker, WeekPicker } = DatePicker;

class Manager extends Component {
  handleExportSigninTable = e => {
    console.log(e);
  };

  onChange = (date, dateString) => {
    console.log(date, dateString);
  };

  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>
          <Button type="primary" onClick={this.handleExportSigninTable}>
            导出签到表
          </Button>
          <RangePicker onChange={this.onChange} />
        </div>
      </BasicLayout>
    );
  }
}

export default Manager;

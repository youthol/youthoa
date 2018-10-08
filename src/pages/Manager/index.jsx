import React, { Component } from 'react';
import { connect } from 'react-redux';
import BasicLayout from '@/layouts/BasicLayout';
import ExportSigninTable from '@/components/Manager/ExpoetSignin';

class Manager extends Component {
  handleExport = (e, form) => {
    e.preventDefault();
    const { baseUrl } = this.props;
    form.validateFields((err, values) => {
      if (!err) {
        let [start, end] = values.daterange;
        start = start.format('YYYY-MM-DD');
        end = end.format('YYYY-MM-DD');
        let a = document.createElement('a');
        let url = `${baseUrl}/signin/export?start=${start}&end=${end}`;
        let filename = 'myfile.zip';
        a.href = url;
        a.download = filename;
        a.click();
      }
    });
  };

  render() {
    return (
      <BasicLayout history={this.props.history}>
        <div>
          <ExportSigninTable handleExport={this.handleExport} />
        </div>
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Manager);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import DataList from '@/components/Phonebook/DataList';

class AppPhoneBook extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      upgradeId: 0,
      searchText: ''
    };
  }
  componentDidMount() {
    this.getPhoneBookList();
  }
  getPhoneBookList = () => {
    axios
      .get(`${this.props.baseUrl}/phones`)
      .then(res => {
        if (res.status >= 200 && res.status <= 300) {
          this.setState({ data: res.data.data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  render() {
    return (
      <BasicLayout>
        <DataList data={this.state.data} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(AppPhoneBook);

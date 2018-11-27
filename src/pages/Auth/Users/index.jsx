import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import UserList from '@/components/Auth/UserList';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup'

class User extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getUserList();
  }

  getUserList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/users`)
      .then(res => {
        const data = res.data.data.map(item => ({ ...item, key: item.id }));
        if (data && data.length) {
          this.setState({ data });
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  handleEdit = user => {
    this.props.history.push(`/users/edit/${user.id}`);
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <OptsBtnGroup add download upload />
        <UserList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(User);

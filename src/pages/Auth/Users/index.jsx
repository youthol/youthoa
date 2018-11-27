import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import UserList from '@/components/Auth/UserList';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup';

class User extends Component {
  state = {
    data: []
  };

  componentDidMount() {
    this.getUserList();
  }
  getUserList = () => {
    const { BASE_API } = this.props;
    axios
      .get(`${BASE_API}/users`)
      .then(res => {
        const data = res.data.data.map(item => ({ ...item, key: item.id }));
        if (data && data.length) {
          this.setState({ data });
        }
      })
      .catch(err => {
        try {
          const { errors } = err.response.data;
          if (errors) {
            for (let error in errors) {
              if (errors[error] instanceof Array) {
                errors[error].forEach(el => message.error(el));
              }
            }
          } else {
            message.error(err.response.data.message);
          }
        } catch (e) {
          console.error(e);
        }
      });
  };

  handleEdit = user => {
    this.props.history.push(`/users/edit/${user.id}`);
  };
  render() {
    return (
      <BasicLayout>
        <OptsBtnGroup component="users" add download upload />
        <UserList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(User);

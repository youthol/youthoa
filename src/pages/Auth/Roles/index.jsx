import React, { Component } from 'react';
import { connect } from 'react-redux';
import { message } from 'antd';
import axios from 'axios';
import RoleList from '@/components/Auth/RoleList';
import BasicLayout from '@/layouts/BasicLayout';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup';

class Role extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getRoleList();
  }
  getRoleList = () => {
    const { BASE_API } = this.props;
    axios
      .get(`${BASE_API}/roles`)
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
  handleEdit = role => {
    this.props.history.push(`/roles/edit/${role.id}`);
  };

  render() {
    return (
      <BasicLayout>
        <OptsBtnGroup component="roles" add />
        <RoleList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Role);

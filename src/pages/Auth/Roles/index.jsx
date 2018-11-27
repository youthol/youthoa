import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import RoleList from '@/components/Auth/RoleList';
import BasicLayout from '@/layouts/BasicLayout';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup'

class Role extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getRoleList();
  }
  getRoleList = () => {
    const { baseUrl } = this.props;

    axios
      .get(`${baseUrl}/roles`)
      .then(res => {
        const data = res.data.data.map(item => ({ ...item, key: item.id }));
        if (data && data.length) {
          this.setState({ data });
        }
      })
      .catch(err => {
        console.error(err);
      });
  };
  handleEdit = role => {
    this.props.history.push(`/roles/edit/${role.id}`);
  };

  render() {
    return (
      <BasicLayout history={this.props.history}>
        <OptsBtnGroup add />
        <RoleList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Role);

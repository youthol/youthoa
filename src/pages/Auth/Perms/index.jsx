import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import BasicLayout from '@/layouts/BasicLayout';
import PermList from '@/components/Auth/PermList';

class Permission extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getPermList();
  }
  getPermList = () => {
    const { BASE_API } = this.props;
    axios
      .get(`${BASE_API}/permissions`)
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
  handleEdit = role => {
    this.props.history.push(`/perms/edit/${role.id}`);
  };
  render() {
    return (
      <BasicLayout>
        <PermList data={this.state.data} handleEdit={this.handleEdit} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Permission);

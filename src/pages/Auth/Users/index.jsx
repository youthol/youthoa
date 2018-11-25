import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BasicLayout from "@/layouts/BasicLayout";
import UserList from "@/components/Auth/UserList";

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
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <UserList data={this.state.data} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(User);

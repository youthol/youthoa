import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import BasicLayout from "@/layouts/BasicLayout";
import PermList from "@/components/Auth/PermList";

class Permission extends Component {
  state = {
    data: []
  };
  componentDidMount() {
    this.getPermList();
  }
  getPermList = () => {
    const { baseUrl } = this.props;
    axios
      .get(`${baseUrl}/permissions`)
      .then(res => {
        const data = res.data.data.map(item => ({ ...item, key: item.id }));
        if (data && data.length) {
          this.setState({ data });
        }
        console.log(res, data);
      })
      .catch(err => {
        console.log(err);
      });
  };
  render() {
    return (
      <BasicLayout history={this.props.history}>
        <PermList data={this.state.data} />
      </BasicLayout>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Permission);

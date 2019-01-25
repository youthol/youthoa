import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Drawer, Table, Input } from 'antd';
import '../style.scss';

const { Column } = Table;

class SearchDrawer extends Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      data: [],
      visible: false
    };
  }
  componentWillReceiveProps() {
    if (!this.props.visible) {
      this.setState({
        searchText: '',
        data: []
      });
    }
  }
  searchConfirm = value => {
    const { data } = this.props;
    const result = data.filter(el => {
      return (
        el.administrative_unit.includes(value) ||
        el.office_location.includes(value) ||
        el.office_person.includes(value) ||
        el.telephone.includes(value)
      );
    });
    this.setState({ data: result });
  };
  onChange = e => {
    this.setState({
      searchText: e.target.value
    });
  };
  render() {
    return (
      <Drawer
        title="Create a new account"
        width={540}
        onClose={this.props.onClose}
        visible={this.props.visible}
        style={{
          overflow: 'auto',
          height: 'calc(100% - 108px)',
          paddingBottom: '108px'
        }}
      >
        <Input.Search
          placeholder="请输入查询关键词"
          size="large"
          allowClear
          value={this.state.searchText}
          onSearch={val => this.searchConfirm(val)}
          onChange={this.onChange}
        />
        <Table dataSource={this.state.data} className="table-mt-30">
          <Column title="所属单位" dataIndex="administrative_unit" key="administrative_unit" />
          <Column title="办公室" dataIndex="office_location" key="office_location" />
          <Column title="办公人员" dataIndex="office_person" key="office_person" />
          <Column title="办公电话" dataIndex="telephone" key="telephone" />
        </Table>
      </Drawer>
    );
  }
}

SearchDrawer.propTypes = {
  data: PropTypes.array.isRequired,
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default SearchDrawer;

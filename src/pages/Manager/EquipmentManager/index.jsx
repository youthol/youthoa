import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Table, Button, Popconfirm } from 'antd';
import OptsBtnGroup from '@/components/Auth/OptsBtnGroup';
// import SearchDrawer from './SearchDrawer';
import { getEquipments } from '@/api/equipment';


const { Column } = Table;

class User extends Component {
  state = {
    data: [],
    searchDrawerVisible: false
  };

  componentDidMount() {
    this.getEquipmentList();
  }
  getEquipmentList = async () => {
    const rowData = await getEquipments();
    const data = rowData.data.map(el => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };


  handleExport = e => {
    e.preventDefault();
    const { form, BASE_API } = this.props;
    form.validateFields((err, values) => {
      try {
        if (!err) {
          const { token } = sessionStorage;
          let a = document.createElement('a');
          let url = `${BASE_API}/user/export?token=${token}`;
          let filename = 'myfile.zip';
          a.href = url;
          a.download = filename;
          a.click();
        }
      } catch (e) {
        console.log(e);
      }
    });
  };
  toggleDrawer = () => {
    this.setState({
      searchDrawerVisible: !this.state.searchDrawerVisible
    });
  };
  render() {
    return (
      <div className="testttt">

        <OptsBtnGroup
          search
          add
          download
          upload
          component="manage/equipment"
          handleSearch={this.toggleDrawer}
          handleExport={this.handleExport}
        />
        <Table dataSource={this.state.data} style={{ textAlign: "center" }} >
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="设备名称" dataIndex="device_name" key="name" />
          <Column title="设备类型" dataIndex="device_type" key="sdut_id" />
          <Column
            title="操作"
            key="action"
            render={text => (
              <Button.Group>
                <Button icon="edit" />
                <Popconfirm
                  title="确定要删除数据吗? Are you sure delete this data?"
                  onConfirm={() => { console.log('%cindex.jsx line:94 "id"', 'color: #26bfa5;', text.id); }}
                  disabled={false}
                >
                  <Button
                    icon="delete"
                  />
                </Popconfirm>
              </Button.Group>
            )}
          />
        </Table>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  BASE_API: state.globalData.BASE_API
});

export default connect(mapStateToProps)(Form.create()(User));

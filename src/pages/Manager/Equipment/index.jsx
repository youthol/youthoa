/**
 * 设备管理
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Form, Table, Button, Popconfirm, Badge, Select } from 'antd';
//
import { getEquipments } from '@/api/equipment';
import BasicLayout from '@/layouts/BasicLayout';

const { Option } = Select;
const { Column } = Table;
class User extends Component {
  state = {
    data: [],
    searchDrawerVisible: false,
  };
  /**
   * 生命周期函数
   * 组件第一次渲染完成时执行的逻辑，此时DOM节点已经生成了。
   */
  componentDidMount() {
    this.getEquipmentList();
  }
  /**
   * 异步请求设备数据
   */
  getEquipmentList = async () => {
    const rowData = await getEquipments();
    const data = rowData.data.map((el) => ({ ...el, key: el.id }));
    if (data && data.length) {
      this.setState({ data });
    }
  };

  render() {
    return (
      <BasicLayout>
        <div className="opt-btns">
          <Button.Group className="opt-btn-group">
            <Button type="primary" icon="search" disabled>
              搜索
            </Button>
            <Button
              type="primary"
              icon="plus"
              onClick={() => this.props.history.push(`/manage/equipment/add`)}
            >
              新增
            </Button>
            <Button type="primary" icon="upload" disabled>
              导入
            </Button>
            <Button type="primary" icon="download" disabled>
              导出
            </Button>
          </Button.Group>
        </div>
        <Table dataSource={this.state.data} style={{ textAlign: 'center' }}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="设备名称" dataIndex="device_name" key="device_name" />
          <Column title="设备类型" dataIndex="device_type" key="device_type" />
          <Column
            title="设备状态"
            dataIndex="status"
            key="status"
            filters={[
              { text: '可使用', value: 0 },
              { text: '已借出', value: 1 },
            ]}
            onFilter={(value, record) => record.status == value}
            render={(text) =>
              text > 0 ? (
                <Badge status="processing" text="已借出" />
              ) : (
                <Badge status="success" text="可使用" />
              )
            }
          />
          {
            /**
             * 操作设备列
             * 鉴于此页面的简陋与后端接口不完善,暂不开放对设备的操作
             *
             * @todo 实现修改界面后, 开放修改操作
             * @todo 后端接口添加删除限制(存在借用记录的设备不可删除)后 完善并开放 删除操作
             */


            /* 
            <Column
              title="操作"
              key="action"
              render={(text) => (
                <Button.Group >
                  <Button icon="edit" />
                  <Popconfirm
                    title="确定要删除数据吗? Are you sure delete this data?"
                    onConfirm={() => {
                      console.log('%cindex.jsx line:94 "id"', 'color: #26bfa5;', text.id);
                    }}
                    disabled={false}
                  >
                    <Button icon="delete"  />
                  </Popconfirm>
                </Button.Group>
              )}
            /> */
          }
        </Table>
      </BasicLayout>
    );
  }
}
/**
 * 
 * @param {*} state 
 * @returns 
 */
const mapStateToProps = (state) => ({
  BASE_API: state.globalData.BASE_API,
});
export default withRouter(connect(mapStateToProps)(Form.create()(User)));

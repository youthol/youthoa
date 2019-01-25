import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button, Tag } from 'antd';

const { Column } = Table;

const DataList = props => {
  return (
    <Table dataSource={props.data}>
      <Column title="姓名" dataIndex="name" key="name" />
      <Column title="部门" dataIndex="department" key="department" />
      <Column title="工作量描述" dataIndex="description" key="description" />
      <Column
        title="工作量"
        key="wk_count"
        render={text => <Tag color="cyan">{text.wk_count}</Tag>}
        sorter={(a, b) => a.wk_count - b.wk_count}
      />
      <Column title="统计人" dataIndex="manager" key="manager" />
      <Column
        title="统计时间"
        key="created_at"
        render={text => <div>{moment(text.created_at).format('YYYY-MM-DD HH:mm')}</div>}
      />
      <Column
        title="操作"
        key="action"
        render={text => (
          <Button.Group>
            <Button icon="logout" onClick={() => props.showModal('edit', text.id)} />
            <Button icon="delete" onClick={() => props.handleDelete(text.id)} />
          </Button.Group>
        )}
      />
    </Table>
  );
};

DataList.propTypes = {
  data: PropTypes.array,
  handleDelete: PropTypes.func.isRequired
};

export default DataList;

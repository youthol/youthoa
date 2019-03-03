import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button, Tag, Popconfirm } from 'antd';
import { checkPermission } from '@/utils/auth';

const { Column } = Table;

const DataList = props => {
  return (
    <Table dataSource={props.data}>
      <Column title="姓名" dataIndex="user.name" key="user.name" />
      <Column title="部门" dataIndex="user.department" key="user.department" />
      <Column title="工作量描述" dataIndex="description" key="description" />
      <Column
        title="工作量"
        key="score"
        render={text => <Tag color="blue">{text.score}</Tag>}
        sorter={(a, b) => a.score - b.score}
      />
      <Column title="统计人" dataIndex="manager_user.name" key="manager_user.name" />
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
            <Button icon="edit" onClick={() => props.showModal('edit', text.id)} />
            <Popconfirm
              title="Are you sure delete this data?"
              onConfirm={() => props.handleDelete(text.id)}
            >
              <Button
                icon="delete"
                disabled={!checkPermission(['manage_administrator', '	manage_service'], true)}
              />
            </Popconfirm>
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

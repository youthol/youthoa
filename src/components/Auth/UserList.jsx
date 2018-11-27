import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const { Column } = Table;

const UserList = props => {
  return (
    <div>
      {props.data && (
        <Table dataSource={props.data} expandedRowRender={props.handleExpandRow}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="姓名" dataIndex="name" key="name" />
          <Column title="学号" dataIndex="sdut_id" key="sdut_id" />
          <Column title="部门" dataIndex="department" key="department" />
          <Column title="年级" dataIndex="grade" key="grade" />
          <Column title="联系方式" dataIndex="phone" key="phone" />
          <Column title="出生年月" dataIndex="birthday" key="birthday" />
          <Column
            title="操作"
            key="action"
            render={text => (
              <Button.Group>
                <Button icon="edit" onClick={() => props.handleEdit(text)} />
                <Button icon="delete" disabled />
              </Button.Group>
            )}
          />
        </Table>
      )}
    </div>
  );
};

UserList.propTypes = {
  data: PropTypes.array
};

export default UserList;

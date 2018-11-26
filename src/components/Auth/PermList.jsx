import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button } from 'antd';

const { Column } = Table;

const PermList = props => {
  return (
    <div>
      {props.data && (
        <Table dataSource={props.data} expandedRowRender={props.handleExpandRow}>
          <Column title="ID" dataIndex="id" key="id" />
          <Column title="name" dataIndex="name" key="name" />
          <Column title="display_name" dataIndex="display_name" key="display_name" />
          <Column title="guard_name" dataIndex="guard_name" key="guard_name" />
          <Column title="创建日期" dataIndex="created_at" key="created_at" />
          <Column title="修改日期" dataIndex="updated_at" key="uodated_at" />
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

PermList.propTypes = {
  data: PropTypes.array
};

export default PermList;

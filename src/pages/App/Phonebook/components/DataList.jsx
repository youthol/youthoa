import React from 'react';
import PropTypes from 'prop-types';
import { Table, Button, Popconfirm } from 'antd';

const { Column } = Table;

const DataList = props => {
  return (
    <Table dataSource={props.data}>
      <Column title="所属单位" dataIndex="administrative_unit" key="administrative_unit" />
      <Column title="办公室" dataIndex="office_location" key="office_location" />
      <Column title="办公人员" dataIndex="office_person" key="office_person" />
      <Column title="办公电话" dataIndex="telephone" key="telephone" />
      <Column
        title="备注"
        key="notation"
        render={text => <div>{text.notation ? text.notation : '无'}</div>}
      />
      <Column
        title="操作"
        key="action"
        render={text => (
          <Button.Group>
            <Button icon="logout" onClick={() => props.showModal('edit', text.id)} />
            {/* <Button icon="delete" onClick={() => props.handleDelete(text.id)} /> */}
            <Popconfirm
              title="Are you sure delete this data?"
              onConfirm={() => props.handleDelete(text.id)}
            >
              <Button icon="delete" />
            </Popconfirm>
          </Button.Group>
        )}
      />
    </Table>
  );
};

DataList.propTypes = {
  data: PropTypes.array
};

export default DataList;

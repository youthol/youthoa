import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button, Badge } from 'antd';

const { Column } = Table;

const DataList = props => {
  return (
    <Table dataSource={props.data} expandedRowRender={props.handleExpandRow}>
      <Column title="设备名称" dataIndex="device" key="device" />
      <Column title="活动名称" dataIndex="activity" key="activity" />
      <Column title="借用人" dataIndex="lend_user" key="lend_user" />
      <Column
        title="借出时间"
        key="lend_at"
        render={text => <div>{moment(text.lend_at).format('YYYY-MM-DD HH:mm')}</div>}
      />
      <Column
        title="使用状态"
        key="status"
        render={text => (
          <div>
            {text.return_at ? (
              <Badge status="success" text="已归还" />
            ) : (
              <Badge status="processing" text="使用中" />
            )}
          </div>
        )}
      />
      <Column
        title="操作"
        key="action"
        render={text => (
          <Button.Group>
            <Button
              icon="logout"
              disabled={text.return_at ? true : false}
              onClick={() => props.showModal('renew', text.key)}
            />
            <Button icon="delete" disabled onClick={props.handleDelete} />
          </Button.Group>
        )}
      />
    </Table>
  );
};

DataList.propTypes = {
  data: PropTypes.array,
  handleExpandRow: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
};

export default DataList;

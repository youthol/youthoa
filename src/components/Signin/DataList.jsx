import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Badge } from 'antd';

const Column = Table.Column;

const DataList = props => {
  return (
    <Table dataSource={props.data}>
      <Column title="姓名" dataIndex="user.name" key="name" />
      <Column title="部门" dataIndex="user.department" key="department" />
      <Column title="年级" dataIndex="user.grade" key="grade" />
      <Column
        title="签到状态"
        key="status"
        render={text => (
          <div>
            {text.status === '0' ? (
              <Badge status="processing" text="值班中" />
            ) : (
              <Badge status="success" text="已签退" />
            )}
          </div>
        )}
      />
      <Column
        title="签到时间"
        key="created_at"
        render={text => <div>{moment(text.created_at).format('HH:mm:ss')}</div>}
      />
      <Column
        title="签退时间"
        key="updated_at"
        render={text => (
          <div>{text.status === '0' ? null : moment(text.updated_at).format('HH:mm:ss')}</div>
        )}
      />
    </Table>
  );
};

DataList.propTypes = {
  data: PropTypes.array
};

export default DataList;

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Badge } from 'antd';
import './Signin.css';

const { Column } = Table;

const DataList = props => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Table dataSource={props.data}>
        <Column title="姓名" dataIndex="user.name" key="name" />
        <Column title="部门" dataIndex="user.department" key="department" />
        <Column title="年级" dataIndex="user.grade" key="grade" />
        <Column
          title="使用状态"
          key="status"
          render={(text, render) => (
            <div>
              {text.created_at === text.updated_at ? (
                <Badge status="processing" text="值班中" />
              ) : (
                <Badge status="success" text="已签退" />
              )}
            </div>
          )}
        />
        <Column title="签到时间" key="created_at" render={(text, render) => (
          <div>
            {moment(text.created_at).format('HH:mm:ss')}
          </div>
        )} />
        <Column title="签退时间" key="updated_at" render={(text, render) => (
          <div>
            {text.created_at === text.updated_at ? '' : moment(text.updated_at).format('HH:mm:ss')}
          </div>
        )} />
      </Table>
    </div>
  );
};

DataList.propTypes = {
  data: PropTypes.array
};

export default DataList;

import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Table, Button, Badge } from 'antd';

const { Column } = Table;

const DataList = props => {
  return (
    <div style={{ backgroundColor: '#fff' }}>
      <Table dataSource={props.data}>
        <Column title="事件名称" dataIndex="event_name" key="event_name" />
        <Column title="地点" dataIndex="event_place" key="event_place" />
        <Column
          title="时间"
          key="event_date"
          render={(text, render) => (
            <div>{moment(text.created_at).format('YYYY-MM-DD HH:mm')}</div>
          )}
        />
        <Column title="发起人" dataIndex="sponsor" key="sponsor" />
        <Column
          title="完成状态"
          key="event_status"
          render={(text, render) => (
            <div>
              {text.event_status === '0' ? (
                <Badge status="processing" text="进行中" />
              ) : (
                <Badge status="success" text="已完成" />
              )}
            </div>
          )}
        />
        <Column
          title="发起时间"
          key="created_at"
          render={(text, render) => (
            <div>{moment(text.created_at).format('YYYY-MM-DD HH:mm')}</div>
          )}
        />
        <Column
          title="操作"
          key="action"
          render={(text, record) => (
            <Button.Group>
              <Button
                icon="logout"
                disabled={text.event_status === '0' ? false : true}
                onClick={() => props.showModal('renew', text.key)}
              />
              <Button icon="delete" disabled onClick={props.handleDelete} />
            </Button.Group>
          )}
        />
      </Table>
    </div>
  );
};

DataList.propTypes = {
  data: PropTypes.array
};

export default DataList;

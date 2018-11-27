import React from 'react';
import PropTypes from 'prop-types';
import { Button, Icon } from 'antd';
import './style.scss';

const OptsBtnGroup = props => {
  return (
    <div className="opt-btns">
      <Button.Group className="opt-btn-group">
        {props.add && (
          <Button type="primary">
            <Icon type="plus" />
            新增
          </Button>
        )}
        {props.download && (
          <Button type="primary">
            <Icon type="upload" />
            导入
          </Button>
        )}
        {props.upload && (
          <Button type="primary">
            <Icon type="download" />
            导出
          </Button>
        )}
      </Button.Group>
    </div>
  );
};

OptsBtnGroup.propTypes = {
  add: PropTypes.bool,
  upload: PropTypes.bool,
  download: PropTypes.bool
};

export default OptsBtnGroup;

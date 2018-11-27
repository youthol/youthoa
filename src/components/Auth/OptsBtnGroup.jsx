import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Button } from 'antd';
import './style.scss';

const OptsBtnGroup = props => {
  return (
    <div className="opt-btns">
      <Button.Group className="opt-btn-group">
        {props.add && (
          <Button
            type="primary"
            icon="plus"
            onClick={() => props.history.push(`/${props.component}/add`)}
          >
            新增
          </Button>
        )}
        {props.download && (
          <Button
            type="primary"
            icon="upload"
            onClick={() => props.history.push(`/${props.component}/import`)}
          >
            导入
          </Button>
        )}
        {props.upload && (
          <Button
            type="primary"
            icon="download"
            onClick={() => props.history.push(`/${props.component}/export`)}
          >
            导出
          </Button>
        )}
      </Button.Group>
    </div>
  );
};

OptsBtnGroup.propTypes = {
  component: PropTypes.string.isRequired,
  add: PropTypes.bool,
  upload: PropTypes.bool,
  download: PropTypes.bool
};

export default withRouter(OptsBtnGroup);

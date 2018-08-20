import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import './style.scss';

const NewItemBtn = props => {
  return (
    <Button.Group className="btn-group">
      <Button type="primary" icon="plus" onClick={() => props.showModal('add')}>
        {props.label || 'New'}
      </Button>
    </Button.Group>
  );
};

NewItemBtn.propTypes = {
  label: PropTypes.string,
  showModal: PropTypes.func.isRequired
};

export default NewItemBtn;

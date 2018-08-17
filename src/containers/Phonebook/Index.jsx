import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Form, message } from 'antd';
import DataList from '../../components/Phonebook/DataList';

const { Content } = Layout;

const data = [];
for (let i = 1; i <= 11; i++) {
  data.push({
    key: i,
    administrative_unit: `学生工作处`,
    office_location: `教育科`,
    office_person: `周艺璇`,
    telephone: `2786666`,
    notation: ``
  });
}

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalAddVisible: false,
      modalRenewVisible: false,
      upgradeId: 0
    };
  }
  componentDidMount() {
    this.getPhoneBookList();
  }
  getPhoneBookList = () => {
    fetch(`${this.props.baseUrl.localhost}phones`)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          data: data.data
        });
      })
      .catch(err => console.log('错误:', err));
  };
  showModal = (type, id) => {
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: true });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: true, upgradeId: id });
        break;
      default:
        message.error('出错啦~');
    }
  };
  handleOk = type => {
    const { getFieldValue, resetFields } = this.props.form;
    let formData, hasEmpty;
    // 获取表单数据
    if (type === 'add') {
      formData = {
        event_name: getFieldValue('event_name'),
        event_place: getFieldValue('event_place'),
        event_date: getFieldValue('event_date'),
        sponsor: getFieldValue('sponsor')
      };
    } else if (type === 'renew') {
      formData = {
        memo_user: getFieldValue('memo_user')
      };
    } else {
      message.error('出错啦~');
    }
    hasEmpty = Object.keys(formData).some(key => !formData[key]);
    if (hasEmpty) {
      message.error('请填完整后再提交~');
    } else {
      switch (type) {
        case 'add':
          formData.event_date = formData.event_date.format(
            'YYYY-MM-DD HH:mm:ss'
          );
          console.log(formData);
          this.setState({ modalAddVisible: false });
          break;
        case 'renew':
          console.log(formData);
          this.setState({ modalRenewVisible: false, upgradeId: 0 });
          break;
        default:
          message.error('出错啦~');
      }
      resetFields();
    }
  };
  handleCancel = type => {
    const { resetFields } = this.props.form;
    switch (type) {
      case 'add':
        this.setState({ modalAddVisible: false });
        break;
      case 'renew':
        this.setState({ modalRenewVisible: false });
        break;
      default:
        message.error('出错啦~');
    }
    resetFields();
  };
  onChange = e => {
    console.log(e.target.value);
  };
  render() {
    return (
      <Content className="page__bd">
        <DataList data={this.state.data} showModal={this.showModal} />
      </Content>
    );
  }
}

const mapStateToProps = state => ({
  baseUrl: state.baseUrl
});

export default connect(mapStateToProps)(Form.create()(Index));

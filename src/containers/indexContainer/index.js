import React, { Component } from 'react';
import './index.less';
import {
  Form, Input, Button, message,
} from 'antd';

const serverOrigin = process.env.NODE_ENV === 'production' ? `${window.location.origin}/qrcode-api` : 'http://localhost:8800';

class ParamsForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { form: { validateFields }, onSubmit } = this.props;
    validateFields((errors, values) => {
      if (errors) {
        return;
      }
      onSubmit(values);
    });
  }

  render() {
    const { Item } = Form;
    const { form: { getFieldDecorator }, loading } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    return (
      <Form className="my-form" {...formItemLayout} onSubmit={this.handleSubmit}>
        <Item label="appId">{getFieldDecorator('appid', { rules: [{ required: true }] })(<Input placeholder="请输入小程序appId" allowClear />)}</Item>
        <Item label="appSecret">{getFieldDecorator('appsecret', { rules: [{ required: true }] })(<Input placeholder="请输入小程序appSecret" allowClear />)}</Item>
        <Item label="页面路径">{getFieldDecorator('path', { rules: [{ required: true }] })(<Input placeholder="请输入小程序页面路径" allowClear />)}</Item>
        <Item label="query参数">{getFieldDecorator('queryKey', { rules: [{ required: true }] })(<Input placeholder="请输入query参数名，如：channel" allowClear />)}</Item>
        <Item label="参数取值">{getFieldDecorator('queryParams', { rules: [{ required: true }] })(<Input.TextArea placeholder="请输入query参数的取值，用换行隔开，如：&#13;&#10;shanghai&#13;&#10;beijing" allowClear autosize={{ minRows: 4 }} />)}</Item>
        <Item>
          <Button type="primary" htmlType="submit" loading={loading}>提交</Button>
        </Item>
      </Form>
    );
  }
}

const WrappedForm = Form.create({})(ParamsForm);
export default class AContainer extends Component {
  constructor() {
    super();
    this.state = { loading: false };
  }

  handleError = (msg) => {
    this.setState({ loading: false });
    message.error(msg);
  }

  handleSuccess = (data) => {
    this.setState({ loading: false, success: true, url: `${serverOrigin}${data.bundleurl}` });
    message.success('处理成功');
  }

  handleSubmit = (formData) => {
    this.setState({ loading: true, success: false });
    fetch(`${serverOrigin}/api/process`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw res;

        res.json()
          .then((data) => {
            console.log(data);
            if (!/^\/\d+/.test(data.bundleurl)) throw data;
            this.handleSuccess(data);
          })
          .catch((err) => {
            console.error(err);
            this.handleError(err.message);
          });
      })
      .catch((err) => {
        console.error(err);
        this.handleError(err.message);
      });
  }

  render() {
    const { loading, success, url } = this.state;
    return (
      <div className="page">
        <h3>批量生产小程序二维码</h3>
        <WrappedForm onSubmit={this.handleSubmit} loading={loading} />
        {success ? (
          <h4>
下载地址：
            <a href={url}>{url}</a>
          </h4>
        ) : null}
      </div>
    );
  }
}

import { Form, Input } from 'antd';
import React from 'react';
import { List } from '../../components/List/List';
import { phoneRegex } from '../../constants/phoneRegex';
import { EntityEnum } from '../../enums/EntityEnum';

export const Users: React.FC = () => {
  return (
    <List
      entity={EntityEnum.Users}
      title="Users"
      filter={null}
      modalFormFields={
        <>
          <Form.Item name="id" hidden>
            <Input type="hidden" />
          </Form.Item>

          <Form.Item
            label="Login"
            name="login"
            rules={[{ required: true, message: 'Please input your login!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="Phone"
            rules={[
              { required: true, message: 'Please input your phone!' },
              { pattern: phoneRegex, message: 'Input valid phone number' },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ required: true, message: 'Please input your email!' }]}
          >
            <Input type="email" />
          </Form.Item>
        </>
      }
    />
  );
};

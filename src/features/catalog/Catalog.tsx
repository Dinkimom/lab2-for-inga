import { Form, Input, Select } from 'antd';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { List } from '../../components/List/List';
import { CardTypeEnum } from '../../enums/CardTypeEnum';
import { EntityEnum } from '../../enums/EntityEnum';
import { usersThunk } from '../users/usersSlice';

const { Option } = Select;

export const Catalog: React.FC = () => {
  const { list: users } = useSelector((state: any) => state.users);
  const { modal } = useSelector((state: any) => state.cards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersThunk.fetchList());
  }, [modal, dispatch]);

  return (
    <List
      entity={EntityEnum.Catalog}
      title="Catalog"
      filter={
        <>
          <Form.Item
            name="author"
            label="Author"
            style={{ margin: 0, marginRight: 8 }}
            rules={[{ required: true, message: 'Please input an author!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="title"
            label="Title"
            style={{ margin: 0 }}
            rules={[{ required: true, message: 'Please input a title!' }]}
          >
            <Input />
          </Form.Item>
        </>
      }
      removeButton={false}
      updateButton={false}
      addButton={false}
      modalFormFields={
        <>
          <Form.Item label="Title" name="title" style={{ width: 200 }}>
            <Input readOnly />
          </Form.Item>
          <Form.Item label="Book" name="bookId" hidden style={{ width: 200 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Type" name="type" initialValue={CardTypeEnum.Card}>
            <Select>
              <Option value={CardTypeEnum.Card}>Card</Option>
              <Option value={CardTypeEnum.Reserved}>Reserved</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="User"
            name="userId"
            rules={[{ required: true, message: 'Please choose a user!' }]}
            style={{ width: 200 }}
          >
            <Select>
              {users.map((item: any) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </>
      }
    />
  );
};

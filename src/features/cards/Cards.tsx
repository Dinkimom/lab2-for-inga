import { Form, Select } from 'antd';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { List } from '../../components/List/List';
import { CardTypeEnum } from '../../enums/CardTypeEnum';
import { EntityEnum } from '../../enums/EntityEnum';
import { catalogThunk } from '../catalog/catalogSlice';
import { usersThunk } from '../users/usersSlice';

const { Option } = Select;

export const Cards: React.FC = () => {
  const { list: users } = useSelector((state: any) => state.users);
  const { modal } = useSelector((state: any) => state.cards);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(usersThunk.fetchList());
    dispatch(catalogThunk.fetchList());
  }, [modal, dispatch]);

  return (
    <List
      entity={EntityEnum.Card}
      title="Cards"
      updateButton={false}
      addButton={false}
      filter={
        <>
          <Form.Item
            name="type"
            label="Type"
            rules={[{ required: true, message: 'Please choose a type!' }]}
            style={{ margin: 0, marginRight: 8, width: 200 }}
            initialValue={CardTypeEnum.Card}
          >
            <Select>
              <Option value={CardTypeEnum.Card}>Card</Option>
              <Option value={CardTypeEnum.Reserved}>Reserved</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="User"
            name="userId"
            rules={[{ required: true, message: 'Please choose a user!' }]}
            style={{ margin: 0, width: 200 }}
          >
            <Select>
              {users.map((item: any) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
            </Select>
          </Form.Item>
        </>
      }
      modalFormFields={null}
    />
  );
};

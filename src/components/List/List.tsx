import { Button, Form, Modal, Result, Table, Typography } from 'antd';
import React, { createRef, ReactNode, useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ReduxState, RootState } from '../../app/store';
import { EntityEnum } from '../../enums/EntityEnum';
import { cardsActions, cardsThunk } from '../../features/cards/cardsSlice';
import {
  catalogActions,
  catalogThunk,
} from '../../features/catalog/catalogSlice';
import { usersActions, usersThunk } from '../../features/users/usersSlice';
import { Filter } from '../../types/Filter';
import styles from './List.module.css';

const stateThunks = {
  cards: cardsThunk,
  users: usersThunk,
  catalog: catalogThunk,
};

const stateActions = {
  cards: cardsActions,
  users: usersActions,
  catalog: catalogActions,
};

const { Title } = Typography;

interface Props {
  entity: EntityEnum;
  filter: ReactNode | null;
  title: string;
  addButton?: boolean;
  removeButton?: boolean;
  updateButton?: boolean;
  modalFormFields: ReactNode | null;
}

export const List: React.FC<Props> = ({
  entity,
  title,
  filter,
  addButton,
  removeButton,
  updateButton,
  modalFormFields,
}) => {
  const listState = useSelector(
    (state: RootState) => (state as any)[ReduxState[entity]]
  );

  const { list, loading, error } = listState;

  const { opened, formData, loading: modalLoading } = listState.modal;

  const thunks = (stateThunks as any)[ReduxState[entity]];
  const actions = (stateActions as any)[ReduxState[entity]];

  const dispatch = useDispatch();

  const formRef: any = createRef();
  const filterRef: any = createRef();

  useEffect(() => {
    if (!filter) {
      handleFetchList();
    }
  }, [dispatch, thunks]);

  useEffect(() => {
    if (formRef.current) {
      if (formData) {
        return formRef.current.setFieldsValue(formData);
      }

      return formRef.current.resetFields();
    }
  }, [formRef, opened]);

  const handleFetchList = (filter?: Filter) => {
    dispatch(thunks.fetchList(filter));
  };

  const handleModalSubmit = (data: any) => {
    if (data.id) {
      return dispatch(
        thunks.update(
          data,
          filter ? filterRef.current.getFieldsValue() : undefined
        )
      );
    }

    dispatch(
      thunks.create(
        data,
        filter ? filterRef.current.getFieldsValue() : undefined
      )
    );
  };

  const handleModalToggle = (data: null | any) => {
    dispatch(actions.toggleModal(data));
  };

  const handleItemRemove = (data: any) => {
    if (window.confirm('Would you like to remove item?')) {
      return dispatch(thunks.remove(data.id));
    }

    return null;
  };

  const getColumns = useCallback(() => {
    if (list.length) {
      const columns: any[] = Object.keys(list[0]).map((item) => ({
        title: item,
        dataIndex: item,
        key: item,
      }));

      columns.push({
        render: (text: string, record: any) => {
          return (
            <>
              {updateButton && (
                <Button
                  onClick={() => handleModalToggle(record)}
                  style={{ marginRight: 8 }}
                >
                  Update
                </Button>
              )}
              {entity === EntityEnum.Catalog && (
                <Button
                  onClick={() =>
                    handleModalToggle({ bookId: record.id, ...record })
                  }
                  type="primary"
                >
                  Reserve
                </Button>
              )}
              {removeButton && (
                <Button danger onClick={() => handleItemRemove(record)}>
                  Delete
                </Button>
              )}
            </>
          );
        },
      });

      return columns;
    }

    return [];
  }, [list, removeButton]);

  if (error) {
    return (
      <Result
        status="error"
        title={error}
        extra={
          <Button type="primary" key="console" onClick={handleFetchList}>
            Reload page
          </Button>
        }
      />
    );
  }

  return (
    <>
      <div className={styles.listHead}>
        <Title>{title}</Title>

        <div className={styles.listTools}>
          {filter && (
            <Form
              layout="horizontal"
              style={{ display: 'flex' }}
              onFinish={(data) => handleFetchList(data)}
              ref={filterRef}
            >
              {filter}

              <Button
                style={{ marginLeft: 16, width: 150 }}
                type="primary"
                htmlType="submit"
              >
                Search
              </Button>
            </Form>
          )}

          {addButton && (
            <Button
              onClick={() => handleModalToggle(null)}
              style={{ marginLeft: 16 }}
            >
              Add
            </Button>
          )}
        </div>
      </div>

      <Table
        dataSource={list}
        columns={getColumns()}
        loading={loading}
        pagination={false}
      />

      <Modal
        visible={opened}
        onCancel={() => handleModalToggle(null)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleModalSubmit} ref={formRef}>
          {modalFormFields}

          <Form.Item style={{ marginTop: 16 }}>
            <Button
              style={{ marginRight: 8 }}
              type="primary"
              htmlType="submit"
              loading={modalLoading}
            >
              Submit
            </Button>

            <Button onClick={() => handleModalToggle(null)}>Cancel</Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

List.defaultProps = {
  addButton: true,
  removeButton: true,
  updateButton: true,
};

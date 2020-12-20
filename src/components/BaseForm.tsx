import { Button, Form } from 'antd';
import React, { ReactNode, useRef } from 'react';

export interface BaseFormProps {
  loading: boolean;
  onSubmit: (data: any) => void;
  children?: ReactNode | null;
  defaultValues?: { [key: string]: any } | null;
  footer?: ReactNode;
}

export const BaseForm: React.FC<BaseFormProps> = ({
  loading,
  onSubmit,
  children,
  defaultValues,
  footer,
}) => {
  const formRef: any = useRef();

  const renderFooter = () => {
    if (footer === undefined) {
      return (
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Submit
          </Button>
        </Form.Item>
      );
    }

    return footer;
  };

  return (
    <Form
      layout="vertical"
      name="basic"
      onFinish={onSubmit}
      initialValues={defaultValues as any}
      ref={formRef}
    >
      {children}

      {renderFooter()}
    </Form>
  );
};

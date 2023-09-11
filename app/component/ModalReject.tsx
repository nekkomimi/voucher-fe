"use client";
import React from "react";
import { Modal, Button, Form, Input, Card, Col, notification } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { transactionRepository } from "#/repository/transaction";

const ModalReject = (props: any) => {
  const [form] = Form.useForm();

  const handleReject = async () => {
    const value = form.getFieldsValue();
    const data = {
      reject_reason: value.reject_reason
    };
    try {
      const result = await transactionRepository.api.rejectTransaction(props?.selectedId, data);
      notification.success({
        message: 'Success reject this transaction'
      });
    } catch (error: any) {
      notification.error({
        message: error?.response?.body?.error
      })
    } finally {
      form.resetFields()
      props?.handleCloseModalReject()
    }
  }
  return (
    <Modal centered open={props?.visibleModalReject} title={
      <div className="flex justify-between">
        <p>Reject Transaction</p>
      </div>
    } footer={false} onCancel={() => {
      form.resetFields()
      props?.handleCloseModalReject()
    }}>
      <Card>
        <Form form={form} layout="vertical" requiredMark={false}>
          <Form.Item
            label="Reject Reason"
            name={"reject_reason"}
            rules={[
              {
                whitespace: true,
                required: true,
                message: "Please Input Reject Reason",
              },
            ]}
          >
            <Input placeholder="Reason" />
          </Form.Item>
          <Col span={24}>
            <div className="flex justify-end gap-4">
              <Form.Item>
                <Button type="link" onClick={() => {
                  form.resetFields()
                  props?.handleCloseModalReject()
                }}>
                  Cancel
                </Button>
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  className="antPrimaryButton"
                  onClick={() => {
                    handleReject()
                  }}
                >
                  Save
                </Button>
              </Form.Item>
            </div>
          </Col>
        </Form>
      </Card>
    </Modal>
  );
};

export default ModalReject;

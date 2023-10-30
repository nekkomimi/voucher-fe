'use client'

import {Modal, Card, Form, Input, Button, Upload, Col, InputNumber} from "antd"
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { convertRupiah } from "#/utils/convert_rupiah";
import { useState } from "react";

const FormModal = (props: any) => {
  const [total, setTotal] = useState('Rp 0');
  const calculateTotal = (value: any) => {
    const total = props?.voucherType == "1" ? 100000 * +value.target.value : 180000 * +value.target.value;
    setTotal(convertRupiah(total + props?.randomNumber));
  }
    return (
      <>
        <Modal
          title={
            <div className="flex justify-between">
              <p>Buy Voucher</p>
              <div
                className="absolute right-12 top-4 cursor-pointer px-1 text-gray-400 hover:bg-slate-100 hover:text-gray-900"
                onClick={() => props?.handleCancelModal()}
              >
                <MinusOutlined />
              </div>
            </div>
          }
          open={props?.isModalOpen}
          onCancel={props?.handleCancelModal}
          footer={false}
          maskClosable={false}
        >
          <Card className="custom-card">
            <Form layout="vertical" form={props?.form} requiredMark={false}>
              <Form.Item
                label="First Name"
                name={"first_name"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Please Input First Name",
                  },
                ]}
              >
                <Input placeholder="First Name" />
              </Form.Item>
              <Form.Item
                label="Last Name"
                name={"last_name"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Please Input Last Name",
                  },
                ]}
              >
                <Input placeholder="Last Name" />
              </Form.Item>
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Please Input Email",
                  },
                ]}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Phone"
                name={"phone_number"}
                rules={[
                  { required: true, message: "Please Input Phone Number!" },
                  {
                    pattern: /^-?[0-9]*$/,
                    message: "Please Input Phone Number Correctly",
                  },
                ]}
              >
                <Input type="text" maxLength={13} placeholder="Phone Number" />
              </Form.Item>
              <Form.Item
                label="Voucher Amount"
                name={"amount"}
                rules={[
                  {
                    required: true,
                    message: "Please Input Amount",
                  },
                  {
                    validator(rule, value, callback) {
                      if (value < 0) {
                        return Promise.reject('Amount cannot be 0')
                      }
                      return Promise.resolve()
                    },
                  }
                ]}
              >
                <InputNumber style={{
                  width: '100%'
                }} placeholder="Voucher Amount"/>
              </Form.Item>
              <Col span={24}>
                <div className="flex justify-end gap-4">
                  <Form.Item>
                    <Button type="link" onClick={props?.handleCancelModal}>
                      Cancel
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="antPrimaryButton"
                      onClick={() => {
                        props?.handleSaveModal()
                      }}
                    >
                      Buy
                    </Button>
                  </Form.Item>
                </div>
              </Col>
            </Form>
          </Card>
        </Modal>
      </>
    )
  }

  export default FormModal;

'use client'

import { Modal, Card, Form, Input, Button, Upload, Col } from "antd"
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
                label="Name"
                name={"name"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Please Input Name",
                  },
                ]}
              >
                <Input placeholder="Name" />
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
                label="Amount"
                name={"amount"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Please Input Amount",
                  },
                  {
                    validator(rule, value, callback) {
                      if (value == 0 || value == '0') {
                        return Promise.reject('Amount cannot be 0')
                      }
                      return Promise.resolve()
                    },
                  }
                ]}
              >
                <Input placeholder="Amount" onChange={calculateTotal}/>
              </Form.Item>
              <Form.Item label="Payment Method"
              rules={[
                {
                    required: true
                }
              ]}>
                <div>
                  <p>Bank Mandiri | A.N Nugroho Kuncoro Adi | 1590902905920</p>
                  <p>Total: {total}</p>
                  <Button onClick={props?.copyToClipboard}>Copy to clipboard</Button>
                </div>
              </Form.Item>
              <Form.Item label={"Payment Receipt"}>
                <Upload {...props?.propsUploadFile}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
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
                      Save
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
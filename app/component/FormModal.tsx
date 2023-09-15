'use client'

import { Modal, Card, Form, Input, Button, Upload, Col } from "antd"
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";

const FormModal = (props: any) => {
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
                label="Referral Code ( Optional )"
                name={"referral_code"}
                rules={[
                  {
                    whitespace: true,
                    required: false,
                  },
                ]}
              >
                <Input placeholder="Referral Code" />
              </Form.Item>
              <Form.Item label="Payment Method"
              rules={[
                {
                    required: true
                }
              ]}>
                <div>
                  <p>Bank Mandiri | A.N Nugroho Kuncoro Adi | 1590902905920</p>
                  <p>Amount: {props?.voucherType == "1" ? `Rp 100.${props?.randomNumber}` : `Rp 180.${props?.randomNumber}`}</p>
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
                      onClick={props?.handleSaveModal}
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
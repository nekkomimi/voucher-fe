'use client'

import {Modal, Card, Form, Input, Button, Upload, Col, InputNumber} from "antd"
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { convertRupiah } from "#/utils/convert_rupiah";
import { useState } from "react";

const FormModal = (props: any) => {
  const [total, setTotal] = useState('Rp 0');
  const {
    handleCancelModal,
    isModalOpen,
    voucherType,
    handleSaveModal,
    form,
    isLoading,
    setIsLoading,
  } = props;
    return (
      <>
        <Modal
          title={
            <div className="flex justify-between">
              <p>Pembelian Voucher</p>
              <div
                className="absolute right-12 top-4 cursor-pointer px-1 text-gray-400 hover:bg-slate-100 hover:text-gray-900"
                onClick={() => handleCancelModal()}
              >
                <MinusOutlined />
              </div>
            </div>
          }
          open={isModalOpen}
          onCancel={handleCancelModal}
          footer={false}
          maskClosable={false}
        >
          <Card className="custom-card">
            <Form layout="vertical" form={form} requiredMark={false}>
              <Form.Item
                label="Nama Depan"
                name={"first_name"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Tolong masukan nama depan anda",
                  },
                ]}
              >
                <Input placeholder="Nama Depan" />
              </Form.Item>
              <Form.Item
                label="Nama Belakang"
                name={"last_name"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Tolong masukan nama belakang anda",
                  },
                ]}
              >
                <Input placeholder="Nama Belakang" />
              </Form.Item>
              <Form.Item
                label="Email"
                name={"email"}
                rules={[
                  {
                    whitespace: true,
                    required: true,
                    message: "Tolong masukan email and",
                  },
                ]}
                extra={'Tolong masukkan email yang aktif karena voucher akan dikirim ke email.'}
              >
                <Input placeholder="Email" />
              </Form.Item>
              <Form.Item
                label="Nomor Telepon"
                name={"phone_number"}
                rules={[
                  { required: true, message: "Tolong masukan nomor telepon anda" },
                  {
                    pattern: /^-?[0-9]*$/,
                    message: "Tolong masukan nomor telepon anda dengan format yang benar",
                  },
                ]}
              >
                <Input type="text" maxLength={13} placeholder="Nomor Telepon" />
              </Form.Item>
              <Form.Item
                label="Jumlah Voucher"
                name={"amount"}
                rules={[
                  {
                    required: true,
                    message: "Tolong masukan jumlah voucher yang ingin anda beli",
                  },
                  {
                    validator(rule, value, callback) {
                      if (value <= 0) {
                        return Promise.reject('Jumlah voucher tidak boleh 0')
                      } else if (value > 10) {
                        return Promise.reject('Maksimal jumlah voucher yang dibeli adalah 10')
                      }
                      return Promise.resolve()
                    },
                  }
                ]}
              >
                <InputNumber min={0} style={{
                  width: '100%'
                }} placeholder="Jumlah Voucher"/>
              </Form.Item>
              <Col span={24}>
                <div className="flex justify-end gap-4">
                  <Form.Item>
                    <Button type="link" onClick={handleCancelModal}>
                      Batal
                    </Button>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      className="antPrimaryButton"
                      onClick={(event) => {
                        handleSaveModal()
                      }}
                      loading={isLoading}
                    >
                      Beli Sekarang
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

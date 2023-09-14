"use client";

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message, Row, Carousel, notification } from 'antd';
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import type { UploadProps } from 'antd';
import Image from 'next/image';
import Banner from '../public/images/Banner.jpg'
import Success from "#/public/icon/success.png";
import DiamondButton from '#/public/images/DiamondButton.PNG'
import GoldButton from '#/public/images/GoldButton.PNG'
import BannerSlider from '#/public/images/BannerSlider.jpg'
import Poster from '#/public/images/Poster.jpg'
import type { UploadFile } from 'antd/es/upload/interface';
import { transactionRepository } from '#/repository/transaction';
import { config } from '#/config/app';


export default function Home() {
  const router = useRouter();

  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [voucherType, setVoucherType] = useState("1");
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 900) + 100);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    newFileList = newFileList.slice(-2);

    // 2. Read from response and show file link
    newFileList = newFileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const props = {
    action: `${config.baseUrl}/file/upload?type=payment_receipt`,
    onChange: handleChange,
    multiple: true,
    fileList: fileList
  };

  const handleModalOpen = () => {
    setIsModalOpen(true)
  };

  const handleSaveModal = async () => {
    try {
      const value = await form.validateFields();
      const data = {
        ...value,
        voucher_type: voucherType,
        payment_receipt: fileList[0].response.data.url,
        fee: randomNumber.toString()
      };
      const result = await transactionRepository.api.createTransaction(data);
      if (result.status === 201) {
        setIsModalOpen(false)
        setIsSuccessModalOpen(true)
        form.resetFields()
        setFileList([])
      } else {
        notification.error({
          message: result.body.error
        })
      }
    } catch (error: any) {
      notification.error({
        message: 'Please fill the form'
      })
    }
  }

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = '1590902905920'; // Ganti dengan nomor rekening yang ingin Anda salin
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    message.success('nomor rekening berhasil disalin')
  };

  const handleCancelModal = () => {
    setIsModalOpen(false)
    form.resetFields()
    setFileList([])
  };

  return (
    <div className='w-screen h-screen bg-black justify-center items-center mx-auto'>

      {/* Carousel */}
      <div className='w-screen'>
        <Carousel autoplay>
          <Image src={BannerSlider} alt='banner' className='h-[300px]'></Image>
        </Carousel>
      </div>

      {/* Choose Your Plan */}
      <div className='text-4xl text-white mt-1 flex items-center justify-center'>Choose Your Plan</div>

      {/* Buttons Section */}
      <div className='text-center'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-x-52'>
          <Image src={GoldButton} alt='gold' style={{
            width: '454px',
            height: '244px'
          }} onClick={() => {
            setVoucherType("1")
            handleModalOpen();
          }}></Image>
          <Image src={DiamondButton} alt='diamond' style={{
            width: '454px',
            height: '244px'
          }} onClick={() => {
            setVoucherType("2")
            handleModalOpen();
          }}></Image>
        </div>
      </div>

      {/* Posters Section */}
      <div className='z-40 space-y-10 text-center mt-5'>
        <div className='flex flex-col md:flex-row justify-center items-center gap-x-28 gap-y-5'>
          <Image src={Poster} alt='Poster' style={{
            width: '170px',
            height: '300px'
          }}></Image>
          <Image src={Poster} alt='Poster' style={{
            width: '170px',
            height: '300px'
          }}></Image>
          <Image src={Poster} alt='Poster' style={{
            width: '170px',
            height: '300px'
          }}></Image>
          <Image src={Poster} alt='Poster' style={{
            width: '170px',
            height: '300px'
          }}></Image>
          <Image src={Poster} alt='Poster' style={{
            width: '170px',
            height: '300px'
          }}></Image>
        </div>
      </div>
      <Modal
        title={
          <div className="flex justify-between">
            <p>Buy Voucher</p>
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
            <Form.Item label="Payment Method">
              <div>
                <p>Bank Mandiri | A.N Nugroho Kuncoro Adi | 1590902905920</p>
                <p>Amount: {voucherType == "1" ? `Rp 100.${randomNumber}` : `Rp 180.${randomNumber}`}</p>
                <Button onClick={copyToClipboard}>Copy to clipboard</Button>
              </div>
            </Form.Item>
            <Form.Item label={"Payment Receipt"}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Col span={24} key={null}>
              <div className="flex justify-end gap-4">
                <Form.Item>
                  <Button type="link" onClick={handleCancelModal}>
                    Cancel
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    className="antPrimaryButton"
                    onClick={handleSaveModal}
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={isSuccessModalOpen}
        footer={[
          <Row justify={"center"}>
            <Col>
              <Button type="primary" onClick={() => setIsSuccessModalOpen(false)}>
                Close
              </Button>
            </Col>
          </Row>,
        ]}
        width={"400px"}
        className="modal-delete text-center"
        onCancel={() => setIsSuccessModalOpen(false)}
      >
        <div className="flex flex-col gap-4 justify-center items-center">
          <div className="flex justify-center items-center h-20 w-20 rounded-full bg-[#E0FFE8]">
            <Image src={Success} alt="trash" />
          </div>
          <div className="text-[18px] font-bold">Your transaction will be checked by our Admin</div>
          <div className="text-[14px] text-[#A6A6A6]">Please check your email inbox</div>
        </div>
      </Modal>
    </div>
  )
}

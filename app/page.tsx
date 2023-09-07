"use client";

import React, {useEffect, useState} from 'react';
import { render } from 'react-dom';
import {Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message} from 'antd';
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import {useRouter} from "next/navigation";
import { useForm } from "antd/es/form/Form";
import type { UploadProps } from 'antd';
import Image from 'next/image';
import Banner from '../public/images/Banner.jpg'


const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange(info) {
        const { status } = info.file;
        if (status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (status === 'done') {
            message.success(`${info.file.name} file uploaded successfully.`);
        } else if (status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    },
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};

export default function Home() {
  const router = useRouter();

    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleModalOpen = () => {
        setIsModalOpen(true)
    };

    const handleOkModal = () => {
        setIsModalOpen(false)
    };

    const handleCancelModal = () => {
        setIsModalOpen(false)
    };

  // useEffect(() => {
  //   if(router) {
  //     router.push('/home');
  //   }
  // }, [router]);

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = '1590902905920'; // Ganti dengan nomor rekening yang ingin Anda salin
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);

    message.success('nomor rekening berhasil disalin')
  };

  return (
    <div className="container mx-auto h-screen flex justify-center items-center relative">
      {/* <img
        src="https://img.freepik.com/free-vector/gradient-abstract-geometric-background_23-2149120339.jpg?w=1380&t=st=1693850816~exp=1693851416~hmac=95c921b632e7762432db98a73db5b93b00cdeaa4395b57cdb2e3264fff440a20"
        alt="Banner"
        className="absolute w-screen h-screen"
      /> */}
      {/* <img src='../public/images/Banner.jpg'></img> */}
      <Image src={Banner} alt='Banner' className="absolute w-screen h-screen"></Image>
      <div className="z-40 space-y-10 text-center md:mt-72 mt-0">
        <div className="flex flex-col md:flex-row justify-center md:justify-evenly items-center gap-x-10 gap-y-10">
          <div
            className="bg-white hover:bg-[#f2f2f2] rounded-2xl border-black border-2  md:w-[800px] md:h-[475px] w-60 h-60 flex items-center justify-center"
            onClick={() => {
              handleModalOpen();
            }}
          >
            <div className="p-6 m-4 space-y-4 md:space-y-8">
              <h2 className="md:text-5xl text-4xl font-semibold text-black-800 font-sans">
                Gold
              </h2>
              <p className="text-black-600 md:text-3xl text-2xl font-sans">
                1 Month Subscribe
              </p>
              <Divider
                style={{
                  height: "3px",
                  backgroundColor: "black",
                }}
              ></Divider>
              <p className="md:text-4xl text-3xl font-semibold text-black-800 font-sans">
                100K
              </p>
            </div>
          </div>
          <div
            className="bg-white hover:bg-[#f2f2f2] rounded-2xl border-black border-2  md:w-[800px] md:h-[475px] w-60 h-60 flex items-center justify-center"
            onClick={() => {
              handleModalOpen();
            }}
          >
            <div className="p-6 m-4 space-y-4 md:space-y-8">
              <h2 className="md:text-5xl text-4xl font-semibold text-black-800 font-sans">
                Diamond
              </h2>
              <p className="text-black-600 md:text-3xl text-2xl font-sans">
                3 Month Subscribe
              </p>
              <Divider
                style={{
                  height: "3px",
                  backgroundColor: "black",
                }}
              ></Divider>
              <p className="md:text-4xl text-3xl font-semibold text-black-800 font-sans">
                180K
              </p>
            </div>
          </div>
        </div>
      </div>
      <Modal
        title={
          <div className="flex justify-between">
            <p>Register Voucher</p>
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
            <Form.Item label="Payment Method" name={"payment"}>
              <div>
                <p>Bank Mandiri | A.N Nugroho Kuncoro Adi | 1590902905920</p>
                <Button onClick={copyToClipboard}>Salin Nomor Rekening</Button>
              </div>
            </Form.Item>
            <Form.Item label={"Payment Receipt"}>
              <Upload {...props}>
                <Button icon={<UploadOutlined />}>Click to Upload</Button>
              </Upload>
            </Form.Item>
            <Col span={24}>
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
                    // onClick={handleSubmitForm}
                    // loading={loadingGenerateData}
                  >
                    Save
                  </Button>
                </Form.Item>
              </div>
            </Col>
          </Form>
        </Card>
      </Modal>
    </div>
  );
}

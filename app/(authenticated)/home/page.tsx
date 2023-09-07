"use client";

import React, { useState } from "react";
import { Button, Card, Modal, Form, Radio, Input, Col, Upload, message } from "antd";
import Image from 'next/image'; // Import the Next.js Image component
import { store } from "#/store";
import type { UploadProps } from 'antd';
import { MinusOutlined, SearchOutlined, InboxOutlined } from "@ant-design/icons";
import { sampleRepository } from "#/repository/sample";
import { useForm } from "antd/es/form/Form";
import background from "../../../public/assets/background.jpg"


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

const CardWithModal = () => {
    return (
        <div className="w-64 p-4 bg-white shadow-lg rounded-2xl dark:bg-gray-800">
            <p className="text-3xl font-bold text-black dark:text-white">
                Essential
            </p>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
                For the basics tailwind
            </p>
            <p className="text-3xl font-bold text-black dark:text-white">
                $99
            </p>
            <p className="mb-4 text-sm text-gray-500 dark:text-gray-300">
                Per agent per month
            </p>
            <button type="button" className="w-56 px-3 py-3 m-auto text-sm text-black bg-white border border-black rounded-lg shadow hover:bg-black hover:text-white dark:hover-text-gray-900 dark:hover:bg-gray-100 ">
                Request demo
            </button>
            <ul className="w-full mt-6 mb-6 text-sm text-black dark:text-white">
                <li className="flex items-center mb-3">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792">
                        <path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                        </path>
                    </svg>
                    All illimited components Tailwind
                </li>
                <li className="flex items-center mb-3">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792">
                        <path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                        </path>
                    </svg>
                    Own analitycs templates
                </li>
                <li className="flex items-center mb-3">
                    <svg className="mr-2" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 1792 1792">
                        <path d="M1152 896q0 106-75 181t-181 75-181-75-75-181 75-181 181-75 181 75 75 181zm-256-544q-148 0-273 73t-198 198-73 273 73 273 198 198 273 73 273-73 198-198 73-273-73-273-198-198-273-73zm768 544q0 209-103 385.5t-279.5 279.5-385.5 103-385.5-103-279.5-279.5-103-385.5 103-385.5 279.5-279.5 385.5-103 385.5 103 279.5 279.5 103 385.5z">
                        </path>
                    </svg>
                    24/24 support link
                </li>
            </ul>
            <span className="block w-56 h-1 my-2 bg-gray-100 rounded-lg">
            </span>
            <ul className="w-full mt-6 mb-6 text-sm text-black dark:text-white">
                <li className="flex items-center mb-3 space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#10b981" viewBox="0 0 1792 1792">
                        <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                        </path>
                    </svg>
                    <div>
                        All free dashboard
                        <a href="#" className="font-semibold text-red-500">
                            free plan
                        </a>
                    </div>
                </li>
                <li className="flex items-center mb-3 space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#10b981" viewBox="0 0 1792 1792">
                        <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                        </path>
                    </svg>
                    <div>
                        Best ranking
                    </div>
                </li>
                <li className="flex items-center mb-3 space-x-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#10b981" viewBox="0 0 1792 1792">
                        <path d="M1600 736v192q0 40-28 68t-68 28h-416v416q0 40-28 68t-68 28h-192q-40 0-68-28t-28-68v-416h-416q-40 0-68-28t-28-68v-192q0-40 28-68t68-28h416v-416q0-40 28-68t68-28h192q40 0 68 28t28 68v416h416q40 0 68 28t28 68z">
                        </path>
                    </svg>
                    <div>
                        Chocolate and meel
                    </div>
                </li>
            </ul>
        </div>
    );
};

const CardPricing = ({month, price}) => {
    return (
        <div>
            <Card>
                <div>
                    <p>{month} Month Access</p>
                    <p>{price}K</p>
                </div>
                <div>
                    <Button>Setup your plan</Button>
                </div>
            </Card>
        </div>
    )
}

const PricingSection = ({month, price}) => {
    return (
      <div className="pricing-section">
        <h2>Pricing Plans</h2>
        <div className="pricing-cards">
          <Card title="Basic Plan">
            <p className="price">{price}K For {month} Month Access</p>
            <p>For basic features</p>
            <Button type="primary">Subscribe</Button>
          </Card>
        </div>
      </div>
    );
  };



const Page = () => {
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

    return (
        <div style={{ position: 'relative' }}>
            <img
                src={"https://img.freepik.com/free-vector/gradient-abstract-geometric-background_23-2149120339.jpg?w=1380&t=st=1693831976~exp=1693832576~hmac=4902f8c381426c870ec59e366511b5ce82cfc8b7a37e09bad2f134cff94461fd"}
                style={{ width: '100%' }}
                alt="Banner"
            />

            <div
                style={{
                    position: 'absolute',
                    top: '70%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', backgroundColor: 'transparent' }}>
                    {/* <CardPricing month={1} price={150}></CardPricing>
                    <CardPricing month={3} price={180}></CardPricing> */}
                    <PricingSection month={1} price={150}></PricingSection>
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
                            rules={[{ whitespace: true, required: true, message: "Please Input Name" }]}
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name={"email"}
                            rules={[{ whitespace: true, required: true, message: "Please Input Email" }]}
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
                        <Dragger {...props}>
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
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
};

export default Page;


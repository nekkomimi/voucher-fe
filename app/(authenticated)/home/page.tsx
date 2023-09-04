"use client";

import React, { useState } from "react";
import { Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message } from "antd";
import { store } from "#/store";
import type { UploadProps } from 'antd';

import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { sampleRepository } from "#/repository/sample";
import { useForm } from "antd/es/form/Form";

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
    const Pricing = () => {
        return (
            <div className="bg-gray-100 py-16">
                <div className="container mx-auto">
                    <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
                        Choose a Plan
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center items-center">
                        {/* Pricing Card 1 */}
                        <div className="bg-white shadow-lg p-6 rounded-lg m-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Basic</h2>
                            <p className="text-gray-600 mb-4">Perfect for individuals</p>
                            <p className="text-3xl font-semibold text-gray-800 mb-4">$10/month</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                                Choose Plan
                            </button>
                        </div>

                        {/* Pricing Card 2 */}
                        <div className="bg-white shadow-lg p-6 rounded-lg m-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Pro</h2>
                            <p className="text-gray-600 mb-4">For small businesses</p>
                            <p className="text-3xl font-semibold text-gray-800 mb-4">$25/month</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                                Choose Plan
                            </button>
                        </div>

                        {/* Pricing Card 3 */}
                        <div className="bg-white shadow-lg p-6 rounded-lg m-4">
                            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Enterprise</h2>
                            <p className="text-gray-600 mb-4">For large organizations</p>
                            <p className="text-3xl font-semibold text-gray-800 mb-4">$50/month</p>
                            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full">
                                Choose Plan
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };


    return (
        <div style={{ position: 'relative' }}>
            <img
                src="https://img.freepik.com/free-vector/gradient-abstract-geometric-background_23-2149120339.jpg?w=1380&t=st=1693850816~exp=1693851416~hmac=95c921b632e7762432db98a73db5b93b00cdeaa4395b57cdb2e3264fff440a20"
                style={{ width: '100%' }}
                alt="Banner"
            />
            <div
                style={{
                    position: 'absolute',
                    top: '60%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                }}
            >
                <div className="flex flex-col md:flex-row justify-center items-center gap-x-10">
                    <Button style={{
                        height: '300px',
                        width: '450px',
                        backgroundColor: 'blue',
                        borderWidth: 3,
                        borderColor: 'black',
                        borderRadius: 19,
                    }} onClick={() => {
                        handleModalOpen()
                    }}>
                        <div className="bg-transparent p-6 rounded-lg m-4">
                            <h2 className="text-5xl font-semibold text-black-800 mb-4">Basic</h2>
                            <p className="text-black-600 mb-4 text-3xl">1 Month Subscribe</p>
                            <Divider style={{
                                height: '3px',
                                backgroundColor: 'black'
                            }}></Divider>
                            <p className="text-4xl font-semibold text-black-800 mb-4">100K</p>
                        </div>
                    </Button>
                    <Button style={{
                        height: '300px',
                        width: '450px',
                        backgroundColor: 'orange',
                        borderWidth: 3,
                        borderColor: 'black',
                        borderRadius: 19,
                    }} onClick={() => {
                        handleModalOpen()
                    }}>
                        <div className="bg-transparent p-6 rounded-lg m-4">
                            <h2 className="text-5xl font-semibold text-black-800 mb-4">Pro</h2>
                            <p className="text-black-600 mb-4 text-3xl">3 Month Subscribe</p>
                            <Divider style={{
                                height: '3px',
                                backgroundColor: 'black'
                            }}></Divider>
                            <p className="text-4xl font-semibold text-black-800 mb-4">180K</p>
                        </div>
                    </Button>
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
                        <Form.Item
                            label="Payment Method"
                            name={"payment"}
                        >
                            <div>
                                <p>Bank Mandiri | A.N Nugroho Kuncoro Adi | 1590902905920</p>
                            </div>
                        </Form.Item>
                        <Form.Item label={"Invoice"}>
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
};

export default Page;


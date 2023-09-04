"use client";

import React, { useState } from "react";
import { Button, Card, Modal, Form, Radio, Input, Col } from "antd";
import { store } from "#/store";
import { MinusOutlined, SearchOutlined } from "@ant-design/icons";
import { sampleRepository } from "#/repository/sample";
import { useForm } from "antd/es/form/Form";

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
                src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
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
                <Button style={{
                    scale: 2
                }} onClick={() => {
                    handleModalOpen()
                }}>Setup your plan</Button>
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
                        <div className="flex flex-row gap-2">
                            <Col span={12}>
                                <Form.Item
                                    label="NIK/NPWP"
                                    name={"npwp"}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please Input NIK/NPWP!",
                                        },
                                        {
                                            pattern: new RegExp("^[0-9]*$"),
                                            message: "Can't contain letter and symbol",
                                        },
                                    ]}
                                >
                                    <Input type="text" placeholder="NPWP Number" maxLength={16} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
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
                            </Col>
                        </div>
                        <Form.Item
                            label="Address"
                            name={"address"}
                            rules={[{ whitespace: true, required: true, message: "Please Input Address!" }]}
                        >
                            <Input.TextArea placeholder="Customer Address" />
                        </Form.Item>
                        <Form.Item
                            name={"pkp"}
                            label="Company Type"
                            rules={[
                                {
                                    required: true,
                                    message: "Please Select Company Type!",
                                },
                            ]}
                        >
                            <Radio.Group>
                                <Radio value={true}>PKP</Radio>
                                <Radio value={false}>NON PKP</Radio>
                            </Radio.Group>
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


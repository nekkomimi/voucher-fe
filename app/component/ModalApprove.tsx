"use client";
import React, { useEffect } from "react";
import { Modal, Button, Form, Input, Card, Col, notification, Table } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { transactionRepository } from "#/repository/transaction";
import { convertRupiah } from "#/utils/convert_rupiah";

const ModalApprove = (props: any) => {
    const { data, isLoading } = transactionRepository.hooks.useFindOneTransaction(props?.selectedId);
    const [form] = Form.useForm();
    form.setFieldsValue({
        name: data?.body?.data?.name,
        email: data?.body?.data?.email,
        phone_number: data?.body?.data?.phone_number,
        total: convertRupiah(data?.body?.data?.total),
        referral_code: data?.body?.data?.referral_code,
        fee: convertRupiah(data?.body?.data?.fee)
    })

    const column: any = [
        {
            title: 'Code',
            dataIndex: 'voucher',
            key: 'voucher',
            render: (text: any) => text.code
        },
        {
            title: 'Subtotal',
            dataIndex: 'subtotal',
            key: 'subtotal',
            render: (text: any) => convertRupiah(text)
        }
    ]

    const handleApprove = async () => {
        try {
            await transactionRepository.api.approveTransaction(props?.selectedId);
            notification.success({
                message: 'Success approve this transaction'
            });
        } catch (error: any) {
            notification.error({
                message: error?.response?.body?.error
            })
        } finally {
            props?.handleCloseModalApprove()
            form.resetFields()
        }
    }
    return (
        <Modal
            open={props?.visibleModalApprove}
            title="Approve Transaction"
            onCancel={props?.handleCloseModalApprove}
            centered
            width={600}
            bodyStyle={{
                height: 500,
                overflowX: 'scroll'
            }}
            footer={[
                <Button key="cancel" onClick={() => {
                    props?.handleCloseModalApprove()
                    form.resetFields()
                }}>
                    Cancel
                </Button>,
                <Button
                    key="approve"
                    type="primary"
                    onClick={() => {
                        handleApprove()
                        form.resetFields()
                    }}
                >
                    Approve
                </Button>,
            ]}
        >
            <Card className="custom-card">
                <Form layout="vertical" requiredMark={false} form={form}>
                    <Form.Item
                        label="Name"
                        name={"name"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Email"
                        name={"email"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Phone Number"
                        name={"phone_number"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Fee"
                        name={"fee"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Total"
                        name={"total"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Referral Code"
                        name={"referral_code"}
                    >
                        <Input disabled style={{
                            backgroundColor: 'transparent',
                            color: 'black'
                        }}></Input>
                    </Form.Item>
                    <Form.Item
                        label="Voucher"
                        name={"voucher"}
                    >
                        <Table columns={column} dataSource={data?.body?.data?.transaction_items} pagination={false}></Table>
                    </Form.Item>
                </Form>
            </Card>
        </Modal>
    );
};
export default ModalApprove;

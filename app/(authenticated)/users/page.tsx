'use client'

import {Button, Card, Form, Input, Modal, notification, Table} from "antd";
import ModalDetailTransaction from "#/app/component/ModalDetail";
import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {usersRepository} from "#/repository/users";
import {AiFillFileAdd, AiOutlinePlus} from "react-icons/ai";

const Users = () => {
    const [form] = Form.useForm()
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [selectedId, setSelectedId] = useState('')

    const {data, mutate} = usersRepository.hooks.useFindUsers(page, pageSize);

    const handleSubmit = async () => {
        const formData = await form.validateFields()
        console.log(formData)
        const data = {
            ...formData
        }
        try {
            const response = await usersRepository.api.createUsers(data)

            if (response.status === 201) {
                notification.success({
                    message: 'Success Add Users'
                });
            }
        }catch (e: any) {
            notification.error({
                message: e.response?.error
            })
        } finally {
            await mutate()
            setIsModalOpen(false)
        }
    }

    const handleRemove = async (id: string) => {
        // setIsModalDeleteOpen(true)
        try {
            const response = await usersRepository.api.deleteUsers(id);
            if (response.status === 200) {
                notification.success({
                    message: 'Success delete users'
                })
            }
        }catch (e: any) {
            notification.error({
                message: e?.response?.error
            })
        }finally {
            await mutate()
            setIsModalDeleteOpen(false)
        }
    }

    const columns: ColumnsType<any> = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 70,
            align: 'center',
            render: (text: string, record: any, index: number) => (page - 1) * pageSize + index + 1
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Created At',
            dataIndex: 'createdAt',
            key: 'createdAt',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            width: 150,
            render: (text: any, record: any) => {
                return (
                    <div>
                        <Button type={'primary'} danger onClick={() => {
                            setSelectedId(record?.id)
                            setIsModalDeleteOpen(true)
                        }}>Delete</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <p className="font-semibold text-xl mb-2 lg:mb-0">Users</p>
                <Button type={'primary'} icon={<AiOutlinePlus />} onClick={() => {
                    setIsModalOpen(true)
                }}>Add Users</Button>
            </div>
            <Table columns={columns} dataSource={data?.body?.data?.data} pagination={{
                pageSize: pageSize,
                current: page,
                onChange: (page, pageSize) => {
                    setPage(page);
                    setPageSize(pageSize)
                },
                total: 10,
            }} scroll={{ y: 700 }} />
            <Modal centered open={isModalOpen} onCancel={() => {
                setIsModalOpen(false)
            }} closable={false} onOk={handleSubmit}>
                <Card title={'Add Users'}>
                    <Form form={form} layout={'vertical'}>
                        <Form.Item label={'Email'} name={'email'}>
                            <Input />
                        </Form.Item>
                        <Form.Item label={'Password'} name={'password'}>
                            <Input />
                        </Form.Item>
                    </Form>
                </Card>
            </Modal>
            <Modal open={isModalDeleteOpen} onCancel={() => setIsModalDeleteOpen(false)} onOk={() => handleRemove(selectedId)}>
                <Card title={'Delete Users'}>
                    <p>Are you sure you want to delete this user?</p>
                </Card>
            </Modal>
        </div>
    );
}

export default Users;

'use client'

import {Button, Table} from "antd";
import ModalDetailTransaction from "#/app/component/ModalDetail";
import React, {useState} from "react";
import {ColumnsType} from "antd/es/table";
import {usersRepository} from "#/repository/users";

const Users = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const {data} = usersRepository.hooks.useFindUsers(page, pageSize)
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
                        <Button type={'primary'}>Detail</Button>
                    </div>
                )
            }
        }
    ]
    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <p className="font-semibold text-xl mb-2 lg:mb-0">Users</p>
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
            {/*<ModalDetailTransaction*/}
            {/*    form={form}*/}
            {/*    formFields={modalPropsData}*/}
            {/*    formData={modalData}*/}
            {/*    isOpen={isModalDetailOpen}*/}
            {/*    title={'Transaction Detail'}*/}
            {/*    withTable={true}*/}
            {/*    tableData={tableData}*/}
            {/*    tableColumn={tableColumn}*/}
            {/*    handleCancelModal={handleCloseModalDetail}*/}
            {/*></ModalDetailTransaction>*/}
        </div>
    );
}

export default Users;

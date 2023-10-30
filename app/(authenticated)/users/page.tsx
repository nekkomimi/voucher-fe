'use client'

import { usersRepository } from "#/repository/users";
import { Button, Table } from "antd";
import { useState } from "react";

const Users = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { data: usersData } = usersRepository.hooks.useFindUsers(page, pageSize);

    const handleOpenModalDetail = (id: string) => {
        return;
    }

    const columns = [
        {
            title: 'No',
            dataIndex: 'no',
            key: 'no',
            width: 100,
            align: 'center',
            render: (text: string, record: any, index: number) => (page - 1) * pageSize + index + 1
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: any) => text.replace('_', ' ').toUpperCase()
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (text: any, record: any) => {
              return (
                  <div>
                    <Button type={'primary'} onClick={() => handleOpenModalDetail(record?.id)}>Detail</Button>
                  </div>
              )
            }
          }
    ]

    return (
        <div>
            <div className="flex flex-col lg:flex-row justify-between mb-5">
                <p className="font-semibold text-xl mb-2 lg:mb-0">Transaction</p>
            </div>
            <Table columns={columns} dataSource={usersData?.body?.data?.data} pagination={{ pageSize: 10 }} scroll={{ y: 700 }} />
            {/* <ModalDetailTransaction
          form={form}
          formFields={modalPropsData}
          formData={modalData}
          isOpen={isModalDetailOpen}
          title={'Transaction Detail'}
          withTable={true}
          tableData={tableData}
          tableColumn={tableColumn}
          handleCancelModal={handleCloseModalDetail}
      ></ModalDetailTransaction> */}
        </div>
    )
};

export default Users;
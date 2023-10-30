'use client'

import { Button, Table } from "antd";
import ModalReject from "#/app/component/ModalReject";
import ModalApprove from "#/app/component/ModalApprove";
import React, { useState } from "react";
import { voucherRepository } from "#/repository/voucher";
import ModalDetail from "#/app/component/ModalDetail";

const Voucher = () => {
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [type, setType] = useState('1')
    const [status, setStatus] = useState('')
    const [isModalDetailOpen, setModalDetailOpen] = useState(false)
    const [modalData, setModalData] = useState({})
    const [modalPropsData, setModalPropsData] = useState([]);
    const { data: voucherData } = voucherRepository.hooks.useFindVoucher(page, pageSize, type, status);
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
            title: 'Code',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: 'Type',
            dataIndex: 'type',
            key: 'type',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
            render: (text: string) => text.toUpperCase()
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
                <p className="font-semibold text-xl mb-2 lg:mb-0">Voucher</p>
            </div>
            <Table columns={columns} dataSource={voucherData?.body?.data?.data}
                pagination={{
                    onChange: (page, pageSize) => {
                        setPage(page)
                        setPageSize(pageSize)
                    },
                    total: voucherData?.body?.data?.count,
                    current: page,
                    pageSize
                }} scroll={{ y: 700 }} />
            <ModalDetail></ModalDetail>
        </div>
    )
}

export default Voucher;

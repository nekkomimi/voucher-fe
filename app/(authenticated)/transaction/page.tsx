"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Form, Table, Space, Image, message, DatePicker, Select } from "antd";
import { store } from "#/store";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { TokenUtil } from "#/utils/token";
import { transactionRepository } from "#/repository/transaction";
import { format, parseISO, isBefore } from "date-fns";
import { enUS } from "date-fns/locale";
import ModalConfirmSave from "#/app/component/ModalApprove";
import ModalReject from "#/app/component/ModalReject";
import ModalApprove from "#/app/component/ModalApprove";

const Page = () => {
  const [form] = Form.useForm();
  const [transactionData, setTransactionData] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [visibleModalApprove, setVisibleModalApprove] = useState(false);
  const [visibleModalReject, setVisibleModalReject] = useState(false);
  const [selectedId, setSelectedId] = useState(undefined)


  const { data: dataTransation, isLoading, mutate } = transactionRepository.hooks.useTransaction()

  const handleOpenModalReject = () => {
    setVisibleModalReject(true)
  }

  const handleCloseModalReject = async () => {
    setVisibleModalReject(false)
    await mutate()
  }

  const handleOpenModalApprove = () => {
    setVisibleModalApprove(true)
  }

  const handleCloseModalApprove = async () => {
    setVisibleModalApprove(false)
    await mutate()
  }

  const modalPropsReject = {
    selectedId,
    visibleModalReject,
    handleOpenModalReject,
    handleCloseModalReject,
    mutate
  }

  const modalPropsApprove = {
    selectedId,
    visibleModalApprove,
    setVisibleModalApprove,
    handleOpenModalApprove,
    handleCloseModalApprove
  }

  const columns: any = [
    {
      title: 'Transaction Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      render: (text: any) =>
        format(parseISO(text), " d MMMM yyyy", {
          locale: enUS,
        }),
      sorter: (a: any, b: any) => (isBefore(new Date(a.transaction_date), new Date(b.transaction_date)) ? -1 : 1),
    },
    {
      title: 'Transaction Number',
      dataIndex: 'transaction_number',
      key: 'transaction_number',
    },
    {
      title: 'Voucher Code',
      dataIndex: 'voucher',
      key: 'voucher',
      render: (text: any) => text.code
    },
    {
      title: 'Payment Receipt',
      dataIndex: 'payment_receipt',
      key: 'payment_receipt',
      render: (text: any, record: any) => {
        return (
          <Image src={text} width={70} height={70}></Image>
        )
      }
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => text.replace('_', ' ').toUpperCase()
    },
    {
      title: 'Reject Reason',
      dataIndex: 'reject_reason',
      key: 'reject_reason',
      render: (text: any) => text ?? 'None'
    },
    {
      title: 'Action',
      key: 'aksi',
      render: (text: any, record: any) => (
        <Space size="small">
          <Button icon={<CheckOutlined />} type="primary" onClick={() => {
            setSelectedId(record?.id)
            setVisibleModalApprove(true)
          }}>
            Accept
          </Button>
          <Button icon={<CloseOutlined />} danger onClick={() => {
            setSelectedId(record?.id)
            setVisibleModalReject(true)
          }}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mb-5">
        <p className="font-semibold text-xl mb-2 lg:mb-0">Transaction</p>
      </div>
      <Table columns={columns} dataSource={dataTransation?.body?.data?.data} size="small" pagination={{ pageSize: 10 }} scroll={{ y: 700 }} />
      <ModalReject {...modalPropsReject}></ModalReject>
      <ModalApprove {...modalPropsApprove}></ModalApprove>
    </div>
  );
};

export default Page;
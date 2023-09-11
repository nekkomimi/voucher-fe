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
import page from "../about/page";
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

  const columns = [
    {
      title: "NO",
      key: "number",
      dataIndex: "number",
      width: "3%",
      align: "center",
      className: "font-semibold",
      render: (value, item, index) =>
        page === 1 ? index + 1 : (page - 1) * pageSize + (index + 1),
    },
    {
      title: 'Transaction Number',
      dataIndex: 'transaction_number',
      key: 'transaction_number',
    },
    {
      title: 'Transaction Date',
      dataIndex: 'transaction_date',
      key: 'transaction_date',
      render: (text) =>
        format(parseISO(text), " d MMMM yyyy", {
          locale: enUS,
        }),
      sorter: (a: any, b: any) => (isBefore(new Date(a.transaction_date), new Date(b.transaction_date)) ? -1 : 1),
    },
    {
      title: 'Voucher Code',
      dataIndex: 'voucher',
      key: 'voucher',
      render: (text) => text.code
    },
    {
      title: 'Payment Receipt',
      dataIndex: 'payment_receipt',
      key: 'payment_receipt',
      render: (text: any, record: any) => {        
        return (
          <Image src={text} width={100} height={100}></Image>
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
      render: (text) => text ?? 'None'
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

  const [acceptModalVisible, setAcceptModalVisible] = useState(false);
  const [rejectModalVisible, setRejectModalVisible] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState<{
    key: string;
    nama: string;
  } | null>(null);

  const showAcceptModal = (record: any) => {
    setSelectedPayment(record);
    setAcceptModalVisible(true);
  };

  const showRejectModal = (record: any) => {
    setSelectedPayment(record);
    setRejectModalVisible(true);
  };

  const handleAccept = () => {
    // Implement logic for accepting the payment with the selectedPayment data
    // console.log(`Menerima pembayaran dengan kunci: ${selectedPayment.key}`);
    setAcceptModalVisible(false);
  };

  const handleReject = () => {
    // Implement logic for rejecting the payment with the selectedPayment data
    // console.log(`Menolak pembayaran dengan kunci: ${selectedPayment.key}`);
    setRejectModalVisible(false);
  };


  return (
    <div>
      <div className="flex justify-between mb-5">
        <p className="font-semibold text-xl">Transaction</p>
      </div>
      <Table columns={columns} dataSource={dataTransation?.body?.data?.data} />
      <ModalReject {...modalPropsReject}></ModalReject>
      <ModalApprove {...modalPropsApprove}></ModalApprove>
    </div>
  );
};

export default Page;
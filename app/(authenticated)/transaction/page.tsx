"use client";

import React, { useEffect, useState } from "react";
import {Button, Card, Modal, Form, Table, Space, Image, message, DatePicker, Select, notification} from "antd";
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
import {convertRupiah} from "#/utils/convert_rupiah";
import ModalDetailTransaction from "#/app/component/ModalDetail";
import {ColumnsType} from "antd/es/table";

const Page = () => {
  const [form] = Form.useForm();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [status, setStatus] = useState('')
  const [isModalDetailOpen, setModalDetailOpen] = useState(false)
  const [modalData, setModalData] = useState(null)
  const [modalPropsData, setModalPropsData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  const { data: dataTransation, isLoading, mutate } = transactionRepository.hooks.useTransaction(page, pageSize, status);

  const handleOpenModalDetail = async (id: string) => {
    try {
      const response = await transactionRepository.api.findOneTransaction(id);
      const responseData = response.body?.data
      const propsDataFields = [
        {name: 'first_name', label: 'First Name'},
        {name: 'last_name', label: 'Last Name'},
        {name: 'email', label: 'Email'},
        {name: 'phone_number', label: 'Phone Number'},
        {name: 'unique_code', label: 'Unique Code'},
        {name: 'payment_method', label: 'Payment Method'},
        {name: 'payment_channel', label: 'Payment Channel'},
        {name: 'expired_date', label: 'Expired Date'},
        {name: 'paid_at', label: 'Paid At'},
        {name: 'total', label: 'Total'},
      ];
      form.setFieldsValue({
        'first_name' : responseData.first_name,
        'last_name' : responseData.last_name,
        'email' : responseData.email,
        'phone_number' : responseData.phone_number,
        'unique_code' : convertRupiah(+responseData.fee),
        'payment_method' : responseData.payment_method,
        'payment_channel' : responseData.payment_channel,
        'expired_date' : responseData.expired_date,
        'paid_at' : responseData.paid_at,
        'total' : convertRupiah(+responseData.total)
      })

      const tableColumn = [
        {
          title: 'Code',
          dataIndex: 'voucher',
          key: 'code',
          render: (text:any) => {
            return text?.code
          }
        },
        {
          title: 'Type',
          dataIndex: 'voucher',
          key: 'code',
          render: (text:any) => text?.type === "1" ? 'GOLD' : 'DIAMOND'
        }
      ];
      setModalData(responseData)
      setModalPropsData(prevState => (propsDataFields as never[]))
      setTableColumn(prevState => (tableColumn as never[]))
      setTableData(prevState => (responseData?.transaction_items))
      setModalDetailOpen(true)
    } catch (e:any) {
      console.log(e.response)
      notification.error({
        message: e?.response?.error
      })
    }
  }

  const handleCloseModalDetail = () => {
    form.resetFields()
    setModalDetailOpen(false)
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
      title: 'Transaction Number',
      dataIndex: 'transaction_number',
      key: 'transaction_number',
    },
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
      title: 'Email',
      dataIndex: 'email',
      key: 'Email',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (text: any) => text.replace('_', ' ').toUpperCase(),
      filters: [
        {
          text: 'PAID',
          value: 'PAID',
        },
        {
          text: 'EXPIRED',
          value: 'EXPIRED',
        },
        {
          text: 'PENDING',
          value: 'PENDING',
        },
      ],
      defaultFilteredValue: ['PENDING', 'EXPIRED', 'PAID']
    },
    {
      title: 'Unique Code',
      dataIndex: 'fee',
      key: 'fee',
      render: (text: any) => convertRupiah(text)
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text: any, record: any) => {
        return convertRupiah(text)
      }
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
  ];

  return (
    <div>
      <div className="flex flex-col lg:flex-row justify-between mb-5">
        <p className="font-semibold text-xl mb-2 lg:mb-0">Transaction</p>
      </div>
      <Table columns={columns} dataSource={dataTransation?.body?.data?.data} pagination={{
        pageSize: pageSize,
        current: page,
        onChange: (page, pageSize) => {
          setPage(page);
          setPageSize(pageSize)
        },
        total: dataTransation?.body?.data?.count,
      }} scroll={{ y: 700 }} onChange={(pagination, filters, sorter, extra) => {
        if (filters.status) {
          setStatus(filters.status.join(','))
        }
      }}/>
      <ModalDetailTransaction
          form={form}
          formFields={modalPropsData}
          formData={modalData}
          isOpen={isModalDetailOpen}
          title={'Transaction Detail'}
          withTable={true}
          tableData={tableData}
          tableColumn={tableColumn}
          handleCancelModal={handleCloseModalDetail}
      ></ModalDetailTransaction>
    </div>
  );
};

export default Page;

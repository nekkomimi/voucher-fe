"use client";

import React, { useState } from "react";
import { Button, Card, Modal, Form, Table, Space, Image, message, DatePicker, Select } from "antd";
import { store } from "#/store";
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';

const { RangePicker } = DatePicker;
const { Option } = Select;

const data = [
    {
      key: '1',
      nama: 'John Doe',
      email: 'johndoe@example.com',
      tanggalTransaksi: '2023-09-15',
      status: 'Receive',
      buktiPembayaran: (
        <Image
          src="https://img.freepik.com/free-vector/gradient-abstract-geometric-background_23-2149120339.jpg?w=1380&t=st=1693850816~exp=1693851416~hmac=95c921b632e7762432db98a73db5b93b00cdeaa4395b57cdb2e3264fff440a20" // Ganti dengan path gambar bukti pembayaran
          alt="Bukti Pembayaran"
          width={100}
          height={100}
        />
      ),
    },
    {
      key: '2',
      nama: 'Jane Smith',
      email: 'janesmith@example.com',
      tanggalTransaksi: '2023-09-10',
      status: 'Reject',
      buktiPembayaran: (
        <Image
          src="https://img.freepik.com/free-vector/gradient-abstract-geometric-background_23-2149120339.jpg?w=1380&t=st=1693850816~exp=1693851416~hmac=95c921b632e7762432db98a73db5b93b00cdeaa4395b57cdb2e3264fff440a20" // Ganti dengan path gambar bukti pembayaran
          alt="Bukti Pembayaran"
          width={100}
          height={100}
        />
      ),
    },
  ];

const Page = () => {
    const [form] = Form.useForm();
    
    const columns = [
        {
          title: 'Name',
          dataIndex: 'nama',
          key: 'nama',
        },
        {
          title: 'Email',
          dataIndex: 'email',
          key: 'email',
        },
        {
            title: 'Transaction Date',
            dataIndex: 'tanggalTransaksi',
            key: 'tanggaTransaksi',
            sorter: (a: any, b: any) => a.tanggalTransaksi.localeCompare(b.tanggalTransaksi),
            
        },
        {
          title: 'Payment Receipt',
          dataIndex: 'buktiPembayaran',
          key: 'buktiPembayaran',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
          },
        {
          title: 'Action',
          key: 'aksi',
          render: (text: any, record: any) => (
            <Space size="small">
                <Button icon={<CheckOutlined />} type="primary" onClick={() => showAcceptModal(record)}>
                Accept
                </Button>
                <Button icon={<CloseOutlined />} danger onClick={() => showRejectModal(record)}>
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
                <p className="font-semibold text-xl">Transaksi</p>
                <Button>Export</Button>
            </div>
            <Table columns={columns} dataSource={data} />

            <Modal
                title={`Menerima Transaksi dari ${selectedPayment?.nama}`}
                visible={acceptModalVisible}
                onOk={handleAccept}
                onCancel={() => setAcceptModalVisible(false)}
                okText="Terima"
                cancelText="Batal"
            >
                Apakah Anda yakin ingin menerima transaksi ini?
            </Modal>

            {/* Modal untuk Menolak Transaksi */}
            <Modal
                title={`Menolak Transaksi dari ${selectedPayment?.nama}`}
                visible={rejectModalVisible}
                onOk={handleReject}
                onCancel={() => setRejectModalVisible(false)}
                okText="Tolak"
                cancelText="Batal"
            >
                Apakah Anda yakin ingin menolak transaksi ini?
            </Modal>
        </div>
    );
};

export default Page;


"use client";

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message, Row, Carousel, notification } from 'antd';
import { MinusOutlined, SearchOutlined, InboxOutlined, UploadOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useForm } from "antd/es/form/Form";
import type { UploadProps } from 'antd';
import Image from 'next/image';
import Banner from '../public/images/Banner.jpg'
import Success from "#/public/icon/success.png";
import DiamondButton from '#/public/images/DiamondButton.jpg'
import GoldButton from '#/public/images/GoldButton.jpg'
import BannerSlider from '#/public/images/BannerSlider.jpg'
import Poster from '#/public/images/Poster.jpg'
import type { UploadFile } from 'antd/es/upload/interface';
import { transactionRepository } from '#/repository/transaction';
import { config } from '#/config/app';
import FormModal from './component/FormModal';
import SuccessModal from './component/SuccessModal';


export default function Home() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [voucherType, setVoucherType] = useState("1");
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 900) + 100);
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps['onChange'] = (info) => {
    let newFileList = [...info.fileList];
    newFileList = newFileList.slice(-2);
    newFileList = newFileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(newFileList);
  };

  const propsUploadFile = {
    action: `${config.baseUrl}/file/upload?type=payment_receipt`,
    onChange: handleChange,
    multiple: true,
    fileList: fileList
  };



  const handleModalOpen = () => {
    setIsModalOpen(true)
  };

  const handleSaveModal = async () => {
    try {
      const value = await form.validateFields();
      const data = {
        ...value,
        voucher_type: voucherType,
        payment_receipt: fileList[0].response.data.url,
        fee: randomNumber.toString()
      };
      const result = await transactionRepository.api.createTransaction(data);
      if (result.status === 201) {
        setIsModalOpen(false)
        setIsSuccessModalOpen(true)
        form.resetFields()
        setFileList([])
      } else {
        notification.error({
          message: result.body.error
        })
      }
    } catch (error: any) {
      notification.error({
        message: 'Please fill the form'
      })
    }
  }

  const copyToClipboard = () => {
    const el = document.createElement('textarea');
    el.value = '1590902905920'; // Ganti dengan nomor rekening yang ingin Anda salin
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
  };

  const handleCancelModal = () => {
    setIsModalOpen(false)
    form.resetFields();
    setFileList([])
  };

  const formModalProps = {
    handleCancelModal,
    isModalOpen,
    voucherType,
    randomNumber,
    copyToClipboard,
    handleSaveModal,
    propsUploadFile,
    form
  }

  const successModalProps = {
    isSuccessModalOpen,
    setIsSuccessModalOpen
  }

  return (
    <div className='mx-auto w-screen h-screen bg-black relative'>
      <div className='max-w mx-auto'>
        <Carousel autoplay>
          {new Array(3).fill(1).map((it, idx) => {
            return (
              <Image src={BannerSlider} alt='Banner' className='h-[250px] lg:h-[425px]'></Image>
            )
          })}
        </Carousel>
      </div>
      <div className='text-2xl lg:text-4xl text-white mt-1 flex items-center justify-center'>Choose Your Plan</div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-x-6 sm:gap-x-12 lg:gap-x-16'>
        <Image src={GoldButton} alt='GoldButton' className='h-[200px] w-[350px] lg:h-[244px] lg:w-[454px]' onClick={() => {
          setVoucherType("1")
          handleModalOpen()
        }}></Image>
        <Image src={DiamondButton} alt='DiamondButton' className='h-[200px] w-[350px] lg:h-[244px] lg:w-[454px]'  onClick={() => {
          setVoucherType("2")
          handleModalOpen()
        }}></Image>
      </div>
      <div className='flex flex-col md:flex-row justify-center items-center gap-x-5 sm:gap-x-10 lg:gap-x-16 gap-y-3 mt-2'>
        {new Array(5).fill(1).map((it, idx) => {
          return (
            <Image src={Poster} alt='Poster' className='w-[100px] h-[150px] lg:w-[200px] lg:h-[300px]' ></Image>
          )
        })}
      </div>
      <FormModal {...formModalProps}></FormModal>
      <SuccessModal {...successModalProps}></SuccessModal>
    </div>
    // <div className='w-screen h-screen bg-black justify-center items-center mx-auto'>

    //   {/* Carousel */}
    //   <div className='w-screen'>
    //     <Carousel autoplay>
    //       {new Array(3).fill(1).map((it, idx) => {
    //         return (
    //             <Image src={BannerSlider} alt='banner' className='h-[425px] sm:h-[300px] lg:h-[300px] xl:h-[225px]'></Image>
    //         )
    //       })}
    //     </Carousel>
    //   </div>
    //   <div className='text-4xl text-white mt-1 flex items-center justify-center'>Choose Your Plan</div>
    //   <div className='text-center'>
    //     <div className='flex flex-col md:flex-row justify-center items-center gap-x-6 sm:gap-x-12 lg:gap-x-16'>
    //       <Image src={GoldButton} alt='gold' className='w-[454px] h-[244px] xl:h-[150px] xl:w-[270px]' onClick={() => {
    //         setVoucherType("1")
    //         handleModalOpen();
    //       }}></Image>
    //       <Image src={DiamondButton} alt='diamond' className='w-[454px] h-[244px] xl:h-[150px] xl:w-[270px]' onClick={() => {
    //         setVoucherType("2")
    //         handleModalOpen();
    //       }}></Image>
    //     </div>
    //   </div>

    //   {/* Posters Section */}
    //   <div className='z-40 space-y-5 sm:space-y-10 text-center mt-5'>
    //     <div className='flex flex-col md:flex-row justify-center items-center gap-x-5 sm:gap-x-10 lg:gap-x-16 gap-y-3'>
    //       {new Array(5).fill(1).map((it, idx) => {
    //         return (<>
    //           <Image src={Poster} alt='Poster' className='w-[200px] h-[300px] xl:w-[130px] xl:h-[200px]'></Image>
    //         </>)
    //       })}
    //     </div>
    //   </div>
    // </div>
  )
}


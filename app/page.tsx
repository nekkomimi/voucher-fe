"use client";
import { cmsRepository } from "#/repository/cms";

{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message, Row, notification } from 'antd';
import Image from 'next/image';
import { transactionRepository } from '#/repository/transaction';
import FormModal from './component/FormModal';
import SuccessModal from './component/SuccessModal';
import { useSearchParams } from 'next/navigation'
import CiimaxIogo from "../public/images/Climax_Logo_Full.jpg"
import { Carousel } from 'react-bootstrap';
import ThumbnailPoster from '#/public/images/Thumbnail_Poster.jpg'
import ThumbnailPoster2 from '#/public/images/Thumbnail_Poster_2.jpg'
import ThumbnailPoster3 from '#/public/images/Thumbnail_Poster_3.jpg'
import Banner1 from '#/public/images/Banner_Promo_Prelaunch.jpg'
import Banner2 from '#/public/images/Banner_Promo_Prelaunch_2.jpg'
import Banner3 from '#/public/images/Banner_Promo_Prelaunch_3.jpg'
import Banner4 from '#/public/images/Banner_Promo_Prelaunch_4.jpg'
import GoldButton from '#/public/images/Voucher_Template_Gold_Marketplace.jpg';
import DiamondButton from '#/public/images/Voucher_Template_Diamond_Marketplace.jpg';
import Loading from "./component/Loading";

const dataPoster = [ThumbnailPoster, ThumbnailPoster2, ThumbnailPoster3]
const dataBanner = [Banner1, Banner2, Banner3, Banner4];
export default function Home() {
  const [form] = Form.useForm();
  const params = useSearchParams()

  const ref = params?.get('ref')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false)
  const [voucherType, setVoucherType] = useState("1");
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 900) + 100);

  const handleModalOpen = () => {
    setIsModalOpen(true)
  };

  const handleSaveModal = async () => {
    const value = await form.validateFields();
    setIsLoading(true)

    const data = {
      ...value,
      voucher_type: voucherType,
      fee: randomNumber.toString(),
      referral_code: ref ?? null
    };
23
    try {
      const result = await transactionRepository.api.createTransaction(data);
      if (result.status === 201) {
        setIsModalOpen(false)
        setIsLoading(false)
        form.resetFields()
        window.location = result.body?.data?.payment_url
      } else {
        setIsLoading(false)
        notification.error({
          message: result.body.error
        })
      }
    } catch (error: any) {
      setIsLoading(false)
      form.resetFields()
      notification.error({
        message: error.response.body.error
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancelModal = () => {
    setIsModalOpen(false)
    form.resetFields();
  };

  const formModalProps = {
    handleCancelModal,
    isModalOpen,
    voucherType,
    handleSaveModal,
    form,
    isLoading,
    setIsLoading,
  }

  const successModalProps = {
    isSuccessModalOpen,
    setIsSuccessModalOpen
  }


  return (
   <div>
     <div className='bg-black/90 min-h-screen' >
      <FormModal {...formModalProps}></FormModal>
      <SuccessModal {...successModalProps}></SuccessModal>
      <div onClick={() => {
        window.open('https://www.climaxmovie.com', '_blank')
      }}>
        <Carousel interval={1500} controls={false}>
          {dataBanner.map((banner) => (
            <Carousel.Item>
              <div>
                <Image src={banner} alt="Banner" width={1920} height={1080} />

              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
      <div className='max-w-screen-xl mx-auto p-4'>
        <div>
          <h1 className='text-white text-center font-bold'>Choose Your Plan</h1>
          <div className='flex justify-center items-center gap-4 pb-3'>
            <div className='w-96'> <Image src={GoldButton} alt='GoldButton' width={1080} height={1920} onClick={() => {
              setVoucherType("1")
              handleModalOpen()
            }} /></div>

            <div className='w-96'> <Image src={DiamondButton} alt='DiamondButton' width={1080} height={1920} onClick={() => {
              setVoucherType("2")
              handleModalOpen()
            }} /> </div>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:flex sm:justify-center sm:flex-wrap gap-8'>
          {
            dataPoster.map((imageUrl) => <div className='sm:w-52 xl:w-64 rounded-sm cursor-pointer' >
              <Image src={imageUrl} width={1920} height={1080} alt='Poster' className='rounded-lg' onClick={() => window.open('https://www.climaxmovie.com', '_blank')} />
            </div>)
          }
        </div>
      </div>
      <div>
      </div>
      <footer>
        <div className='flex flex-col xl:flex-row justify-between items-center'>
          <div></div>
          <div className='text-center xl:ml-28'>
            <p className='text-lg text-white'>Create Design With 💗</p>
          </div>
          <div className='w-28 p-2'>
            <Image src={CiimaxIogo} alt='CiimaxIogo' />
          </div>
        </div>
      </footer>
    </div>
   </div>
  )
}


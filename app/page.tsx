"use client";
{
  /* The following line can be included in your src/index.js or App.js file */
}
import 'bootstrap/dist/css/bootstrap.min.css';

import React, { useEffect, useState } from 'react';
import { render } from 'react-dom';
import { Button, Card, Modal, Form, Radio, Input, Col, Divider, Upload, message, Row, notification } from 'antd';
import Image from 'next/image';
import Banner from '../public/images/Banner.jpg'
import Success from "#/public/icon/success.png";
import DiamondButton from '#/public/images/Voucher_Template_Diamond_Marketplace.jpg'
import GoldButton from '#/public/images/Voucher_Template_Gold_Marketplace.jpg'
import Poster from '#/public/images/Poster.jpg'
import { transactionRepository } from '#/repository/transaction';
import FormModal from './component/FormModal';
import SuccessModal from './component/SuccessModal';
import { useSearchParams } from 'next/navigation'
import CiimaxIogo from "../public/images/Climax_Logo_Full.png"
import PenjaraHasratPoster from "#/public/images/Penjara_Hasrat Coming_Soon_2.jpg"
import SupirNgiluPoster from "#/public/images/Poster_Supir_Ngilu_Coming_Soon_B.jpg"
import NikmatLemburPoster from "#/public/images/Poster_Nikmat_Lembur_Coming_Soon_B.jpg"
import KamarSukaPoster from "#/public/images/Poster_Kamar_Suka_Coming_Soon_B.jpg"
import { Carousel } from 'react-bootstrap';
import BannerSlider from '#/public/images/Banner_Promo_Prelaunch.jpg'
import BannerSlider2 from '#/public/images/Banner_Promo_Prelaunch_2.jpg'
import ThumbnailPoster from '#/public/images/Thumbnail_Poster.jpg'
import ThumbnailPoster2 from '#/public/images/Thumbnail_Poster_2.jpg'



const dataPoster = [ThumbnailPoster, ThumbnailPoster2]


export default function Home() {
  const [form] = Form.useForm();
  const params = useSearchParams()

  const ref = params?.get('ref')
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [voucherType, setVoucherType] = useState("1");
  const [randomNumber, setRandomNumber] = useState(Math.floor(Math.random() * 900) + 100);

  const handleModalOpen = () => {
    setIsModalOpen(true)
  };

  const handleSaveModal = async () => {
    const value = await form.validateFields();
    console.log(value);


    const data = {
      ...value,
      voucher_type: voucherType,
      fee: randomNumber.toString(),
      referral_code: ref ?? null
    };
    const result = await transactionRepository.api.createTransaction(data);
    if (result.status === 201) {
      setIsModalOpen(false)
      form.resetFields()
      
      window.location = result.body?.data?.payment_url
    } else {
      console.log(result);

      notification.error({
        message: result.body.error
      })
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
    randomNumber,
    handleSaveModal,
    form
  }

  const successModalProps = {
    isSuccessModalOpen,
    setIsSuccessModalOpen
  }


  return (
    <div className='bg-black/90 min-h-screen' >
      <FormModal {...formModalProps}></FormModal>
      <SuccessModal {...successModalProps}></SuccessModal>
      <div onClick={() => {
        window.open('https://www.climaxmovie.com', '_blank')
      }}>
        <Carousel interval={1500}>
          <Carousel.Item >
            <div> <Image src={BannerSlider} alt='Banner' /></div>
          </Carousel.Item>
          <Carousel.Item >
            <div> <Image src={BannerSlider2} alt='Banner' /></div>
          </Carousel.Item>
        </Carousel>
      </div>
      <div className='max-w-screen-xl mx-auto p-4'>
        <div>
          <h1 className='text-white text-center font-bold'>Choose Your Plan</h1>
          <div className='flex justify-center items-center gap-4 pb-3'>
            <div className='w-96'> <Image src={GoldButton} alt='GoldButton' onClick={() => {
              setVoucherType("1")
              handleModalOpen()
            }} /></div>

            <div className='w-96'> <Image src={DiamondButton} alt='DiamondButton' onClick={() => {
              setVoucherType("2")
              handleModalOpen()
            }} /> </div>
          </div>
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-5 gap-4 justify-items-center'>
          {
            dataPoster?.map((imageUrl) => <div className='w-full rounded-sm cursor-pointer' >
              <Image src={imageUrl} alt='Poster' className='rounded-lg' onClick={() =>  window.open('https://www.climaxmovie.com', '_blank')}/>
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

  )
}


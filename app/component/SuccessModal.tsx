'use client'

import { Modal, Row, Col, Button } from "antd";
import Image from 'next/image';
import Success from "#/public/icon/success.png";

const SuccessModal = (props:any) => {
    return (
      <>
        <Modal
          open={props?.isSuccessModalOpen}
          footer={[
            <Row justify={"center"}>
              <Col>
                <Button type="primary" onClick={() => props?.setIsSuccessModalOpen(false)}>
                  Close
                </Button>
              </Col>
            </Row>,
          ]}
          width={"400px"}
          className="modal-delete text-center"
          onCancel={() => props?.setIsSuccessModalOpen(false)}
        >
          <div className="flex flex-col gap-4 justify-center items-center">
            <div className="flex justify-center items-center h-20 w-20 rounded-full bg-[#E0FFE8]">
              <Image src={Success} alt="trash" />
            </div>
            <div className="text-[18px] font-bold">Your transaction will be checked by our Admin</div>
            <div className="text-[14px] text-[#A6A6A6]">Please check your email inbox</div>
          </div>
        </Modal></>
    )
  }

export default SuccessModal;
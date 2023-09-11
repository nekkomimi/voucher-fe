"use client";
import React from "react";
import { Modal, Button, Form, Input, Card, Col, notification } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import { transactionRepository } from "#/repository/transaction";

const ModalApprove = (props: any) => {
    const handleApprove = async () => {
        try {
            const result = await transactionRepository.api.approveTransaction(props?.selectedId);
            notification.success({
                message: 'Success approve this transaction'
            });
        } catch (error: any) {
            console.log(error?.response?.body?.error);
            notification.error({
                message: error?.response?.body?.error
            })
        } finally {
            props?.handleCloseModalApprove()
        }
    }
    return (
        <Modal
            open={props?.visibleModalApprove}
            title="Approve Transaction"
            onCancel={props?.handleCloseModalApprove}
            centered
            footer={[
                <Button key="cancel" onClick={props?.handleCloseModalApprove}>
                    Cancel
                </Button>,
                <Button
                    key="approve"
                    type="primary"
                    onClick={() => {
                        // You can perform any necessary actions here, e.g., sending an approval request to the server
                        handleApprove() // Pass the form data to the parent component's callback function
                    }}
                >
                    Approve
                </Button>,
            ]}
        >
            {/* If you need to capture additional information, include form fields here */}
            {/* Example: 
      <input
        type="text"
        name="comment"
        placeholder="Enter approval comment"
        onChange={handleInputChange}
      />
      */}
            <p>Are you sure you want to approve this transaction?</p>
        </Modal>
    );
};
export default ModalApprove;

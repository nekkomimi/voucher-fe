'use client'
import { transactionRepository } from "#/repository/transaction";
import { Button, Col, Result, Row, Spin } from "antd";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const Loading = () => (
    <div
        style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 9999,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}
    >
        <div
            style={{
                backgroundColor: "#fff",
                padding: "20px",
                borderRadius: "5px",
                textAlign: "center",
                boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            }}
        >
            <Spin size="large" />
            <div style={{ marginTop: "10px" }}>Verifying Email...</div>
        </div>
    </div>
);

const PaymentStatus = () => {
    const searchParams = useSearchParams();
    const status = searchParams?.get("status");
    const xendit_invoice_id = searchParams?.get("xendit_invoice_id");
    const router = useRouter();

    useEffect(() => {
        const setExpired = async (xendit_invoice_id: string) => {
            const response = await transactionRepository.api.setExpiredTransaction(xendit_invoice_id)
            if (response.status === 200) {
                return;
            }
        }

        if (xendit_invoice_id) {
            setExpired(xendit_invoice_id)
        }
    }, [])

    return (
        status === 'success' ? (
            <Result
                status="success"
                title="Success in purchasing vouchers"
                subTitle="Please check your email inbox or your spam folder. You can redeem the voucher on https://www.climaxmovie.com"
                extra={
                  [
                    <Button
                    onClick={() => router.push('/')}
                  >
                    Back
                  </Button>,
                  <Button
                    type="primary"
                    className="antPrimaryButton"
                    onClick={() => window.open('https://www.climaxmovie.com')}
                  >
                    Reedem Now
                  </Button>
                  ]
                }
              />
        ) : (
            <Result
                status="error"
                title="Payment has expired"
                subTitle="Please create a new payment"
                extra={
                    <Button
                      type="primary"
                      className="antPrimaryButton"
                      onClick={() => router.push('/')}
                    >
                      Back
                    </Button>
                  }
              />
        )
    )
}

export default PaymentStatus;
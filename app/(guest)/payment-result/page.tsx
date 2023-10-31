'use client'
import { transactionRepository } from "#/repository/transaction";
import { convertRupiah } from "#/utils/convert_rupiah";
import { Button, Card, Col, Divider, Result, Row, Spin, Typography } from "antd";
import { format } from "date-fns";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const { Title, Text } = Typography;

interface Transaction {
  id: string;
  transaction_number: string;
  last_name: string;
  email: string;
  phone_number: string;
  fee: string;
  total: string;
  amount: string;
  transaction_items: {
    id: string;
    referral_code: string;
    voucher: {
      id: string;
      type: string;
      status: string;
      code: string,
    },
    subtotal: string
  }[],
  first_name: string,
  transaction_date: any
}

const PaymentStatus = () => {
  const searchParams = useSearchParams();
  const status = searchParams?.get("status");
  const ref_id = searchParams?.get("ref_id");
  const router = useRouter();
  const [transaction, setTransaction] = useState<Transaction | null>(null);

  useEffect(() => {
    const findOneByRefId = async (ref_id: string) => {
      const response = await transactionRepository.api.findOneByRefId(ref_id);
      if (response.status === 200) {
        setTransaction(response.body?.data);
      }
    }

    if (status === 'success' && ref_id) {
      findOneByRefId(ref_id);
    }
  }, [status, ref_id]);

  return (
    status === 'success' && transaction ? (
      <div className="">
        <Result
          status="success"
          title="Success in purchasing vouchers"
          subTitle="Please check your email inbox or your spam folder. You can redeem the voucher on https://www.climaxmovie.com"
          // extra={[
          //   <Button onClick={() => router.push('/')}>Back</Button>,
          //   <Button
          //     type="primary"
          //     className="antPrimaryButton"
          //     onClick={() => window.open('https://www.climaxmovie.com')}
          //   >
          //     Redeem Now
          //   </Button>
          // ]}
        >
        </Result>
        <div className="flex justify-center">
          <Card title="Transaction Summary" className="w-auto">
            <Text><strong>Transaction Date:</strong> {format(new Date(transaction?.transaction_date), 'yyyy-MM-dd')}</Text><br />
            <Text><strong>Transaction Number:</strong> {transaction?.transaction_number}</Text><br />
            <Text><strong>First Name:</strong> {transaction?.first_name}</Text><br />
            <Text><strong>Last Name:</strong> {transaction?.last_name}</Text><br />
            <Text><strong>Email:</strong> {transaction?.email}</Text><br />
            <Text><strong>Phone Number:</strong> {transaction?.phone_number}</Text><br />
            <Text><strong>Fee:</strong> {convertRupiah(+transaction?.fee)}</Text><br />
            <Text><strong>Total:</strong> {convertRupiah(+transaction?.total)}</Text><br />
            <Text><strong>Amount:</strong> {transaction?.amount}</Text><br />

            <Divider />
            <Title level={5}>Voucher</Title>
            <div>
              <ul>
                {transaction?.transaction_items.map((it) => (
                  <div>
                    <li><strong>Voucher Code:</strong> {it.voucher.code}</li>
                    <li><strong>Price:</strong> {convertRupiah(+it.subtotal)}</li>
                  </div>
                ))}
              </ul>
            </div>
          </Card>
        </div>
        <div className="flex justify-center mt-4 gap-x-2">
          <Button onClick={() => router.push('/')}>Back</Button>,
          <Button
            type="primary"
            className="antPrimaryButton"
            onClick={() => window.open('https://www.climaxmovie.com')}
          >
            Redeem Now
          </Button>
        </div>
      </div>
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
  );
}

export default PaymentStatus;
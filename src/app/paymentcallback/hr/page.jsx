'use client';

// Import necessary dependencies
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button, Result } from 'antd';
import useRedirectAfterSomeSeconds from './Redirect';
import { queryPayment } from '@/app/candidate/candidateServices';

// Component
const PaymentCallbackPage = () => {
  const searchParams = useSearchParams();

  const requestId = searchParams.get('requestId');
  const orderId = searchParams.get('orderId');

  const [payment, setPayment] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const { secondsRemaining } = useRedirectAfterSomeSeconds('/hr/purchases', 5);

  const fetchData = async () => {
    try {
      const data = await queryPayment(orderId, requestId);
      setPayment(data);
    } catch (error) {
      try {
        setErrorMessage(error.response.data);
      } catch (err) {
        setErrorMessage('Something went wrong');
      }
      console.error('PaymentCallbackPage error', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page-layout">
      <div className="page-layout__content">
        {errorMessage ? (
          <Result
            status="error"
            title="Submission Failed"
            subTitle={errorMessage}
            extra={[
              <Button type="primary" className="bg-blue-500" key="console">
                Go Console
              </Button>,
              <div key="2">
                Redirecting to homepage in
                {secondsRemaining} {secondsRemaining > 1 ? 'seconds' : 'second'}.
              </div>,
            ]}
          />
        ) : null}
        {payment?.momoResponse?.errorCode === 0 && (
          <Result
            status="success"
            title={payment?.momoResponse?.message}
            subTitle={payment?.momoResponse?.localMessage}
            extra={[
              <Button type="primary" className="bg-blue-500" key="console">
                Go Console
              </Button>,
              <div key="2">
                Redirecting to homepage in
                {secondsRemaining} {secondsRemaining > 1 ? 'seconds' : 'second'}.
              </div>,
              //   <Button key="buy">Buy Again</Button>,
            ]}
          />
        )}
      </div>
    </div>
  );
};

export default PaymentCallbackPage;

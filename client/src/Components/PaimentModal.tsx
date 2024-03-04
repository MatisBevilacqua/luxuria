import React from 'react';

interface PaymentModalProps {
  id: number;
  type: string;
  totalPrice: number;
}

const PaymentModal = ({ id, type, totalPrice }: PaymentModalProps) => {
  return (
    <div className="payment-modal">
      <h2>Payment Details</h2>
      <p>ID: {id}</p>
      <p>Type: {type}</p>
      <p>Total Price: {totalPrice}</p>
    </div>
  );
};

export default PaymentModal;

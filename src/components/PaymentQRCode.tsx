
import React from 'react';

interface PaymentQRCodeProps {
  amount: number;
  description: string;
}

const PaymentQRCode: React.FC<PaymentQRCodeProps> = ({ amount, description }) => {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-2">Scan & Pay</h3>
      <p className="text-gray-600 mb-4">Amount: ₹{amount.toFixed(2)}</p>
      
      <div className="qr-container mb-4">
        <img 
          src="https://upload.wikimedia.org/wikipedia/commons/d/d0/QR_code_for_mobile_English_Wikipedia.svg" 
          alt="Payment QR Code" 
          className="qr-code"
        />
        <div className="qr-overlay">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/7/71/UPI-Logo-vector.svg" 
            alt="UPI" 
            className="qr-logo"
          />
        </div>
      </div>
      
      <p className="text-sm text-center text-gray-500 mb-2">{description}</p>
      <p className="text-xs text-center text-gray-400">Scan with any UPI app (Google Pay, PhonePe, Paytm, etc.)</p>
      
      <div className="flex flex-wrap justify-center gap-3 mt-4">
        <img src="https://upload.wikimedia.org/wikipedia/commons/f/f2/Google_Pay_Logo.svg" alt="Google Pay" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/5/5f/PhonePe_Logo.svg" alt="PhonePe" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png" alt="Paytm" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/commons/e/e1/UPI-Logo-vector.svg" alt="UPI" className="h-6" />
      </div>
    </div>
  );
};

export default PaymentQRCode;

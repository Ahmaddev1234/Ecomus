import React from 'react';

const PaymentCancel = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-red-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Payment Cancelled</h1>
        <p className="text-gray-600 mt-2">
          Your payment has been cancelled. No amount was charged.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default PaymentCancel;

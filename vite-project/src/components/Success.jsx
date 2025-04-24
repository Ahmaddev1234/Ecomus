import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-4">
          <svg
            className="w-20 h-20 text-green-500"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2l4 -4m6 2a10 10 0 1 1 -20 0a10 10 0 0 1 20 0z"
            />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">Payment Successful</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your transaction has been completed.
        </p>
        <button
          onClick={() => window.location.href = "/"}
          className="mt-6 bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-6 rounded-xl transition duration-200"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;

import React from 'react';

const ExchangeCoin = () => {
  return (
    <div className="w-full rounded bg-white shadow px-6 py-4">
      <div className="flex justify-between">
        <div className="font-semibold">Portfolio</div>
        <div className="text-gray-6">
          Total value <span className="text-black font-semibold">$1000</span>
        </div>
      </div>
    </div>
  );
};

export default ExchangeCoin;

import React from "react";

const ExchangeCoin = () => {
  return (
    <div className="w-full rounded bg-white shadow px-6 py-4">
      <div className="font-semibold">Exchange Coins</div>

      <div className="py-4 flex flex-row items-center gap-6">
        <span>Sell</span>
        <span>
          <select className="focus:ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold">
            <option>Bitcoin</option>
            <option>Bitcoin</option>
            <option>Bitcoin</option>
          </select>
        </span>
        <span>
          <input className="bg-gray-100 px-2 py-2 focus:ring-1 ring-gray-300 focus:outline-none" placeholder="Enter Value"></input>
        </span>
      </div>
      <div className="py-4 flex flex-row items-center gap-6">
        <span>Buy</span>
        <span>
          <select className="focus:ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold">
            <option>Bitcoin</option>
            <option>Bitcoin</option>
            <option>Bitcoin</option>
          </select>
        </span>
        <span>
          <input className="bg-gray-100 px-2 py-2 focus:ring-1 ring-gray-300 focus:outline-none" placeholder="Enter Value"></input>
        </span>
      </div>
    </div>
  );
};

export default ExchangeCoin;

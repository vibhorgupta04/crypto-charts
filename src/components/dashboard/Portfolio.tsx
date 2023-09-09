import React from "react";
import { UserData } from "./Data";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js/auto";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const Portfolio = () => {
  const [user, setUser] = React.useState({
    // labels: UserData.map((data) => data.coin),
    datasets: [
      {
        label: "Value $",
        data: UserData.map((data) => data.value),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
          "rgba(255, 205, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(201, 203, 207, 0.2)",
        ],
        borderColor: [
          "rgb(255, 99, 132)",
          "rgb(153, 102, 255)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="w-full lg:w-2/5 rounded bg-white shadow px-4 py-6">
      <div className="flex justify-between">
        <div className="font-semibold">Portfolio</div>
        <div className="text-gray-6">
          Total value <span className="text-black font-semibold">$1000</span>
        </div>
      </div>
      <div className="mt-6">
        <div className="mb-4 flex justify-between flex-row gap-2 items-center text-sm">
          <div className="flex gap-2">
            <span className=" px-6 border-2 border-red-2 bg-red-3"></span>
            <span>Bitcoin</span>
          </div>
          <div className="flex gap-2">
            <span className=" px-6 border-2 border-blue-5 bg-blue-4"></span>
            <span>Ethereum</span>
          </div>
          <div className="flex gap-2">
            <span className="px-6 border-2 border-yellow-1 bg-yellow-2"></span>
            <span>Tether</span>
          </div>
        </div>
        <div className="mx-auto flex justify-center w-11/12">
          <Pie data={user} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;

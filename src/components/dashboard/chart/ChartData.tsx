import { useState } from 'react';
import { CalenderIcon } from '../../common/Icons';
import { UserData } from '../Data';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import ChartBarDropDown from './ChartBar';
import CryptoCurrencyDropDown from './CryptoCurrencyDropDown';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartData = () => {
  const chartTypeData = useSelector((state: any) => {
    return state.dropdown.chartData;
  });

  const [user, setUser] = useState({
    labels: UserData.map((data) => data.year),
    datasets: [
      {
        label: 'User Gained',
        data: UserData.map((data) => data.userGain),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)',
        ],
        borderColor: [
          'rgb(255, 99, 132)',
          'rgb(255, 159, 64)',
          'rgb(255, 205, 86)',
          'rgb(75, 192, 192)',
          'rgb(54, 162, 235)',
          'rgb(153, 102, 255)',
          'rgb(201, 203, 207)',
        ],
        borderWidth: 1,
      },
    ],
  });
  return (
    <div className="bg-white shadow rounded my-4 px-4 py-6">
      <div className="">
        <div className="md:flex items-center justify-end gap-8">
          <div className="flex flex-wrap gap-3 font-semibold ">
            <div className="rounded bg-gray-2 py-2 px-4 cursor-pointer">1D</div>
            <div className="rounded bg-blue-2 ring-2 ring-blue-3 text-blue-3 py-2 px-4 cursor-pointer">
              1W
            </div>
            <div className="rounded bg-gray-2 py-2 px-4 cursor-pointer">1M</div>
            <div className="rounded bg-gray-2 py-2 px-4 cursor-pointer">6M</div>
            <div className="rounded bg-gray-2 py-2 px-4 cursor-pointer">1Y</div>
            <div className="rounded bg-gray-2 py-2 px-4 cursor-pointer">
              <CalenderIcon fill="#5e6e88" />
            </div>
          </div>
          <div className="flex gap-1 md:gap-3 my-4 ">
            <CryptoCurrencyDropDown />
            <ChartBarDropDown />
          </div>
        </div>
        <div className="">
          {chartTypeData == 'Bar Chart' && <Bar data={user} />}
          {chartTypeData == 'Line Chart' && <Line data={user} />}
        </div>
      </div>
    </div>
  );
};

export default ChartData;

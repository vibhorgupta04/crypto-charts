import { useState, useEffect } from 'react';
import { CalenderIcon } from '../../common/Icons';
import { UserData } from '../Data';
import moment from 'moment';

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

  const coin = useSelector((state: any) => {
    return state.coin.coin;
  });

  const currencyData = useSelector((state: any) => {
    return state.dropdown.currencyCountry;
  });

  const cryptoData = useSelector((state: any) => {
    return state.api.cryptoData;
  });
  const [data, setData] = useState({});
  const formattedData: any = cryptoData?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const labelModified = `${coin} price in ${currencyData}`;
  const dataBar: any = {
    labels: formattedData
      ?.slice(formattedData.length - 300, formattedData.length + 1)
      .map(({ x }: any) => moment(x).format('DD-MMM-YYYY')),
    datasets: [
      {
        label: labelModified,
        data: formattedData,

        backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(75, 192, 192, 1)'],
        borderColor: 'rgba(255, 99, 132, 1)',
        barPercentage: 0,
        borderWidth: 0,
        barThickness: 0.1,
        minBarLength: 1.2,
        base: 5000,
      },
    ],
  };

  const optionsBar: any = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  };

  const [userLine, setUserLine] = useState({
    labels: formattedData?.map(({ x }: any) =>
      moment(x).format('DD-MMM-YY h:mm a')
    ),
    datasets: [
      {
        label: labelModified,
        data: formattedData,
        backgroundColor: ['#2962ff', '#555', '#4fff'],
        borderColor: '#2962ff',
        fill: '#2962ff',
        borderWidth: 1,
        barThickness: 1,
      },
    ],
  });

  const options: any = {
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const optionsLineMarker: any = {
    elements: {
      point: {
        radius: 1,
      },
    },
  };

  const optionsLine: any = {
    responsive: true,
    elements: {
      point: {
        radius: 5,
      },
    },
    interaction: {
      intersect: false,
      axis: 'y',
    },
    plugins: {
      title: {
        display: true,
        text: (ctx: any) =>
          'Step ' + ctx.chart.data.datasets[0].stepped + ' Interpolation',
      },
    },
  };

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
          {chartTypeData == 'Bar' && (
            <Bar data={dataBar} options={optionsBar} />
          )}
          {/* {chartTypeData == 'Bar' && <Line data={userLine} />} */}
          {chartTypeData == 'Line with Markers' && (
            <Line data={userLine} options={optionsLineMarker} />
          )}
          {chartTypeData == 'Line' && (
            <Line data={userLine} options={options} />
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartData;

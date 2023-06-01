import { useState, useEffect } from 'react';
import { CalenderIcon } from '../../common/Icons';
import { UserData } from '../Data';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import ChartBarDropDown from './ChartBar';
import CryptoCurrencyDropDown from './CryptoCurrencyDropDown';
import { days } from '../../../store';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartData = () => {
  const dispatch = useDispatch();

  // console.log('dispatch >>>', dispatch(days));
  console.log('days >>>', days);

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

  const formattedData: any = cryptoData?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const labelModified = `${coin} price in ${currencyData}`;

  const dataBar = {
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

  const userLine = {
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
  };

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

  const value: any = 1;
  const handleDropdownChangeChart = (value: any) => {
    // const chartValue: any = event.target.value;
    dispatch(days(value));
  };

  const DAY = useSelector((state: any) => {
    return state.dropdown.daySelected;
  });

  const array = [
    { value: 1, title: '1D' },
    { value: 7, title: '1W' },
    { value: 30, title: '1M' },
    { value: 90, title: '3M' },
    { value: 180, title: '6M' },
    { value: 364, title: '1Y' },
  ];

  return (
    <div className="bg-white shadow rounded my-4 px-4 py-6">
      <div className="">
        <div className="md:flex items-center justify-end gap-8">
          <div className="flex flex-wrap gap-3 font-semibold ">
            {array.map(({ value, title }: any) => (
              <button
                key={value}
                className={`rounded  py-2 px-4 ${
                  DAY === value
                    ? 'bg-blue-2 ring-2 ring-blue-3 text-blue-3'
                    : 'bg-gray-2'
                }`}
                onClick={() => dispatch(days(value))}
              >
                {title}
              </button>
            ))}
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-3 my-4 ">
            <CryptoCurrencyDropDown />
            <ChartBarDropDown />
          </div>
        </div>
        <div>
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

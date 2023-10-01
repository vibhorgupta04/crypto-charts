import { useState, useEffect } from 'react';
import axios from 'axios';
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
  const [dataCoin, setDataCoin] =useState<any>('')
  const[loadingCoinData ,setLoadingCoinData] = useState(false)

  const day = useSelector((state: any) => {
    return state.dropdown.daySelected;
  });
  const coin2 = useSelector((state: any) => {
    return state.dropdown.cryptoData;
  });

const fetchCoinData = async () => {
    try {
      const response: any = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin2}/market_chart`,
        {
          params: {
            vs_currency: currencyData.toLowerCase(),
            days: day,
          },
        }
      );
      setDataCoin(response);
    } catch (error) {
      console.log(error);
      setLoadingCoinData(false);
    }
  };

  useEffect(() => {
    fetchCoinData();
  }, [coin2, day]);

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

  const selectedCoins = useSelector((state: any) => {
    return state.dropdown.selectedCoins;
  });
  
  const formattedData: any = cryptoData?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });
  const formattedData2: any = dataCoin?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const labelModified = selectedCoins[0]?.label ? `${selectedCoins[0]?.label?.toUpperCase()}` : `${coin?.label?.toUpperCase()}`;

  const labelModified2 = selectedCoins[1]?.label ? `${selectedCoins[1]?.label?.toUpperCase()}` : `${coin2?.toUpperCase()}`

  const dataBar = {
    labels: formattedData?.map(({ x }: any) => moment(x).format('DD-MMM-YYYY')),
    datasets: [
      {
        label: labelModified,
        data: formattedData,
        backgroundColor: ['rgba(255, 99, 132, 0.5)',],
        borderColor: 'rgba(255, 99, 132, 1)',
        barPercentage: 0,
        borderWidth: 0,
        barThickness: 1,
        minBarLength: 1.2,
        base: 5000,
      },
      {
        label: labelModified2,
        data: formattedData2,
        backgroundColor: ['rgba(75, 192, 192, 0.5)'],
        borderColor: 'rgba(75, 192, 192, 1)',
        barPercentage: 0,
        borderWidth: 0,
        barThickness: 1,
        minBarLength: 1.2,
        base: 5000,
      },
    ],
  };

  const optionsBar: any = {
    responsive: true,
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
        backgroundColor: ['#2962ff'],
        borderColor: '#2962ff',
        fill: '#2962ff',
        borderWidth: 1.5,
        barThickness: 1,
      },
      {
        label: labelModified2,
        data: formattedData2,
        backgroundColor: ['rgb(75, 192, 192)',],
        borderColor: 'rgb(75, 192, 192)',
        borderWidth: 1.5,
        barThickness: 1,
      },
    ],
  };

  const options: any = {
    responsive: true,
    elements: {
      point: {
        radius: 0,
      },
    },
  };

  const optionsLineMarker: any = {
    responsive: true,
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

  if(loadingCoinData) return <div>Loading</div>;

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
        <div className=''>
          {chartTypeData === 'Bar' && (
            <div className='w-[100%] flex-1 h-[30vh]' style={{
              maxWidth: '100vw',
              flex:1,
              display: 'flex',
            }}>
              <Bar data={dataBar} options={optionsBar} />
            </div>
          )}
          {chartTypeData === 'Line with Markers' && (
            <div style={{
              maxWidth: '100vw',
              flex:1,
              display: 'flex',
            }}>
              <Line data={userLine} options={optionsLineMarker} />
            </div>
          )}
          {chartTypeData === 'Line' && (
            <div className='w-[100%] flex-1 h-[30vh]' style={{
              maxWidth: '100vw',
              flex:1,
              display: 'flex',
            }}>
              <Line data={userLine} options={options} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChartData;

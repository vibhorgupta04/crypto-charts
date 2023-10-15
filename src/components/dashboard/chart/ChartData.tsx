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
  const [mainCoin, setMainCoin] = useState<any>('');
  const [dataCoin, setDataCoin] = useState<any>('');
  const [dataCoin2, setDataCoin2] = useState<any>('');

  const [loadingCoinData, setLoadingCoinData] = useState(false);

  const day = useSelector((state: any) => {
    return state.dropdown.daySelected;
  });

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

  const DAY = useSelector((state: any) => {
    return state.dropdown.daySelected;
  });

  const mainFormattedData: any = mainCoin?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const formattedData: any = dataCoin?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });
  const formattedData2: any = dataCoin2?.data?.prices?.map((price: any) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const labelModified =
    selectedCoins[0]?.label && `${selectedCoins[0]?.label?.toUpperCase()}`;

  const labelModified2 =
    selectedCoins[1]?.label && `${selectedCoins[1]?.label?.toUpperCase()}`;

  const mainLabelModified = `${coin?.label?.toUpperCase() || coin.toUpperCase()}`;

  const datasets = [];
  if (mainLabelModified) {
    datasets.push({
      label: mainLabelModified,
      data: mainFormattedData,
      backgroundColor: ['rgba(255, 99, 132, 0.5)'],
      borderColor: 'rgba(255, 99, 132, 1)',
      barPercentage: 0,
      borderWidth: 0,
      barThickness: 1,
      minBarLength: 1.2,
      base: 5000,
    });
  }
  if (labelModified) {
    datasets.push({
      label: labelModified,
      data: formattedData,
      backgroundColor: ['rgba(153, 102, 255, 0.5)'],
      borderColor: 'rgb(153, 102, 255)',
      barPercentage: 0,
      borderWidth: 0,
      barThickness: 1,
      minBarLength: 1.2,
      base: 5000,
    });
  }
  if (labelModified2) {
    datasets.push({
      label: labelModified2,
      data: formattedData2,
      backgroundColor: ['rgba(75, 192, 192, 0.5)'],
      borderColor: 'rgba(75, 192, 192, 1)',
      barPercentage: 0,
      borderWidth: 0,
      barThickness: 1,
      minBarLength: 1.2,
      base: 5000,
    });
  }

  const dataBar = {
    labels: formattedData?.map(({ x }: any) => moment(x).format('DD-MMM-YYYY')),
    datasets,
  };

  const userLineDataSets = [];

  if (mainLabelModified)
    userLineDataSets.push({
      label: mainLabelModified,
      data: mainFormattedData,
      backgroundColor: ['rgba(75, 192, 192, 0.5)'],
      borderColor: 'rgba(75, 192, 192, 1)',
      fill: 'rgba(75, 192, 192, 1)',
      borderWidth: 1.5,
      barThickness: 1,
    });

  if (labelModified)
    userLineDataSets.push({
      label: labelModified,
      data: formattedData,
      backgroundColor: ['rgb(153, 102, 255, 0.5)'],
      borderColor: 'rgb(153, 102, 255)',
      fill: 'rgb(153, 102, 255)',
      borderWidth: 1.5,
      barThickness: 1,
    });

  if (labelModified2)
    userLineDataSets.push({
      label: labelModified2,
      data: formattedData2,
      backgroundColor: ['rgb(255, 159, 64, 0.5)'],
      borderColor: 'rgb(255, 159, 64, 1)',
      fill: 'rgb(255, 159, 64)',
      borderWidth: 1.5,
      barThickness: 1,
    });

  const userLine = {
    labels: formattedData?.map(({ x }: any) =>
      moment(x).format('DD-MMM-YY h:mm a')
    ),
    datasets: userLineDataSets,
  };

  const fetchCoinData = async (coinValue: string, type: number) => {
    try {
      const response: any = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coinValue}/market_chart`,
        {
          params: {
            vs_currency: currencyData.toLowerCase(),
            days: day,
          },
        }
      );
      if (type === 0) setMainCoin(response);
      if (type === 1) setDataCoin(response);
      if (type === 2) setDataCoin2(response);
    } catch (error) {
      console.log(error);
      setLoadingCoinData(false);
    }
  };

  useEffect(() => {
    if (coin) {
      fetchCoinData(coin, 0);
    }
    if (selectedCoins.length > 0) {
      selectedCoins[0]?.value && fetchCoinData(selectedCoins[0]?.value, 1);
      selectedCoins[1]?.value && fetchCoinData(selectedCoins[1]?.value, 2);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coin, day, selectedCoins]);

  if (loadingCoinData) return;

  return (
    <div className="bg-white shadow rounded my-4 px-4 py-6">
      <div className="md:flex items-center justify-between gap-4">
        <div className="w-fit flex flex-wrap gap-3 font-semibold ">
          {DAYS_ARRAY.map(({ value, title }: any) => (
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
        <div className="lg:w-1/2 flex flex-col gap-1 md:gap-3 my-4 ">
          <CryptoCurrencyDropDown />
          <ChartBarDropDown />
        </div>
      </div>
      <>
        {chartTypeData === 'Bar' && <Bar data={dataBar} options={optionsBar} />}
        {chartTypeData === 'Line with Markers' && (
          <Line data={userLine} options={optionsLineMarker} />
        )}
        {chartTypeData === 'Line' && <Line data={userLine} options={options} />}
      </>
    </div>
  );
};

export default ChartData;

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

const options: any = {
  responsive: true,
  elements: {
    point: {
      radius: 0,
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

const optionsLineMarker: any = {
  responsive: true,
  elements: {
    point: {
      radius: 1,
    },
  },
};

const DAYS_ARRAY = [
  { value: 1, title: '1D' },
  { value: 7, title: '1W' },
  { value: 30, title: '1M' },
  { value: 90, title: '3M' },
  { value: 180, title: '6M' },
  { value: 364, title: '1Y' },
];

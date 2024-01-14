import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js/auto';
import { Bar, Line } from 'react-chartjs-2';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';

import ChartBarDropDown from './ChartBar';
import { durationOptions, options, optionsBar, optionsLineMarker } from '../../constants/constants';
import CryptoCurrencyDropDown from './CryptoCurrencyDropDown';
import { IStore, days } from '../../../store';
import { DurationOption, IFormattedData, IMainCoin, IPrice } from '../../types';
import { fetchCoinData } from '../../../utils/fetch';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartData = () => {
  const dispatch = useDispatch();
  const [dataCoin, setDataCoin] = useState<IMainCoin | null>(null)
  const [loadingCoinData, setLoadingCoinData] = useState<boolean>(false)

  // fetch states from store
  const day = useSelector((state: IStore) => state.dropdown.daySelected);

  const coin2 = useSelector((state: IStore) => state.dropdown.cryptoData);

  const chartTypeData = useSelector((state: IStore) => state.dropdown.chartData);

  const coin = useSelector((state: IStore) => state.coin.coin);

  const currencyData = useSelector((state: IStore) => state.dropdown.currencyCountry);

  const cryptoData = useSelector((state: IStore) => state.api.cryptoData);

  const DAY = useSelector((state: IStore) => state.dropdown.daySelected);

  const formattedData: IFormattedData[] | undefined = cryptoData?.data?.prices?.map((price: IPrice) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  const formattedData2: IFormattedData[] | undefined = dataCoin?.prices?.map((price: IPrice) => {
    return { x: new Date(price[0]), y: price[1] };
  });

  // modify style for labels
  const labelModified = `${coin.toUpperCase()}`;
  const labelModified2 = `${coin2.toUpperCase()}`

  // create data for bar chart with datasets
  const dataBar = {
    labels: formattedData?.map(({ x }: Pick<IFormattedData, 'x'>) => moment(x).format('DD-MMM-YYYY')),
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
      ...(labelModified2 !== labelModified
        ? [
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
        ]
        : []),
    ],
  };

  // create data for line chart with datasets
  const userLine = {
    labels: formattedData?.map(({ x }: Pick<IFormattedData, 'x'>) =>
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
      ...(labelModified2 !== labelModified
        ? [
          {
            label: labelModified2,
            data: formattedData2,
            backgroundColor: ['rgb(75, 192, 192)'],
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 1.5,
            barThickness: 1,
          },
        ]
        : []),
    ],
  };

  // refetch coin data when coin2/day changes
  useEffect(() => {
    (
      async () => {
        setLoadingCoinData(true);
        const res = await fetchCoinData({ coin2, currencyData, day });
        res && setDataCoin(res);
        console.log('res', res)
        setLoadingCoinData(false);
      }
    )()
  }, [coin2, day]);

  if (loadingCoinData) return <div>Loading..</div>

  return (
    <div className="bg-white shadow rounded my-4 px-4 py-6">
      <div className="">
        <div className="md:flex items-center justify-end gap-8">
          <div className="flex flex-wrap gap-3 font-semibold ">
            {durationOptions.map(({ value, title }: DurationOption) => (
              <button
                key={value}
                className={`rounded  py-2 px-4 ${DAY === value
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
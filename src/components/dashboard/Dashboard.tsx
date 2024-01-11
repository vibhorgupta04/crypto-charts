import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  marketCap,
  currency,
  trendingCoin,
  searchCryptoData,
} from '../../store';
import axios from 'axios';

import ChartData from './chart/ChartData';
import Search from './Search';
import MarketCap from './MarketCap';
import ExchangeCoin from './ExchangeCoin';
import Portfolio from './Portfolio';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [loadingCap, setLoadingCap] = useState(false);
  const [loadingTrend, setLoadingTrend] = useState(false);
  const [loadingCoinData, setLoadingCoinData] = useState(false);

  const currencyOptions = ['INR', 'USD', 'GBP', 'EUR', 'YEN'];

  const handleDropdownChangeChart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: string = event.target.value;
    dispatch(currency(value));
  };

  const currencyData = useSelector((state: any) => state.dropdown.currencyCountry);
  const day = useSelector((state: any) => state.dropdown.daySelected);
  const coin = useSelector((state: any) => state.coin.coin);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrend(true);
        const response: any = await axios.get(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        dispatch(trendingCoin(response.data?.coins));
        setLoadingTrend(false);
      } catch (error) {
        console.log(error);
        setLoadingTrend(false);
      }
    };
    fetchTrending();
  }, []);

  const fetchCoinData = async () => {
    try {
      setLoadingCoinData(true);
      const response: any = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${coin}/market_chart`,
        {
          params: {
            vs_currency: currencyData.toLowerCase(),
            days: day,
          },
        }
      );
      dispatch(searchCryptoData(response));
      setLoadingCoinData(false);
    } catch (error) {
      console.log(error);
      setLoadingCoinData(false);
    }
  };

  const fetchData = async () => {
    try {
      setLoadingCap(true);
      const response: any = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: currencyData.toLowerCase(),
            order: 'market_cap_desc',
            per_page: '200',
            page: '1',
          },
        }
      );
      dispatch(marketCap(response));
      setLoadingCap(false);
    } catch (error) {
      console.log('error', error);
      setLoadingCap(false);
    }
  };

  useEffect(() => {
    if (coin) fetchCoinData();
  }, [coin, day]);

  useEffect(() => {
    fetchData();
  }, [currencyData]);

  return (
    <div className="bg-blue-1 md:my-6 px-2 py-4 md:p-4 rounded flex flex-col lg:flex-row gap-4">
      <div className="w-full">
        <div className="flex flex-col md:flex-row items-center gap-4 ">
          <select
            className="w-full md:w-auto ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
            value={currencyData}
            onChange={handleDropdownChangeChart}
          >
            {currencyOptions.map((item) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <Search />
        </div>
        <ChartData />
        <div className="w-full lg:h-[420px] flex flex-wrap lg:flex-nowrap gap-4">
          <Portfolio />
          <ExchangeCoin />
        </div>
      </div>
      <div className='shadow rounded lg:min-w-[400px] h-fit'>
        <MarketCap />
      </div>
    </div>
  );
};

export default Dashboard;

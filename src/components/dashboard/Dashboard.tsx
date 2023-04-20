import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { marketCap, currency, trendingCoin } from '../../store';
import axios from 'axios';

import ChartData from './chart/ChartData';
import Search from './Search';
import MarketCap from './MarketCap';
import ExchangeCoin from './ExchangeCoin';
import Portfolio from './Portfolio';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loadingCap, setLoadingCap] = useState(false);
  const [loadingTrend, setLoadingTrend] = useState(false);
  const currencyOptions = ['INR', 'USD', 'GBP', 'EUR', 'YEN'];

  const handleDropdownChangeChart = (event: any) => {
    const value: any = event.target.value;
    dispatch(currency(value));
  };

  const currencyData = useSelector((state: any) => {
    return state.dropdown.currencyCountry;
  });

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoadingTrend(true);
        const response: any = await axios.get(
          'https://api.coingecko.com/api/v3/search/trending'
        );
        dispatch(trendingCoin(response.data?.coins));
        setLoadingTrend(true);
      } catch (error) {
        console.log(error);
        setLoadingTrend(false);
      }
    };
    fetchTrending();
  }, []);
  const id = 'bitcoin';
  const day = 5;

  useEffect(() => {
    async function fetchCoinData() {
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart`,
        {
          params: {
            vs_currency: currencyData.toLowerCase(),
            days: day,
          },
        }
      );
      console.log('response', response);
      // setCoinData(response.data.prices);
    }
    fetchCoinData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingCap(true);
        const response: any = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets',
          {
            params: {
              vs_currency: currencyData.toLowerCase(),
              order: 'market_cap_desc',
              per_page: '10',
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
    fetchData();
  }, [currencyData]);

  if (loadingCap && loadingTrend)
    return <div className="text-xl my-10">Loading...</div>;

  return (
    <div className=" bg-blue-1 m-6 p-4 rounded md:flex gap-4">
      <div className="w-full">
        <div className="flex items-center gap-4 ">
          <select
            className="ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
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
        <div className="flex flex-wrap lg:flex-nowrap gap-4">
          <Portfolio />
          <ExchangeCoin />
        </div>
      </div>
      <MarketCap />
    </div>
  );
};

export default Dashboard;

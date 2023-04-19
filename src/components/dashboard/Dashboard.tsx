import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { marketCap, currency } from '../../store';
import axios from 'axios';

import ChartData from './chart/ChartData';
import Search from './Search';
import MarketCap from './MarketCap';
import ExchangeCoin from './ExchangeCoin';
import Portfolio from './Portfolio';

const Dashboard = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const currencyOptions = ['INR', 'USD', 'GBP', 'EUR', 'YEN'];

  const currencyData = useSelector((state: any) => {
    return state.dropdown.currencyCountry;
  });

  const handleDropdownChangeChart = (event: any) => {
    const value: any = event.target.value;
    dispatch(currency(value));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
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
        setLoading(false);
      } catch (error) {
        console.log('error', error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currencyData]);

  if (loading) return <div className="text-xl my-10">Loading...</div>;

  return (
    <div className=" bg-blue-1 m-6 p-4 rounded md:flex gap-4">
      <div className="w-full">
        <div className="flex items-center gap-4 ">
          <select value={currencyData} onChange={handleDropdownChangeChart}>
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

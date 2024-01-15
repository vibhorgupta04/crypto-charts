import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  marketCap,
  currency,
  trendingCoin,
  searchCryptoData,
  IStore,
} from '../../store'
import ChartData from './chart/ChartData';
import Search from '../common/Search';
import MarketCap from './MarketCap';
import ExchangeCoin from './ExchangeCoin';
import Portfolio from './Portfolio';
import { currencyOptions } from '../constants/constants';
import { CurrencyOptions } from '../types';
import { fetchMarketChart, fetchMarketsData, fetchTrending } from '../../utils/fetch';

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [loadingCap, setLoadingCap] = useState<boolean>(false);
  const [loadingTrend, setLoadingTrend] = useState<boolean>(false);
  const [loadingCoinData, setLoadingCoinData] = useState<boolean>(false);

  const handleDropdownChangeChart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value: CurrencyOptions = event.target.value as CurrencyOptions;
    dispatch(currency(value));
  };

  const currencyData = useSelector((state: IStore) => state.dropdown.currencyCountry);
  const day = useSelector((state: IStore) => state.dropdown.daySelected);
  const coin = useSelector((state: IStore) => state.coin.coin);

  useEffect(() => {
    (
      async () => {
        setLoadingTrend(true);
        const res = await fetchTrending();
        dispatch(trendingCoin(res?.coins));
        setLoadingTrend(false);
      }
    )()
  }, []);

  useEffect(() => {
    (
      async () => {
        if (coin) {
          setLoadingCoinData(true);
          const res = await fetchMarketChart({ coin, currencyData, day })
          res && dispatch(searchCryptoData(res));
          setLoadingCoinData(false);
        }
      }
    )()
  }, [coin, day]);

  useEffect(() => {
    (
      async () => {
        setLoadingCap(true);
        const res = await fetchMarketsData({ currencyData });
        res && dispatch(marketCap(res));
        setLoadingCap(false);
      }
    )()
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
            {currencyOptions.map((item: CurrencyOptions) => (
              <option key={item}>{item}</option>
            ))}
          </select>
          <Search />
        </div>
        {(loadingCap || loadingTrend || loadingCoinData) && <div>Loading...</div>}
        <ChartData />
        <div className="w-full lg:h-fit flex flex-wrap lg:flex-nowrap gap-4">
          <Portfolio />
          <ExchangeCoin />
        </div>
      </div>
      <div className='shadow rounded lg:min-w-[400px]'>
        <MarketCap />
      </div>
    </div>
  );
};

export default Dashboard;

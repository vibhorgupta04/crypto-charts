import { useState } from 'react';

import { SearchLineIcon } from '../common/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { coinValue } from '../../store';
import axios from 'axios';

const Search = () => {
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);
  const [currencyName, setCurrencyName] = useState('');

  const [loading, setLoading] = useState(false);

  const [currency, setCurrency] = useState('');
  const [searchResult, setSearchResult] = useState<any>(null);

  console.log('searchResult>>>>', searchResult);

  const coinsTrending = useSelector((state: any) => {
    return state.api.trendCoin;
  });

  console.log('coinsTrending >>>', coinsTrending);

  // const handleSearch = async () => {
  //   try {
  //     const response = await axios.get(
  //       `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${currency}`
  //     );
  //     setSearchResult(response.data);
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  const handleSearch = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/search?query=${currency}`
      );
      setSearchResult(response.data);
      setLoading(false);
    } catch (error) {
      console.log('error', error);
      setLoading(false);
    }
  };

  const handleChange = (e: any) => {
    setCurrency(e.target.value);
    handleSearch();
  };

  return (
    <div className={`${openSearch ? 'drop-shadow' : ''} relative w-full`}>
      <div
        className={`${
          openSearch ? 'rounded-t ' : 'drop-shadow rounded'
        } flex items-center gap-2 bg-white px-2 md:px-6 py-2`}
        onClick={() => setOpenSearch(true)}
      >
        <SearchLineIcon />
        <input
          type="text"
          placeholder={`${currencyName ? currencyName : 'Search by coin'} `}
          className={` w-full focus:outline-none placeholder:font-semibold ${
            currencyName
              ? 'placeholder:text-black font-semibold'
              : 'placeholder:text-gray-1'
          } `}
          value={currencyName}
          onChange={handleChange}
        />
      </div>
      {openSearch && (
        <div className="relative">
          <div className="absolute rounded-b w-full bg-white">
            <div className=" border-b pt-4 px-4 text-gray-400">
              {currency.length <= 0 ? 'Trending Search' : 'Cryptocurrencies'}
            </div>
            {currency.length <= 0 && (
              <div>
                {coinsTrending.map(
                  ({
                    item: { id, small, name, symbol, market_cap_rank },
                  }: any) => (
                    <button
                      className="my-2 w-full rounded flex px-4 py-2 justify-between hover:bg-gray-100"
                      key={name}
                      onClick={() => {
                        dispatch(coinValue(id));
                        setOpenSearch(!openSearch);
                        setCurrencyName(name + ' (' + symbol + ') ');
                      }}
                    >
                      <div className="text-lg flex items-center gap-2 cursor-pointer">
                        <img src={small} width="20" height="20" />
                        {name} ({symbol})
                      </div>
                      <div
                        className={`text-gray-200 ${market_cap_rank ? '' : ''}`}
                      >
                        #{market_cap_rank}
                      </div>
                    </button>
                  )
                )}
              </div>
            )}
            {currency.length > 0 && (
              <div className="scroll h-96 overflow-y-scroll">
                {searchResult?.coins?.map((item: any) => (
                  <button
                    className=" my-2 w-full rounded flex px-4 py-2 justify-between hover:bg-gray-100"
                    key={item.name}
                    onClick={() => {
                      dispatch(coinValue(item.id));
                      setOpenSearch(!openSearch);
                      setCurrencyName(item.name + ' (' + item.symbol + ') ');
                    }}
                  >
                    <div className="text-lg flex items-center gap-2 cursor-pointer">
                      <img src={item.large} width="20" height="20" />
                      {item.name} ({item.symbol})
                    </div>
                    {item.market_cap_rank && (
                      <div className="text-gray-200">
                        #{item.market_cap_rank}
                      </div>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            className="absolute right-2 -top-8"
            onClick={() => setOpenSearch(!openSearch)}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { SearchLineIcon } from './Icons';
import { IStore, coinValue } from '../../store';
import { fetchSearchResult } from '../../utils/fetch';
import { ICoins, ISearch } from '../types';
// component for search functionality
const Search = () => {
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState<boolean>(false);
  const [currencyName, setCurrencyName] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [currency, setCurrency] = useState<string>('');
  const [searchResult, setSearchResult] = useState<ISearch | null>(null);

  // fetch trending coins from store
  const coinsTrending = useSelector((state: IStore) => state.api.trendCoin);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (currency) {
      // fetch search results api call handler
      const handleSearch = async () => {
        setLoading(true);
        const response = await fetchSearchResult({ currency })
        setSearchResult(response);
        setLoading(false);
      };
      // logic to debounce api call
      const debounceSearch = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          handleSearch();
        }, 300);
      };
      debounceSearch();
    }
    // cleanup logic for debounce
    return () => {
      clearTimeout(timer);
    };
  }, [currency]);

  // input change handle for search
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrency(e.target.value);
  };

  return (
    <div className={`${openSearch ? 'drop-shadow z-10' : ''} relative w-full`}>
      <div
        className={`${openSearch ? 'rounded-t' : 'drop-shadow rounded'
          } flex items-center gap-2 bg-white px-2 md:px-6 py-2`}
        onClick={() => setOpenSearch(true)}
      >
        <SearchLineIcon />
        <input
          type="text"
          placeholder={`${currencyName ? currencyName : 'Search by coin'}`}
          className={`w-full focus:outline-none placeholder:font-semibold ${currencyName ? 'placeholder:text-gray-1' : 'placeholder:text-gray-1'
            }`}
          value={currency}
          onChange={handleChange}
        />
      </div>
      {openSearch && (
        <div className="relative bg-white">
          <div className="absolute rounded-b w-full bg-white">
            <div className="border-b pt-4 px-4 text-gray-400">
              {currency.length <= 0 ? 'Trending Search' : 'Cryptocurrencies'}
            </div>
            {currency.length <= 0 && (
              <div>
                {loading ? (
                  <div className="py-2 px-4 text-gray-500">Loading...</div>
                ) : (
                  coinsTrending.map(
                    ({
                      item: { id, small, name, symbol, market_cap_rank },
                    }: any) => (
                      <button
                        className="my-2 w-full rounded flex px-4 py-2 justify-between hover:bg-gray-100"
                        key={name}
                        onClick={() => {
                          dispatch(coinValue(id));
                          setOpenSearch(false);
                          setCurrencyName(`${name} (${symbol})`);
                          setCurrency(name);
                        }}
                      >
                        <div className="text-lg flex items-center gap-2 cursor-pointer">
                          <img src={small} width="20" height="20" alt={name} />
                          {name} ({symbol})
                        </div>
                        <div
                          className={`text-gray-200 ${market_cap_rank ? '' : ''
                            }`}
                        >
                          #{market_cap_rank}
                        </div>
                      </button>
                    )
                  )
                )}
              </div>
            )}
            {currency.length > 0 && (
              <div className="scroll h-96 overflow-y-scroll">
                {loading ? (
                  <div className="py-2 px-4 text-gray-500">Loading...</div>
                ) : (
                  searchResult?.coins?.map((item: ICoins) => (
                    <button
                      className="my-2 w-full rounded flex px-4 py-2 justify-between hover:bg-gray-100"
                      key={item.name}
                      onClick={() => {
                        dispatch(coinValue(item?.id));
                        setOpenSearch(false);
                        setCurrencyName(`${item.name} (${item.symbol})`);
                      }}
                    >
                      <div className="text-lg flex items-center gap-2 cursor-pointer">
                        <img
                          src={item.large}
                          width="20"
                          height="20"
                          alt={item.name}
                        />
                        {item.name} ({item.symbol})
                      </div>
                      {item.market_cap_rank && (
                        <div className="text-gray-200">
                          #{item.market_cap_rank}
                        </div>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </div>
          <button
            className="absolute right-2 -top-8"
            onClick={() => {
              setOpenSearch(false);
              setCurrency('');
            }}
          >
            X
          </button>
        </div>
      )}
    </div>
  );
};

export default Search;

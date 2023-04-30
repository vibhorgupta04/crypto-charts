import { useState } from 'react';

import { SearchLineIcon } from '../common/Icons';
import { useSelector, useDispatch } from 'react-redux';
import { coinValue } from '../../store';

const Search = () => {
  const dispatch = useDispatch();
  const [openSearch, setOpenSearch] = useState(false);

  const coinsTrending = useSelector((state: any) => {
    return state.api.trendCoin;
  });

  console.log('coinsTrending', coinsTrending);

  return (
    <div className={`${openSearch ? 'drop-shadow' : ''} relative w-full`}>
      <div
        className={`${
          openSearch ? 'rounded-t ' : 'drop-shadow rounded'
        } flex items-center gap-2 bg-white   px-6 py-2`}
        onClick={() => setOpenSearch(true)}
      >
        <SearchLineIcon />
        <input
          type="text"
          placeholder="Search by coin"
          className=" w-full focus:outline-none placeholder:font-semibold placeholder:text-gray-1"
        />
      </div>
      {openSearch && (
        <div className="relative">
          <div className="absolute rounded-b w-full bg-white">
            <div className=" border-b pt-4 px-4 text-gray-400">
              Trending Search
            </div>
            <div className="">
              {coinsTrending.map(
                ({
                  item: { id, small, name, symbol, market_cap_rank },
                }: any) => (
                  <button
                    className="my-2 w-full rounded flex px-4 py-2 justify-between hover:bg-gray-100"
                    key={name}
                    onClick={() => dispatch(coinValue(id))}
                  >
                    <div className="text-lg flex items-center gap-2 cursor-pointer">
                      <img src={small} width="20" height="20"></img>
                      {name} ({symbol})
                    </div>
                    <div className="text-gray-200">#{market_cap_rank}</div>
                  </button>
                )
              )}
            </div>
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

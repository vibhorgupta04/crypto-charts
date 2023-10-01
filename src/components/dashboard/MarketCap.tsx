import { coinValue } from '../../store';
import { DownIcon, UpIcon } from '../common/Icons';
import { useSelector, useDispatch } from 'react-redux';

const MarketCap = () => {
  const dispatch = useDispatch();

  const marKetData = useSelector((state: any) => {
    return state.api.market;
  });

  const currencyData = useSelector((state: any) => {
    return state.dropdown.currencyCountry;
  });
  
  const { data } = marKetData;

  return (
    <>
      <div className="min-w-[300px] lg:w-2/4 my-4 lg:my-0 h-fit overflow-x-hidden bg-white px-4 py-6 ">
        <div className="font-bold">Cryptocurrency by market cap</div>
        <div className="scroll h-[900px] overflow-y-scroll">
          {data &&
            data.length > 0 &&
            data.map((item: any) => (
              <div
                className=" my-4 flex items-center justify-between font-semibold border-b py-2 cursor-pointer"
                key={item.id}
                onClick={() => dispatch(coinValue(item.id))}
              >
                <div className="">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.id}
                      width="20"
                      height="20"
                    />
                    {item.name.charAt(0).toUpperCase() + item.name.slice(1)} (
                    {item.symbol.toUpperCase()})
                  </div>
                  <div className="text-gray-400 ">
                    Mkt.cap
                    {item.market_cap && (
                      <span className="text-gray-500 ml-2">
                        {(currencyData == 'INR' && '₹') ||
                          (currencyData == 'USD' && '$') ||
                          (currencyData == 'GBP' && '£') ||
                          (currencyData == 'YEN' && '￥') ||
                          (currencyData == 'EUR' && '€')}
                        {(item?.market_cap / 1000000000)?.toFixed(2)}B
                      </span>
                    )}
                  </div>
                  <div>Price ${item.current_price}</div>
                </div>
                {item?.market_cap_change_percentage_24h && (
                  <div
                    className={`${
                      item?.market_cap_change_percentage_24h <= 0
                        ? 'text-orange-1'
                        : 'text-green-1'
                    } flex items-center`}
                  >
                    {item?.market_cap_change_percentage_24h <= 0 ? (
                      <DownIcon width="24" height="24" fill="#ec7622" />
                    ) : (
                      <UpIcon width="24" height="24" fill="#4c9d8a" />
                    )}
                    {item.market_cap_change_percentage_24h?.toFixed(2)}%
                  </div>
                )}
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MarketCap;

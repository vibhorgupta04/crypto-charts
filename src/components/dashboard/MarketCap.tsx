import { DownIcon, UpIcon } from '../common/Icons';
import { useSelector } from 'react-redux';

const MarketCap = () => {
  const marKetData = useSelector((state: any) => {
    return state.api.market;
  });

  const currencyData = useSelector((state: any) => {
    return state.dropdown.currencyCountry;
  });
  const { data } = marKetData;

  return (
    <>
      <div className="md:w-2/5 h-fit bg-white px-4 py-6">
        <div className="font-bold">Cryptocurrency by market cap</div>
        <div>
          {data &&
            data.length > 0 &&
            data.map((item: any) => (
              <div
                className=" my-4 flex items-center justify-between font-semibold border-b py-2"
                key={item.id}
              >
                <div className="">
                  <div className="flex items-center gap-2">
                    <img
                      src={item.image}
                      alt={item.id}
                      width="20"
                      height="20"
                    />
                    {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                  </div>
                  <div className="text-gray-400 ">
                    Mkt.cap
                    <span className="text-gray-500 ml-2">
                      {(currencyData == 'INR' && '₹') ||
                        (currencyData == 'USD' && '$') ||
                        (currencyData == 'GBP' && '£') ||
                        (currencyData == 'YEN' && '￥') ||
                        (currencyData == 'EUR' && '€')}
                      {(item.market_cap / 1000000000).toFixed(2)}B
                    </span>
                  </div>
                </div>
                <div
                  className={`${
                    item.market_cap_change_percentage_24h <= 0
                      ? 'text-orange-1'
                      : 'text-green-1'
                  } flex items-center`}
                >
                  {item.market_cap_change_percentage_24h <= 0 ? (
                    <DownIcon width="24" height="24" fill="#ec7622" />
                  ) : (
                    <UpIcon width="24" height="24" fill="#4c9d8a" />
                  )}
                  {item.market_cap_change_percentage_24h.toFixed(2)}%
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default MarketCap;

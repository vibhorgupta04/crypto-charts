import { useEffect, useState } from 'react';
import { fetchExchangeList } from '../../utils/fetch';

interface ExchangeItem {
  name: string;
  value: number;
  unit: string;
  type: string;
}

const ExchangeCoin = () => {
  const [loading, setLoading] = useState(false);
  const [exchangeList, setExchangeList] = useState([]);
  const [error, setError] = useState(false);

  const [selectedExchange, setSelectedExchange] = useState({
    sell: '',
    buy: '',
  });

  const [exchangeAmount, setExchangeAmount] = useState({
    sell: 0,
    buy: 0,
  });

  const [exchangeUnit, setExchangeUnit] = useState('');

  const [calculationType, setCalculationType] = useState<'buy' | 'sell'>('buy');

  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await fetchExchangeList();
      setLoading(false);
      data && setExchangeList(data.rates);
      error && setError(true);
    })();
  }, []);

  const handleExchangeCalculation = (e: React.FormEvent) => {
    e.preventDefault();
    const [, sellUnit] = selectedExchange.sell.split(' ');
    const [buyValue, buyUnit] = selectedExchange.buy.split(' ');

    if (calculationType === 'sell') {
      const totalSell = +exchangeAmount.sell * +buyValue;
      setExchangeUnit(buyUnit);
      setExchangeAmount({ ...exchangeAmount, buy: totalSell });
      return;
    }

    if (calculationType === 'buy') {
      const totalBuy = +exchangeAmount.buy / +buyValue;
      setExchangeUnit(sellUnit);
      setExchangeAmount({ ...exchangeAmount, sell: totalBuy });
      return;
    }
  };

  // handle error
  if (!loading && error)
    return <h2>Data could not be loaded, please try again.</h2>;

  return (
    <form
      className="w-full rounded bg-white shadow px-6 py-4"
      onSubmit={handleExchangeCalculation}
    >
      <div className="font-semibold">Exchange Coins</div>

      <div className="py-4 flex lg:items-center gap-6">
        <span className="text-orange-400 font-bold">Sell</span>
        <div className="flex flex-col gap-4">
          <span>
            <select
              className="focus:ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
              value={selectedExchange.sell}
              onChange={(e) =>
                setSelectedExchange({
                  ...selectedExchange,
                  sell: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Sell Exchange
              </option>
              {loading && <div>Loading...</div>}
              {!loading && Object.values(exchangeList).map(
                ({ name, unit, value }: ExchangeItem) => (
                  <option
                    className="px-4"
                    key={unit + name}
                    value={value + ' ' + unit}
                  >
                    {name}
                  </option>
                )
              )}
            </select>
          </span>
          <span className="inline-flex items-center gap-2">
            <input
              className="bg-gray-100 px-2 py-2 focus:ring-1 ring-gray-300 focus:outline-none"
              placeholder="Enter Value"
              type="number"
              min={0}
              step={0.01}
              value={+exchangeAmount.sell}
              onChange={(e) => {
                setCalculationType('sell');
                setExchangeAmount({ ...exchangeAmount, sell: +e.target.value });
              }}
            />
            {calculationType === 'buy' && (
              <span className="text-orange-400">{exchangeUnit}</span>
            )}
          </span>
        </div>
      </div>
      <div className="py-4 flex flex-row items-center gap-6">
        <span className="text-green-500 font-bold">Buy</span>
        <div className='flex flex-col gap-4'>
          <span>
            <select
              className="focus:ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
              value={selectedExchange.buy}
              onChange={(e) =>
                setSelectedExchange({
                  ...selectedExchange,
                  buy: e.target.value,
                })
              }
            >
              <option value="" disabled>
                Select Sell Exchange
              </option>
              {Object.values(exchangeList).map(
                ({ unit, name, value }: ExchangeItem) => (
                  <option
                    className="px-4"
                    key={name}
                    value={value + ' ' + unit}
                  >
                    {name}
                  </option>
                )
              )}
            </select>
          </span>
          <span className="inline-flex items-center gap-2">
            <input
              className="bg-gray-100 px-2 py-2 focus:ring-1 ring-gray-300 focus:outline-none"
              placeholder="Enter Value"
              type="number"
              min={0}
              step={0.01}
              value={+exchangeAmount.buy}
              onChange={(e) => {
                setCalculationType('buy');
                setExchangeAmount({ ...exchangeAmount, buy: +e.target.value });
              }}
            />
            {calculationType === 'sell' && (
              <span className="text-green-500">{exchangeUnit}</span>
            )}
          </span>
        </div>
      </div>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded my-4"
        type="submit"
      >
        Exchange
      </button>
    </form>
  );
};

export default ExchangeCoin;

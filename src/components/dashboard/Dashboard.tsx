import ChartData from './chart/ChartData';
import Search from './Search';
import MarketCap from './MarketCap';
import ExchangeCoin from './ExchangeCoin';
import Portfolio from './Portfolio';

const Dashboard = () => {
  const currencyOptions = ['USD', 'EUR', 'GBP', 'INR'];
  return (
    <div className=" bg-blue-1 m-6 p-4 rounded md:flex gap-4">
      <div className="w-full">
        <div className="flex items-center gap-4 ">
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

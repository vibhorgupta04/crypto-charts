import Dashboard from './components/dashboard/Dashboard';
import Header from './components/common/Header';

function App() {
  return (
    <div className="max-w-[1400px] mx-auto ">
      <Header />
      <div className='lg:h-[1000px] overflow-y-hidden'>
      <Dashboard />
      </div>
    </div>
  );
}

export default App;

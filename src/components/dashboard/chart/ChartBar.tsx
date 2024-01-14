import { useDispatch, useSelector } from 'react-redux';

import { IStore, chartType } from '../../../store';
import { chartTypeOptions } from '../../constants/constants';

const ChartBar = () => {
  const dispatch = useDispatch();

  const chartTypeData = useSelector((state: IStore) => state.dropdown.chartData);

  const handleDropdownChangeChart = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const chartValue: string = event.target.value;
    dispatch(chartType(chartValue));
  };

  return (
    <select
      className="h-fit ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
      value={chartTypeData}
      onChange={handleDropdownChangeChart}
    >
      {chartTypeOptions.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default ChartBar;

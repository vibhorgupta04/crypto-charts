import { useDispatch, useSelector } from 'react-redux';
import { chartType } from '../../../store';

const ChartBar = () => {
  const dispatch = useDispatch();

  const chartTypeData = useSelector((state: any) => {
    return state.dropdown.chartData;
  });

  const handleDropdownChangeChart = (event: any) => {
    const chartValue: any = event.target.value;
    dispatch(chartType(chartValue));
  };

  const chartTypeOptions = ['Bar Chart', 'Line Chart'];

  return (
    <select
      className="ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
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

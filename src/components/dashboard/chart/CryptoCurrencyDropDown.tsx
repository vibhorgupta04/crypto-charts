import { useDispatch, useSelector } from 'react-redux';
import { cryptocurrency } from '../../../store';

const CryptoCurrencyDropDown = () => {
  const dispatch = useDispatch();
  const cryptoTypeData = useSelector((state: any) => {
    console.log('state', state);
    return state.dropdown.cryptoData;
  });

  const handleDropdownChangeCrypto = (event: any) => {
    const value = event.target.value;
    dispatch(cryptocurrency(value));
  };

  const cryptoOptions = ['CryptoCurrency', 'BitCoin', 'Binaca'];

  return (
    <select
      className="ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
      value={cryptoTypeData}
      onChange={handleDropdownChangeCrypto}
    >
      {cryptoOptions.map((item, index) => (
        <option value={item} key={index}>
          {item}
        </option>
      ))}
    </select>
  );
};

export default CryptoCurrencyDropDown;

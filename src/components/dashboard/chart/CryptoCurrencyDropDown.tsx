import { useDispatch, useSelector } from "react-redux";
import { cryptocurrency } from "../../../store";

const CryptoCurrencyDropDown = () => {
  const dispatch = useDispatch();
  const cryptoTypeData = useSelector((state: any) => {
    return state.dropdown.cryptoData;
  });

  const trendingData = useSelector((state: any) => {
    return state.api.trendCoin;
  });

  const handleDropdownChangeCrypto = (event: any) => {
    const value = event.target.value;
    dispatch(cryptocurrency(value));
  };

  return (
    <select
      className="ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
      value={cryptoTypeData}
      onChange={handleDropdownChangeCrypto}
    >
      {/* <option value="tether" selected disabled hidden>Tether</option> */}
      {trendingData.map(
        ({ item: { id, name} }: any) => {
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        }
      )}
    </select>
  );
};

export default CryptoCurrencyDropDown;

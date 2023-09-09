import { useDispatch, useSelector } from 'react-redux';
import { cryptocurrency } from '../../../store';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';


const CryptoCurrencyDropDown = () => {
  const [selectedCrypto, setSelectedCrypto] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const maxSelectedItems = 2;

  const dispatch = useDispatch();
  const cryptoTypeData = useSelector((state: any) => {
    return state.dropdown.cryptoData;
  });


  const trendingData = useSelector((state: any) => {
    return state.api.trendCoin;
  });

  // const handleDropdownChangeCrypto = (event: any) => {
  //   const value = event.target.value;
  //   dispatch(cryptocurrency(value));
  // };

  // const handleDropdownChangeCrypto = (selectedOptions: any) => {
  //   setSelectedCrypto(selectedOptions);
  // };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const itemId = event.target.value;
    if (event.target.checked) {
      setSelectedItems((prevSelected) => [...prevSelected, itemId]);
    } else {
      setSelectedItems((prevSelected) =>
        prevSelected.filter((id) => id !== itemId)
      );
    }
  };
  useEffect(() => {
    if (selectedItems.length > maxSelectedItems) {
      // Remove the last selected item to enforce the limit
      setSelectedItems((prevSelected) => prevSelected.slice(0, -1));
    }
  }, [selectedItems]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedValues: any) => {
    setSelectedOptions(selectedValues);
  };

  console.log(trendingData)

  let options: any[] = []

  trendingData && trendingData.map((data: any) => options.push({value: data?.item?.slug, label: data?.item?.name}))

  console.log(options)
  return (
    <div className=" relative">
      <button
        className="bg-[#f3f4f6] ring-1 rounded ring-[#e4e7eb] px-4 py-2 w-40"
        onClick={() => setOpen(!open)}
      >
        Cryptocurrency
      </button>
      {open && (
        <div className="absolute rounded  bg-[#f3f4f6] w-60  flex flex-col right-0 top-11 border border-[#e4e7eb] ">
          {/* {trendingData.map(({ item: { name, id, small } }: any) => (
            <div
              key={id}
              className="px-2 py-2 break-words flex items-center gap-2"
            >
              <input
                type="checkbox"
                id={id}
                name={name}
                value={id}
                checked={selectedItems.includes(id)}
                onChange={handleChange}
                disabled={
                  selectedItems.length >= maxSelectedItems &&
                  !selectedItems.includes(id)
                }
              />
              <label>{name}</label>
              <img src={small} className="w-4 h-4" />
            </div>
          ))} */}
          


      <Select
        options={options}
        isMulti
        value={selectedOptions}
        onChange={handleSelectChange}
        closeMenuOnSelect={false}
        components={{
          Option: CustomOption, // Custom option component to add checkboxes
        }}
      />
        </div>
      )}

      {/* <select
      className="ring-1 ring-gray-200 bg-gray-100 rounded focus:outline-none px-2 py-2 font-semibold"
      value={cryptoTypeData}
      onChange={handleDropdownChangeCrypto}
    >
      {trendingData.map(
        ({ item: { id, name} }: any) => {
          return (
            <option value={id} key={id}>
              {name}
            </option>
          );
        }
      )}
    </select> */}
    </div>
  );
};

export default CryptoCurrencyDropDown;

const CustomOption: React.FC<{
  innerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  isSelected: boolean;
}> = ({ innerProps, label, isSelected }) => (
  <div {...innerProps}>
    <input type="checkbox" checked={isSelected} readOnly /> {/* Checkbox */}
    {label}
  </div>
);
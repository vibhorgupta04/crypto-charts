import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import React, { useState, useEffect } from 'react';
import { coins } from '../../../store/slices/dropdownSlice';

const CryptoCurrencyDropDown = () => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const maxSelectedItems = 2;

  const dispatch = useDispatch();

  const trendingData = useSelector((state: any) => {
    return state.api.trendCoin;
  });

  useEffect(() => {
    if (selectedItems.length > maxSelectedItems) {
      setSelectedItems((prevSelected) => prevSelected.slice(0, -1));
    }
  }, [selectedItems]);

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleSelectChange = (selectedValues: any) => {
    setSelectedOptions(selectedValues);
    dispatch(coins(selectedValues));
  };

  let options: any[] = [];

  trendingData &&
    trendingData.map((data: any) =>
      options.push({ value: data?.item?.slug, label: data?.item?.name })
    );

  return (
    <>
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
    </>
  );
};

export default CryptoCurrencyDropDown;

const CustomOption: React.FC<{
  innerProps: React.HTMLAttributes<HTMLDivElement>;
  label: string;
  isSelected: boolean;
}> = ({ innerProps, label, isSelected }) => (
  <div {...innerProps}>
    <label className="mx-4">
      {label}
      <input type="checkbox" checked={isSelected} className="px-4 hidden" />
      {/* <span className="checkmark"></span> */}
    </label>
  </div>
);

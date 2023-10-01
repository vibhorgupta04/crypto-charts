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
    dispatch(coins(selectedValues))
  };

  let options: any[] = []

  trendingData && trendingData.map((data: any) => options.push({value: data?.item?.slug, label: data?.item?.name}))

  return (
    <div className=" relative">
      <div
        className="w-[10rem]"
      >
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
    <label className="container">{label}
      <input type="checkbox" checked={isSelected} />
      <span className="checkmark"></span>
    </label>
  </div>
);
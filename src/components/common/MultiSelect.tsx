import { useEffect, useState } from 'react';
import Select, { components } from 'react-select';
import { IStore, coinValue, cryptocurrency } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

const InputOption = ({
  getStyles,
  Icon,
  isDisabled,
  isFocused,
  isSelected,
  children,
  innerProps,
  ...rest
}: any) => {
  const [isActive, setIsActive] = useState(false);
  const onMouseDown = () => setIsActive(true);
  const onMouseUp = () => setIsActive(false);
  const onMouseLeave = () => setIsActive(false);

  // styles
  let bg = 'transparent';
  if (isFocused) bg = '#eee';
  if (isActive) bg = '#B2D4FF';

  const style = {
    alignItems: 'center',
    backgroundColor: bg,
    color: 'inherit',
    display: 'flex',
  };

  // prop assignment
  const props = {
    ...innerProps,
    onMouseDown,
    onMouseUp,
    onMouseLeave,
    style,
  };

  return (
    <components.Option
      {...rest}
      isDisabled={isDisabled}
      isFocused={isFocused}
      isSelected={isSelected}
      getStyles={getStyles}
      innerProps={props}
    >
      <input type="checkbox" checked={isSelected} className='mr-2'/>
      {children}
    </components.Option>
  );
};

export default function MultiSelect() {
  let options: any[] = [];
  const dispatch = useDispatch();

  const coin2 = useSelector((state: IStore) => state.dropdown.cryptoData);
  const coin = useSelector((state: IStore) => state.coin.coin);
  const trendingData = useSelector((state: IStore) => state.api.trendCoin);

  const [selectedOptions, setSelectedOptions] = useState<any>(
    options?.filter((opt) => opt.value === coin || opt.value === coin2)
  );

  trendingData &&
    trendingData.map((data: any) =>
      options.push({ value: data?.item?.id, label: data?.item?.name })
    );
  const maxSelections = 2;

  const handleChange = (selected: any) => {
    // Check if the number of selected items exceeds the maximum
    if (selected.length > maxSelections) {
      // Remove the last selected item
      selected.pop();
    }
    setSelectedOptions(selected);
    selected?.[0] && dispatch(coinValue(selected?.[0]?.value));
    selected?.[1] && dispatch(cryptocurrency(selected?.[1]?.value));
  };
  const isOptionDisabled = (option: any) => {
    // Disable the option if the maximum number of selections is reached
    return (
      selectedOptions.length >= maxSelections &&
      !selectedOptions.includes(option)
    );
  };
  useEffect(() => {
    if (selectedOptions.length > 0) {
      selectedOptions?.[0]
        ? dispatch(coinValue(selectedOptions?.[0]?.value))
        : dispatch(coinValue(''));
      selectedOptions?.[1]
        ? dispatch(cryptocurrency(selectedOptions?.[1]?.value))
        : dispatch(cryptocurrency(''));
    }
  }, [selectedOptions]);
  return (
    <div className="min-w-[192px]">
      <Select
        isMulti
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        onChange={handleChange}
        isOptionDisabled={isOptionDisabled}
        options={options}
        components={{
          Option: InputOption,
        }}
      />
    </div>
  );
}

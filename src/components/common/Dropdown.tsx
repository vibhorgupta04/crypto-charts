import { Menu, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { DownIcon } from './Icons';
import { useDispatch, useSelector } from 'react-redux';
import { chartType } from '../../store';

const Dropdown = ({ options, value, format }: any) => {
  // const dispatch = useDispatch();

  const [selectedOption, setSelectedOption] = useState(
    options ? options[0] : ''
  );

  // const datatype = useSelector((state: any) => {
  //   console.log(datatype);
  //   // state.dropdown.selectedOption;
  // });

  // const handleOptionChange: any = (option: any) => {
  //   setSelectedOption(option);
  //   dispatch(chartType(option));
  // };

  return (
    <>
      <div className="">
        <Menu as="div" className="relative text-left">
          <div>
            <Menu.Button
              className={`${format} w-full rounded flex items-center gap-4 p-2 font-semibold`}
            >
              {selectedOption}
              <DownIcon />
            </Menu.Button>
          </div>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute left-0 mt-1 rounded bg-white shadow">
              <div className="py-1 ">
                {options?.map((option: string) => (
                  <Menu.Item>
                    {({ active }) => (
                      <button
                        className={`${active ? 'bg-red-1 ' : ''} ${
                          selectedOption == option ? 'font-bold' : ''
                        } w-full px-2 py-2`}
                        // key={`chart-${option}`}
                        // onClick={handleOptionChange(option)}
                      >
                        {option}
                      </button>
                    )}
                  </Menu.Item>
                ))}
              </div>
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </>
  );
};

export default Dropdown;

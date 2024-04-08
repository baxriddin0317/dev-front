import React, { useEffect, useState } from 'react';
import { BsChevronDown } from 'react-icons/bs';
import { Combobox, Transition } from '@headlessui/react';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function ComboBox({
  onChange,
  dataList,
  title,
  selectedValue,
  isNoLabel,
  name,
  setField,
  reset,
  // isCreateBot,
}) {
  const [query, setQuery] = useState('');
  const [open, setOpen] = useState(false);

  const filteredData =
    query === ''
      ? dataList
      : dataList?.filter((item) => {
          return item?.label?.toLowerCase().includes(query.toLowerCase());
        });
  const filteredDataNolabelData =
    query === ''
      ? dataList
      : isNoLabel
      ? dataList?.filter((item) => {
          return item?.toLowerCase().includes(query.toLowerCase());
        })
      : null;
  useEffect(() => {
    if (reset) {
      setQuery('');
    }
  }, [reset]);
  const handleInputFocus = () => {
    setOpen(true);
  };

  const handleInputBlur = () => {
    clearTimeout();
    setTimeout(() => {
      setOpen(false);
    }, 400);
  };
  return (
    <>
      {isNoLabel ? (
        <Combobox
          as="div"
          onChange={(selectedOption) => {
            onChange(selectedOption);
            setOpen(false);
          }}
        >
          <Combobox.Label className="block text-sm font-medium leading-[6px] text-gray-900 dark:text-gray-300">
            {title}
          </Combobox.Label>
          <div className="relative mt-2">
            <input
              className={`w-full rounded-md border-0 bg-white text-gray-900 dark:bg-gray-900 dark:text-green-100 py-1.5 pl-3 pr-10 
      shadow-sm ring-1 ring-inset ring-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-400 sm:text-sm sm:leading-6`}
              onChange={(event) => {
                setQuery(event.target.value);
                setField(name, event.target.value, false);
              }}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              value={selectedValue?.length > 0 ? selectedValue : query}
            />
            <Combobox.Button
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            >
              <BsChevronDown
                className="h-4 w-4 text-gray-300"
                aria-hidden="true"
              />
            </Combobox.Button>

            <Transition show={open}>
              {filteredDataNolabelData.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full h-48 overflow-auto rounded-md bg-gray-50 text-gray-900 py-1 text-base shadow-lg ring-1 ring-gray-400 ring-opacity-5 focus:outline-none sm:text-sm">
                  {}
                  <AutoSizer>
                    {({ height, width }) => (
                      <List
                        height={height}
                        itemCount={filteredDataNolabelData.length}
                        itemSize={30} // Adjust this height as needed to fit your design
                        width={width}
                      >
                        {({ index, style }) => (
                          <Combobox.Option
                            key={filteredDataNolabelData[index]}
                            value={filteredDataNolabelData[index]}
                            className={({ active }) =>
                              classNames(
                                'relative cursor-default h-6 select-none py-2 pl-3 pr-9',
                                active
                                  ? 'white text-gray-300'
                                  : 'text-gray-900 hover:text-green-100'
                              )
                            }
                            style={style}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={classNames(
                                    'block truncate',
                                    selected && 'font-semibold text-green-100'
                                  )}
                                >
                                  {filteredDataNolabelData[index]}
                                </span>
                              </>
                            )}
                          </Combobox.Option>
                        )}
                      </List>
                    )}
                  </AutoSizer>
                </Combobox.Options>
              )}
            </Transition>
          </div>
        </Combobox>
      ) : (
        <Combobox
          as="div"
          onChange={(selectedOption) => {
            // isCreateBot
            //   ? onChange(selectedOption.label)
            //   :
            onChange(selectedOption);
            setOpen(false);
          }}
        >
          <Combobox.Label className="block text-sm font-medium leading-[6px] text-gray-900 dark:text-green-100">
            {title}
          </Combobox.Label>
          <div className="relative mt-2">
            <input
              className={`w-full rounded-md border-0 py-1.5 pl-3 pr-10 bg-white dark:bg-gray-900 text-gray-900 dark:text-green-100 '
        } shadow-sm ring-1 sm:text-sm sm:leading-6 ring-gray-400`}
              onChange={(event) => {
                setQuery(event.target.value);
                setField(name, event.target.value, false);
              }}
              onBlur={handleInputBlur}
              onFocus={handleInputFocus}
              value={selectedValue?.length > 0 ? selectedValue : query}
            />
            <Combobox.Button
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none"
            >
              <BsChevronDown
                className="h-4 w-4 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
            <Transition show={open}>
              {filteredData.length > 0 && (
                <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-gray-400 sm:text-sm">
                  {filteredData.map((person) => (
                    <Combobox.Option
                      key={person.value}
                      value={person}
                      className={({ active }) =>
                        classNames(
                          'relative cursor-default select-none py-2 pl-3 pr-9',
                          active
                            ? 'text-green-100'
                            : 'text-gray-900 dark:text-green-100 hover:text-green-100'
                        )
                      }
                    >
                      {({ selected }) => (
                        <>
                          <span
                            className={classNames(
                              'block truncate',
                              selected && 'font-semibold text-green-100'
                            )}
                          >
                            {person.label}
                          </span>
                        </>
                      )}
                    </Combobox.Option>
                  ))}
                </Combobox.Options>
              )}
            </Transition>
          </div>
        </Combobox>
      )}
    </>
  );
}

export default ComboBox;

import React, { useState, Fragment } from 'react';
import { Combobox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

const coins = [
  { coins: 1, name: 'Bitcoin' },
  { coins: 2, name: 'Nickel' },
  { coins: 3, name: 'Dime' },
  { coins: 4, name: 'Quarter' },
  { coins: 5, name: 'Half Dollar' },
  { coins: 6, name: 'Dollar' },
];

const CoinSelect = ({setTimelineStep}) => {
  const [selected, setSelected] = useState('');
  const [query, setQuery] = useState('');

  const filteredCoins =
    query === ''
      ? coins
      : coins.filter((person) =>
          person.name
            .toLowerCase()
            .replace(/\s+/g, '')
            .includes(query.toLowerCase().replace(/\s+/g, ''))
        );
  
  const handleSelectionChange = (newSelection) => {
    console.log(newSelection);
    if (newSelection === '') {
      setSelected('');
      setTimelineStep(0)
    } else {
      setSelected(newSelection);
      setTimelineStep(1)
    }
    setQuery('');
  };

  return (
    <Combobox value={selected} onChange={handleSelectionChange}>
      <div className="relative mt-1 pl-2">
        <Combobox.Button className="relative w-full cursor-default overflow-hidden rounded-lg bg-gray-50 dark:!bg-gray-800 text-left shadow-md focus:outline-none sm:text-sm">
          <Combobox.Input
            className="w-full border-none py-2 pl-3 pr-10 bg-gray-50 dark:!bg-gray-800 text-sm leading-5 outline-none text-gray-900 dark:text-gray-300 focus:ring-0"
            displayValue={(person) => person.name}
            placeholder='select'
            onChange={(event) => setQuery(event.target.value)}
          />
          <div className="absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </div>
        </Combobox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Combobox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
            {filteredCoins.length === 0 && query !== '' ? (
              <div className="relative cursor-default select-none px-4 py-2 text-gray-700">
                Nothing found.
              </div>
            ) : (
              filteredCoins.map((person) => (
                <Combobox.Option
                  key={person.id}
                  className={({ active }) =>
                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                      active ? 'bg-teal-600 text-white' : 'text-gray-900 dark:text-gray-300'
                    }`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`block truncate ${
                          selected ? 'font-medium' : 'font-normal'
                        }`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                            active ? 'text-white' : 'text-teal-600'
                          }`}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Combobox.Option>
              ))
            )}
          </Combobox.Options>
        </Transition>
      </div>
    </Combobox>
  );
};

export default CoinSelect;
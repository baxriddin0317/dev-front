import React from 'react';
import { Select } from '@windmill/react-ui';
import countries from 'i18n-iso-countries';
// Import the languages you want to use
import enLocale from 'i18n-iso-countries/langs/en.json';

function SelectCountry({ setCountry, register, name, label }) {
  // Have to register the languages you want to use
  countries.registerLocale(enLocale);

  // Returns an object not a list
  const countryObj = countries.getNames('en', { select: 'official' });

  const countryArr = Object.entries(countryObj).map(([key, value]) => {
    return {
      label: value,
      value: key,
    };
  });
  return (
    <Select
      onChange={(e) => setCountry(e.target.value)}
      className="border h-12 text-sm focus:outline-none block w-full bg-gray-100 dark:bg-white border-transparent focus:bg-white"
      name={name}
      {...register(`${name}`, {
        required: `${label} is required!`,
      })}
    >
      <option value="">Select Country</option>
      {!!countryArr?.length &&
        countryArr.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
    </Select>
  );
}

export default SelectCountry;

import React, { useState } from 'react';
import Datepicker, { DateValueType } from 'react-tailwindcss-datepicker';
import { FieldValues } from 'react-hook-form';

type DatePickerValue = {
  startDate: string | null;
  endDate: string | null;
};

interface IProps {
  field: FieldValues;
}

const DatePicker = ({ field }: IProps) => {
  const [value, setValue] = useState<DatePickerValue>({
    startDate: field.value || null,
    endDate: field.value || null,
  });

  const handleValueChange = (value: DateValueType) => {
    setValue(value as DatePickerValue);

    if (value) {
      field.onChange(value.startDate);
    }
  };

  return (
    <div className="mb-6">
      <div className="text-sm font-medium leading-6 text-gray-900 mb-1">
        Registered at
      </div>
      <Datepicker
        containerClassName={'relative w-full'}
        inputClassName={
          'relative outline-0 block w-full rounded-md border-0 px-4 py-3.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-mainBlue sm:text-sm sm:leading-6'
        }
        toggleClassName={
          'absolute right-0 top-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed'
        }
        primaryColor={'blue'} // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        asSingle={true} // @ts-ignore
        value={value}
        onChange={handleValueChange}
        useRange={false}
        placeholder={'Registration date'}
      />
    </div>
  );
};
export default DatePicker;

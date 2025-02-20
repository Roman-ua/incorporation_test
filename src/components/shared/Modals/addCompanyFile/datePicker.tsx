import React, { useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { format, isValid, parse, startOfToday } from 'date-fns';
import useOutsideClick from '../../../../utils/hooks/useOutsideClick';
import { classNames } from '../../../../utils/helpers';

const customTheme = {
  root: {
    base: 'relative',
  },
  popup: {
    root: {
      base: 'absolute top-10 z-50 block pt-2',
      inline: 'relative top-0 z-auto',
      inner: 'inline-block rounded-lg bg-white p-2 shadow-lg dark:bg-gray-700',
    },
    header: {
      base: '',
      title:
        'px-2 py-3 text-center font-semibold text-gray-900 dark:text-white',
      selectors: {
        base: 'mb-2 flex justify-between',
        button: {
          base: 'rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
          prev: '',
          next: '',
          view: '',
        },
      },
    },
    view: {
      base: 'p-1',
    },
    footer: {
      base: 'mt-2 flex space-x-2',
      button: {
        base: 'w-full rounded-md px-5 py-2 text-center text-sm font-medium transition-all duration-150 ease-in-out',
        today:
          'block rounded-md bg-white px-3 py-2 border text-center text-sm shadow-sm text-gray-900 hover:text-white hover:bg-mainBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
        clear:
          'block rounded-md bg-white px-3 py-2 border text-center text-sm shadow-sm text-gray-900 hover:text-white hover:bg-mainBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
      },
    },
  },
  views: {
    days: {
      header: {
        base: 'mb-1 grid grid-cols-7',
        title:
          'h-6 text-center text-sm font-medium leading-6 text-gray-500 dark:text-gray-400',
      },
      items: {
        base: 'grid w-64 grid-cols-7',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600 transition-all duration-150 ease-in-out',
          selected: 'bg-mainBlue text-white hover:bg-sideBarBlue',
          disabled: 'text-gray-500',
        },
      },
    },
    months: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-mainBlue text-white hover:bg-sidebarBlue',
          disabled: 'text-gray-500',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-mainBlue text-white hover:bg-sidebarBlue',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-mainBlue text-white hover:bg-sidebarBlue',
          disabled: 'text-gray-500',
        },
      },
    },
  },
};
interface IProps {
  value?: string;
  mandatoryError?: boolean;
  setValue: (value: string) => void;
}
const DatePicker = ({ value, setValue, mandatoryError }: IProps) => {
  const dateRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const inputValueRef = React.useRef('');

  const today = startOfToday();

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(value || '');

  const [calendarValue, setCalendarValue] = React.useState<Date | null>(null);

  const validateDateInput = (input: string, isKb: boolean) => {
    if (!isKb) {
      setInputValue(input);
      setValue(input);
    }

    const formats = [
      'MM.dd.yyyy',
      'MM dd yyyy',
      'MM/dd/yyyy',
      'MMM dd yyyy',
      'MMM dd, yyyy',
      'MMMM dd yyyy',
    ];

    for (const formatI of formats) {
      const parsedDate = parse(input, formatI, new Date());

      if (isValid(parsedDate) && isKb) {
        setInputValue(format(parsedDate as Date, 'MMMM dd, yyyy'));
        setValue(format(parsedDate as Date, 'MMMM dd, yyyy'));
      }

      if (isValid(parsedDate)) {
        setCalendarValue(parsedDate);
        setOpen(false);
        const timer = setTimeout(() => {
          setOpen(true);
          clearTimeout(timer);
        }, 100);
        return;
      }
      setOpen(false);
      const timer = setTimeout(() => {
        setOpen(true);
        clearTimeout(timer);
      }, 100);
      setCalendarValue(today);
    }

    return null;
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      validateDateInput(inputValueRef.current, true);
      setOpen(false);
    }
  };

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  useOutsideClick(dateRef, inputRef, () => setOpen(false));

  return (
    <div className="relative">
      <input
        ref={inputRef}
        className={classNames(
          'block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500 hover:cursor-pointer',
          mandatoryError && !inputValue ? 'bg-red-50' : 'bg-white'
        )}
        value={inputValue}
        onChange={(e) => validateDateInput(e.target.value, false)}
        onFocus={() => setOpen(true)}
        type="text"
        onKeyDown={handleKeyDown}
        placeholder="Choose Date" // Добавлен placeholder
      />
      {open && (
        <div ref={dateRef} className="absolute left-0 top-10 z-40">
          <Datepicker
            value={calendarValue}
            defaultValue={today}
            weekStart={1}
            inline
            theme={customTheme}
            onChange={(date) => {
              if (date === null) {
                setInputValue('');
                setValue('');
                setCalendarValue(null);
              } else {
                const formattedDate = format(date, 'MMMM dd, yyyy');
                setInputValue(formattedDate);
                setValue(formattedDate);
                setCalendarValue(date);
              }
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

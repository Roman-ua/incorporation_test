import React, { useEffect } from 'react';
import { Datepicker } from 'flowbite-react';
import { format, isValid, parse, startOfToday } from 'date-fns';
import useOutsideClick from '../../../../utils/hooks/useOutsideClick';

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
          base: 'rounded-lg bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
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
        base: 'w-full rounded-lg px-5 py-2 text-center text-sm font-medium transition-all duration-150 ease-in-out',
        today:
          'text-white hover:bg-sideBarBlue text-[12px] bg-white mr-2 border text-gray-900 py-2 px-3.5 rounded-lg transition-all duration-150 ease-in-out hover:text-white hover:cursor-pointer hover:border-sideBarBlue',
        clear:
          'text-[12px] py-2 px-3.5 rounded-lg bg-gray-300 text-gray-500 hover:bg-sideBarBlue hover:text-white transition-all duration-150 ease-in-out hover:cursor-pointer',
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
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500',
        },
      },
    },
    years: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500',
        },
      },
    },
    decades: {
      items: {
        base: 'grid w-64 grid-cols-4',
        item: {
          base: 'block flex-1 cursor-pointer rounded-lg border-0 text-center text-sm font-semibold leading-9 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-600',
          selected: 'bg-cyan-700 text-white hover:bg-cyan-600',
          disabled: 'text-gray-500',
        },
      },
    },
  },
};
const DatePicker = () => {
  const dateRef = React.useRef(null);
  const inputRef = React.useRef(null);
  const inputValueRef = React.useRef('');

  const today = startOfToday();

  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(
    format(today, 'MMMM dd, yyyy')
  );
  const [calendarValue, setCalendarValue] = React.useState<Date | null>(today);

  const validateDateInput = (input: string, isKb: boolean) => {
    if (!isKb) {
      setInputValue(input);
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
        setInputValue(format(parsedDate as Date, 'MMMM dd, yyyy') || '');
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
        className="rounded border border-gray-300 px-2 py-1.5 w-full text-sm text-gray-900 focus:outline-none"
        value={inputValue}
        onChange={(e) => validateDateInput(e.target.value, false)}
        onFocus={() => setOpen(true)}
        type="text"
        onKeyDown={handleKeyDown}
      />
      {open && (
        <div ref={dateRef} className="absolute left-0 top-10">
          <Datepicker
            value={calendarValue}
            defaultValue={today}
            weekStart={1}
            inline
            theme={customTheme}
            onChange={(date) => {
              const dataValue = date === null ? today : date;
              setCalendarValue(dataValue);
              setInputValue(format(dataValue as Date, 'MMMM dd, yyyy') || '');
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

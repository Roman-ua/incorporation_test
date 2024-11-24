import React from 'react';
import { Datepicker } from 'flowbite-react';
import { format, isValid, parse, startOfToday } from 'date-fns';

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
          'bg-mainBlue text-white hover:bg-sideBarBlue dark:bg-cyan-600 dark:hover:bg-cyan-700',
        clear:
          'border border-gray-300 bg-white text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600',
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
  const today = startOfToday();
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState<string>(
    format(today, 'MMM dd yyyy')
  );
  const [calendarValue, setCalendarValue] = React.useState<Date | null>(today);

  const validateDateInput = (input: string) => {
    setInputValue(input);
    const formats = ['MM/dd/yyyy', 'MM.dd.yyyy', 'MMM dd yyyy'];

    for (const formatI of formats) {
      const parsedDate = parse(input, formatI, new Date());

      if (isValid(parsedDate)) {
        return setCalendarValue(parsedDate);
      }
    }

    return null;
  };

  return (
    <div className="relative">
      <input
        className="rounded border border-gray-300 px-2 py-1.5 w-full text-sm text-gray-900 focus:outline-none"
        value={inputValue}
        onChange={(e) => validateDateInput(e.target.value)}
        // onBlur={() => {
        //   const timer = setTimeout(() => {
        //     setOpen(false);
        //     clearTimeout(timer);
        //   }, 200);
        // }}
        onFocus={() => setOpen(true)}
        type="text"
      />
      {open && (
        <div className="absolute left-0 top-10">
          <Datepicker
            value={calendarValue}
            defaultValue={today}
            weekStart={1}
            inline
            theme={customTheme}
            onChange={(date) => {
              const dataValue = date === null ? today : date;

              setCalendarValue(dataValue);
              setInputValue(format(dataValue as Date, 'MMM dd yyyy') || '');
              setOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default DatePicker;

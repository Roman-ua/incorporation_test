import React, { useEffect, useState } from 'react';
import {
  add,
  eachDayOfInterval,
  endOfISOWeek,
  endOfMonth,
  format,
  getDay,
  isEqual,
  isSameMonth,
  isToday,
  parse,
  startOfISOWeek,
  startOfToday,
} from 'date-fns';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
import { FieldValues } from 'react-hook-form';
import SectionHeading from './SectionHeading';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const colStartClasses = [
  '',
  'col-start-1',
  'col-start-3',
  'col-start-4',
  'col-start-5',
  'col-start-6',
  'col-start-7',
];

interface IProps {
  field: FieldValues;
}

const CustomCalendar = ({ field }: IProps) => {
  const today = field.value || startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, 'MMM-yyyy'));
  const firstDayCurrentMonth = parse(currentMonth, 'MMM-yyyy', new Date());

  useEffect(() => {
    if (!field.value) {
      field.onChange(format(today, 'MMMM dd, yyyy'));
    }
  }, []);

  const days = eachDayOfInterval({
    start: startOfISOWeek(firstDayCurrentMonth),
    end: endOfISOWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, 'MMM-yyyy'));
  }

  return (
    <>
      <SectionHeading text={'Registration Date'} status={selectedDay} />
      <div className="grid gap-5 grid-cols-2 max-lg:grid-cols-1 pb-16">
        <div>
          <div className="overflow-hidden rounded-lg bg-white max-sm:py-6">
            <dd className="text-xl font-bold tracking-tight text-gray-900">
              {format(selectedDay, 'MMMM dd, yyyy')}
            </dd>
          </div>
        </div>
        <div className="relative min-h-72">
          <div className="max-lg:mt-4 text-center absolute left-0 top-0 right-0">
            <div className="flex items-center text-gray-900">
              <button
                type="button"
                onClick={previousMonth}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Previous month</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <div className="flex-auto text-sm font-semibold">
                {format(firstDayCurrentMonth, 'MMMM yyyy')}
              </div>
              <button
                type="button"
                onClick={nextMonth}
                className="-m-1.5 flex flex-none items-center justify-center p-1.5 text-gray-400 hover:text-gray-500"
              >
                <span className="sr-only">Next month</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 grid grid-cols-7 text-xs leading-6 text-gray-500">
              <div>M</div>
              <div>T</div>
              <div>W</div>
              <div>T</div>
              <div>F</div>
              <div>S</div>
              <div>S</div>
            </div>
            <div className="isolate mt-2 grid grid-cols-7 gap-px rounded-lg bg-gray-200 text-sm shadow ring-1 ring-gray-200">
              {days.map((day, dayIdx) => {
                return (
                  <div
                    key={day.toString()}
                    className={classNames(
                      dayIdx === 0 && colStartClasses[getDay(day)]
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => {
                        if (isSameMonth(day, firstDayCurrentMonth)) {
                          setSelectedDay(day);
                          field.onChange(format(day, 'MMMM dd, yyyy'));
                        }
                      }}
                      className={classNames(
                        isEqual(day, selectedDay) && 'text-white',
                        !isEqual(day, selectedDay) &&
                          isToday(day) &&
                          'text-red-500',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          isSameMonth(day, firstDayCurrentMonth)
                          ? 'bg-white'
                          : 'bg-gray-50',
                        !isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          !isSameMonth(day, firstDayCurrentMonth) &&
                          'text-gray-400',
                        isEqual(day, selectedDay) &&
                          !isToday(day) &&
                          'bg-gray-900',
                        !isEqual(day, selectedDay) && 'hover:bg-gray-200',
                        (isEqual(day, selectedDay) || isToday(day)) &&
                          'font-semibold',
                        dayIdx === 0 && 'rounded-tl-lg',
                        dayIdx === 6 && 'rounded-tr-lg',
                        dayIdx === days.length - 7 && 'rounded-bl-lg',
                        dayIdx === days.length - 1 && 'rounded-br-lg',
                        'py-1.5 bg-white hover:bg-gray-100 focus:z-10 w-full'
                      )}
                    >
                      <time
                        className={classNames(
                          'mx-auto flex h-7 w-7 items-center justify-center rounded-full',
                          isEqual(day, selectedDay) && 'bg-black'
                        )}
                        dateTime={format(day, 'yyyy-MM-dd')}
                      >
                        {format(day, 'd')}
                      </time>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomCalendar;
//

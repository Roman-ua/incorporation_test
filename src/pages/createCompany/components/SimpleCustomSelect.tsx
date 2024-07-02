import React, { useEffect, useState } from 'react';
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

type ListItem = {
  id: number;
  name: string;
};

interface IProps {
  changeEvent: (value: string) => void;
  list: ListItem[];
  title: string;
}
export default function SimpleCustomSelect({
  changeEvent,
  list,
  title,
}: IProps) {
  const [selected, setSelected] = useState(list[0]);

  useEffect(() => {
    changeEvent(selected.name);
  }, [selected]);

  return (
    <Listbox value={selected} onChange={setSelected}>
      {() => (
        <div className="w-full">
          <Label className="block text-sm font-medium leading-6 text-gray-900">
            {title}
          </Label>
          <div className="relative mt-2">
            <ListboxButton className="relative w-full cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-mainBlue sm:text-sm sm:leading-6">
              <span className="block truncate">{selected.name}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm">
              {list.map((person) => (
                <ListboxOption
                  key={person.id}
                  className={({ focus }) =>
                    classNames(
                      focus ? 'bg-mainBlue text-white' : '',
                      !focus ? 'text-gray-900' : '',
                      'relative cursor-default select-none py-2 pl-3 pr-9'
                    )
                  }
                  value={person}
                >
                  {({ selected, focus }) => (
                    <>
                      <span
                        className={classNames(
                          selected ? 'font-semibold' : 'font-normal',
                          'block truncate'
                        )}
                      >
                        {person.name}
                      </span>

                      {selected ? (
                        <span
                          className={classNames(
                            focus ? 'text-white' : 'text-mainBlue',
                            'absolute inset-y-0 right-0 flex items-center pr-4'
                          )}
                        >
                          <CheckIcon className="h-5 w-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </ListboxOption>
              ))}
            </ListboxOptions>
          </div>
        </div>
      )}
    </Listbox>
  );
}

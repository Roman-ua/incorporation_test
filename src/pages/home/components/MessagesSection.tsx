import React, { useEffect } from 'react';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { EllipsisVerticalIcon } from '@heroicons/react/20/solid';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const mockMessages = [
  {
    id: '1',
    subject: 'Documents',
    message: 'Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'unread',
  },
  {
    id: '2',
    subject: '2 Documents',
    message: '2 Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'unread',
  },
  {
    id: '3',
    subject: '3 Documents',
    message: '3 Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'unread',
  },
  {
    id: '4',
    subject: '4 Documents',
    message: '4 Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'read',
  },
  {
    id: '5',
    subject: '5 Documents',
    message: '5 Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'unread',
  },
  {
    id: '6',
    subject: '6 Documents',
    message: '6 Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'read',
  },
  {
    id: '7',
    subject: '7 Documents',
    message: 'Please send me the documents',
    author: 'John Doe',
    date: '2021-08-12',
    time: '12:00:00',
    status: 'read',
  },
];

const statusColorHandler = (status: string) => {
  switch (status) {
    case 'unread':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'read':
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
    default:
      return 'bg-gray-50 text-gray-700 ring-gray-600/20';
  }
};

const MessagesSection = () => {
  const [renderMessages, setRenderMessages] = React.useState(mockMessages);
  const [messages, setMessages] = React.useState(mockMessages);

  useEffect(() => {
    setMessages(mockMessages);
  }, []);

  useEffect(() => {
    setRenderMessages(messages);
  }, [messages]);

  const filtersHandler = (filter: string) => {
    if (filter === 'read') {
      setRenderMessages(messages.filter((item) => item.status === 'read'));
      return;
    }
    if (filter === 'unread') {
      setRenderMessages(messages.filter((item) => item.status === 'unread'));
      return;
    }

    setRenderMessages(messages);
  };

  return (
    <div className="w-1/2 mr-2 p-4 rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-700 mb-3">List of Messages</span>
        <div className="ring-1 ring-inset bg-green-50 text-green-700 ring-green-600/20 rounded-full w-6 h-6 text-xs flex items-center justify-center">
          {messages.filter((item) => item.status === 'unread').length}
        </div>
      </div>
      <div className="overflow-y-scroll h-80 no-scrollbar">
        <ul role="list">
          {renderMessages.map((msg) => (
            <li
              key={msg.id}
              className="flex items-center justify-between px-2 py-3 border-b  hover:cursor-pointer hover:bg-gray-50 transition-all duration-150 ease-in-out"
            >
              <div className="min-w-0">
                <div className="flex items-start gap-x-3">
                  <p className="text-sm font-semibold leading-6 text-gray-700">
                    Subject: {msg.subject}
                  </p>
                  <p
                    className={classNames(
                      'capitalize mr-3 w-fit inline-flex items-center rounded-md  px-2 py-0.5 text-xs font-medium  ring-1 ring-inset',
                      statusColorHandler(msg.status)
                    )}
                  >
                    {msg.status}
                  </p>
                </div>
                <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                  <p className="whitespace-nowrap">
                    Sent{' '}
                    <time dateTime={msg.time}>
                      {msg.date} at {msg.time}
                    </time>
                  </p>
                  <svg viewBox="0 0 2 2" className="h-0.5 w-0.5 fill-current">
                    <circle r={1} cx={1} cy={1} />
                  </svg>
                  <p className="truncate">Sent by {msg.author}</p>
                </div>
              </div>
              <div className="flex flex-none items-center gap-x-4">
                <div className="hidden rounded-md bg-white px-2.5 py-1.5 text-xs font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block">
                  View<span className="sr-only">, {msg.subject}</span>
                </div>
                <Menu as="div" className="relative flex-none">
                  <MenuButton className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                    <span className="sr-only">Open options</span>
                    <EllipsisVerticalIcon
                      aria-hidden="true"
                      className="h-5 w-5"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
                    <MenuItem>
                      <a
                        href="#"
                        className="block px-3 py-1 text-sm leading-6 text-gray-900 data-[focus]:bg-gray-50"
                      >
                        Delete<span className="sr-only">, {msg.subject}</span>
                      </a>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center w-full justify-end mt-4">
        <span
          className="text-xs ml-2 hover:cursor-pointer"
          onClick={() => filtersHandler('all')}
        >
          All
        </span>
        <span
          className="text-xs ml-2 hover:cursor-pointer"
          onClick={() => filtersHandler('read')}
        >
          Read
        </span>
        <span
          className="text-xs ml-2 hover:cursor-pointer"
          onClick={() => filtersHandler('unread')}
        >
          Unread
        </span>
      </div>
    </div>
  );
};

export default MessagesSection;

import CheckBox from '../../../components/shared/CheckBox';
import React, { useEffect } from 'react';

function classNames(...classes: (string | boolean)[]) {
  return classes.filter(Boolean).join(' ');
}

const mockListOfToDos = [
  {
    id: 1,
    title: '1 task Title lorem ipsum dolor sit amet',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 2,
    title: '2 task Title lorem ipsum dolor',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 3,
    title: '3 task Title lorem ipsum',
    statusDone: false,
    priority: 'middle',
  },
  {
    id: 4,
    title: '4 task Title lorem ipsum dolor sit amet',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 5,
    title: '5 task Title',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 6,
    title: '6 task Title',
    statusDone: false,
    priority: 'high',
  },
  {
    id: 7,
    title: '7 task Title ipsum dolor sit amet',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 8,
    title: '8 task Title',
    statusDone: false,
    priority: 'high',
  },
  {
    id: 9,
    title: '9 task Title',
    statusDone: false,
    priority: 'normal',
  },
  {
    id: 10,
    title: '10 task Title',
    statusDone: false,
    priority: 'normal',
  },
];

const priorityColorHandler = (priority: string) => {
  switch (priority) {
    case 'normal':
      return 'bg-green-50 text-green-700 ring-green-600/20';
    case 'middle':
      return 'bg-yellow-50 text-yellow-700 ring-yellow-600/20';
    case 'high':
      return 'bg-red-50 text-red-700 ring-red-600/20';
    default:
      return 'bg-green-50 text-green-700 ring-green-600/20';
  }
};

const TasksSection = () => {
  const [renderTasks, setRenderTasks] = React.useState(mockListOfToDos);
  const [tasks, setTasks] = React.useState(mockListOfToDos);

  useEffect(() => {
    setRenderTasks(tasks);
  }, [tasks]);

  const handleTaskClick = (id: number) => {
    setTasks((prev) => {
      return prev.map((prevItem) => {
        if (prevItem.id === id) {
          return {
            ...prevItem,
            statusDone: !prevItem.statusDone,
          };
        }
        return prevItem;
      });
    });
  };

  const filtersHandler = (filter: string) => {
    if (filter === 'done') {
      setRenderTasks(tasks.filter((item) => item.statusDone === true));
      return;
    }
    if (filter === 'waiting') {
      setRenderTasks(tasks.filter((item) => item.statusDone === false));
      return;
    }

    setRenderTasks(tasks);
  };
  return (
    <div className="w-1/2 p-4 ml-2 rounded shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]">
      <div className="font-bold text-gray-700 mb-3">List of tasks</div>
      <div className="overflow-y-scroll h-80 no-scrollbar">
        {renderTasks.map((item) => {
          return (
            <div
              key={item.id}
              onClick={() => handleTaskClick(item.id)}
              className="flex items-center justify-between px-2 py-3 border-b  hover:cursor-pointer hover:bg-gray-50 transition-all duration-150 ease-in-out"
            >
              <CheckBox
                roundedStyle={'rounded'}
                wrapperSize={'w-4 h-4'}
                iconSize={'w-2 h-2'}
                isItemHovered={false}
                isItemSelected={item.statusDone}
              />
              <div className="flex items-center">
                <div className=""></div>
                <span
                  className={classNames(
                    'capitalize mr-3 w-fit inline-flex items-center rounded-md  px-2 py-0.5 text-xs font-medium  ring-1 ring-inset',
                    priorityColorHandler(item.priority)
                  )}
                >
                  {item.priority}
                </span>
                <div className="text-sm font-semibold text-gray-700">
                  {item.title}
                </div>
              </div>
            </div>
          );
        })}
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
          onClick={() => filtersHandler('done')}
        >
          Done
        </span>
        <span
          className="text-xs ml-2 hover:cursor-pointer"
          onClick={() => filtersHandler('waiting')}
        >
          Waiting
        </span>
      </div>
    </div>
  );
};

export default TasksSection;

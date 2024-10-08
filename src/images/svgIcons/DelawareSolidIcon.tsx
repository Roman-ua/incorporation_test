import React from 'react';

interface IProps {
  extraClass: {
    wrapper: string;
    path: string;
  };
}

const DelawareSolidIcon = ({ extraClass }: IProps) => {
  return (
    <svg
      className={`${extraClass.wrapper}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 100 100"
    >
      <path
        className={`${extraClass.path}`}
        d="m69.636 92.065-1.774-18.572c-.121-1.236-.97-2.099-2.063-2.099-.444 0-.896.146-1.306.427a.405.405 0 0 1-.198.043.628.628 0 0 1-.436-.168l-6.351-6.574c-.4-.418-.849-1.349-.926-1.922l-.314-2.446c-.15-1.134-.883-2.585-1.71-3.378l-1.974-1.887c-.331-.315-.62-1.099-.577-1.556.039-.396.935-9.793-.341-14.006-1.327-4.373-6.906-8.552-7.143-8.729-.289-.215-.517-.81-.448-1.163l.586-3.003c.232-1.185-.138-2.813-.857-3.787l-1.31-1.762c-.121-.159-.09-.478.052-.616l3.145-3.024c.78-.75 1.589-2.106 1.883-3.153l.306-1.103c.142-.5.715-1.245 1.163-1.503l1.189-.694c.728-.422 1.175-1.099 1.227-1.857.057-.758-.292-1.495-.952-2.016C50.378 7.413 47.28 5 43.201 5c-3.02 0-7.32 1.366-10.861 7.755a2.728 2.728 0 0 0-1.258.763 2.739 2.739 0 0 0-.728 2.055l5.006 76.14a2.998 2.998 0 0 0 2.921 2.783L66.922 95h.052c.763 0 1.491-.314 1.99-.866.5-.551.745-1.306.672-2.069z"
      />
    </svg>
  );
};

export default DelawareSolidIcon;

import React from 'react';
interface IProps {
  extraClass: {
    wrapper: string;
    path: string;
  };
}
const TexasSolidIcon = ({ extraClass }: IProps) => {
  return (
    <svg
      className={`${extraClass.wrapper}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 100 100"
    >
      <path
        className={`${extraClass.path}`}
        d="m94.212 49.2-2.86-4.57c-.32-.51-.62-1.57-.62-2.18v-7.77c0-1.4-1-2.82-2.32-3.29l-4.92-1.76c-.95-.34-2.45-.58-3.48-.55l-12.39.34h-.12c-.73 0-1.86-.16-2.5-.36l-12.71-3.94c-.27-.08-.57-.49-.57-.78v-13.9c0-1.56-1.26-2.85-2.81-2.88l-16.8-.36h-.06c-1.52 0-2.81 1.24-2.87 2.76l-1.26 32.01c-.01.16-.16.31-.32.31H7.092c-1.36 0-1.83.78-1.97 1.12-.14.34-.36 1.22.61 2.18l8.75 8.67c.48.47 1.14 1.47 1.38 2.09l2.13 5.38c.42 1.08 1.53 2.29 2.56 2.82l6 3.06c.4.21.85.32 1.31.32 1.05 0 2.03-.56 2.55-1.46l1.53-2.63c.21-.36.85-.75 1.26-.771l2.86-.119h.07c.61 0 1.56.27 2.04.569l4.3 2.76c.53.341 1.29 1.171 1.59 1.73l10.46 19.74c.57 1.069 1.88 2.1 3.05 2.399l10.19 2.57c.22.06.45.09.67.09.67 0 1.28-.29 1.67-.78.42-.529.55-1.239.37-1.989l-1.43-5.891c-.13-.529-.02-1.529.22-2.02l3.42-6.94c.26-.529 1-1.33 1.51-1.63l17.18-10.06c1.06-.62 2.02-1.99 2.24-3.2l1.32-7.34c.21-1.148-.1-2.758-.72-3.748z"
      />
    </svg>
  );
};

export default TexasSolidIcon;

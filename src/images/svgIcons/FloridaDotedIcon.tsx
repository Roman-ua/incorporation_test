import React from 'react';
interface IProps {
  extraClass: {
    wrapper: string;
    path: string;
  };
}
const FloridaDotedIcon = ({ extraClass }: IProps) => {
  return (
    // <svg
    //   className={`${extraClass.wrapper}`}
    //   xmlns="http://www.w3.org/2000/svg"
    //   data-name="Layer 1"
    //   viewBox="0 0 100 100"
    // >
    //   <path
    //     className={`${extraClass.path}`}
    //     d="M83.33 88.47a3.47 3.47 0 0 1-2.39-.7 2.64 2.64 0 0 1-.85-1.89c-.17-2.51-1.94-6.19-2.61-6.58a6.12 6.12 0 0 0-1-.23c-1.17-.2-2.93-.51-3.45-2.44l-.16-.63c-.45-1.73-1.13-4.33-2.58-5.64a3.52 3.52 0 0 1-.74-4.4 2.55 2.55 0 0 1 3.11-1.16 3 3 0 0 0 2.15-.3 1.49 1.49 0 0 0 .6-.49l-.09-.1a2.3 2.3 0 0 0-1.77-.25c-1.79.22-3.66 1.21-4.09 1.92a1.51 1.51 0 0 1-1.42.91c-1 0-1.57-1-2.26-2.35a12 12 0 0 0-1.46-2.28c-1.94-2.14-.43-3.78.3-4.57a5.14 5.14 0 0 0 .45-.54c.86-1.29 1.21-2.82.93-3a1.87 1.87 0 0 0-.65-.36 3 3 0 0 0-.39.33 3.5 3.5 0 0 0-.3.33c-.5.59-1.2 1.39-2.19 1.27A2 2 0 0 1 61 54c-.7-1.41-.34-2.25.21-3.52a26.26 26.26 0 0 0 1.41-3.94c1.15-4.18.94-4.49-.43-6.53l-.8-1.19c-.79-1.21-.79-1.21-1.65-1.29h-.3C58 37.42 57.5 36.26 57 35a17.17 17.17 0 0 0-4.25-6.2c-2.86-2.76-4.74-3.25-5.83-3.16a2.16 2.16 0 0 0-1.61.85c-1.15 1.51-3.8 3.68-6.48 3.51a4.77 4.77 0 0 0-2.27.61c-.93.42-2.22 1-3.14-.12a7.08 7.08 0 0 1-.75-1.2 10 10 0 0 0-4.06-4.32c-3.94-2.33-6.71-3.43-9-3.57A16.2 16.2 0 0 0 14 22.46a1 1 0 0 1-.25.06c-1.49.19-3 .29-3.63-.68a1.66 1.66 0 0 1 .1-1.84 1.58 1.58 0 0 0-.07-2.15 9.12 9.12 0 0 0-1.09-.75c-1.44-.92-2.68-1.71-2.47-2.87.13-.65.66-1.07 1.58-1.26 1.57-.31 5.44-.23 10.34-.08 2.11.06 4.09.12 4.6.07a3.23 3.23 0 0 0 1.16-.41 6.75 6.75 0 0 1 3.33-.78c.76 0 1.85 0 3-.1 3.71-.16 6.23-.23 7.28.16 1.24.47 1.25 1.78 1.26 2.73 0 1.26.12 1.48.49 1.57 1.9.49 9.35.87 17 .87 11.68 0 12.56 1.33 13 2 .23.35.43.63.61.88-.1-1.82.07-4.12 1.4-5a2.29 2.29 0 0 1 2.55.1 6.54 6.54 0 0 0 1.87.65c1.49.34 2.79.87 2.33 3.59-.45 2.52 3.61 16.48 6.51 20.07 2.3 2.81 2.57 6.78 2.74 9.41a11.55 11.55 0 0 0 .28 2.3c.1.24.3.68.56 1.27 1.61 3.58 5.37 12 4.91 16.24a84.33 84.33 0 0 1-1.89 12.34c-.15.55-.28 1.12-.42 1.69-.66 2.8-1.4 6-4.32 5.79a14.6 14.6 0 0 0-2 .06c-.47.04-.97.08-1.43.08ZM71.77 66.64a.62.62 0 0 0-.51.35 1.51 1.51 0 0 0 .38 1.89c1.88 1.71 2.65 4.66 3.17 6.61l.16.61c.17.64.7.8 1.87 1a6.46 6.46 0 0 1 1.44.36c1.73.74 3.64 5.71 3.81 8.28a.68.68 0 0 0 .17.51c.33.29 1.46.21 2.38.14a15.27 15.27 0 0 1 2.25-.06c1.16.1 1.63-1.64 2.25-4.26.14-.6.28-1.19.44-1.76a84.73 84.73 0 0 0 1.82-12c.4-3.74-3.33-12.07-4.74-15.21-.28-.62-.49-1.09-.59-1.35a10.6 10.6 0 0 1-.42-2.94c-.17-2.51-.4-6-2.3-8.27-3.18-3.89-7.53-18.32-7-21.72.14-.86 0-1.06 0-1.06a3.37 3.37 0 0 0-.82-.25 8.23 8.23 0 0 1-2.42-.87.86.86 0 0 0-.46-.16c-.25.12-.73 1.52-.41 4.24.06.5.21 1.82-.83 2.21s-1.86-.38-3.53-2.89C67.85 20 66.53 19 56.62 19c-6.87 0-15.07-.32-17.45-.93-2-.51-2-2.45-2-3.49a5.8 5.8 0 0 0-.06-.9 40.47 40.47 0 0 0-6.4 0c-1.21.05-2.32.1-3.11.1a4.71 4.71 0 0 0-2.45.58 5 5 0 0 1-1.82.59c-.62.07-2.18 0-4.88 0-3.11-.09-7.22-.22-9.18-.05.3.21.63.42.87.57a8.85 8.85 0 0 1 1.45 1 3.51 3.51 0 0 1 .56 4.2c.26 0 .65 0 1.21-.1a17.63 17.63 0 0 1 6.38-1.2c2.65.17 5.61 1.32 9.89 3.85a11.9 11.9 0 0 1 4.8 5.08 7 7 0 0 0 .46.79 7.21 7.21 0 0 0 .86-.34A6.44 6.44 0 0 1 39 28c1.75.12 3.83-1.5 4.69-2.64a4.1 4.1 0 0 1 3.06-1.64c2.17-.18 4.65 1.08 7.37 3.71a19 19 0 0 1 4.7 6.85c.38.9.58 1.3.77 1.31h.29c1.78.15 2 .45 3.16 2.18l.77 1.17c1.67 2.47 2 3.32.71 8.18a31 31 0 0 1-1.52 4.2c-.53 1.2-.54 1.27-.26 1.82.13-.14.28-.32.39-.43a6 6 0 0 1 .45-.5c1-.93 1.95-1.28 3.56-.13 1.83 1.31.52 4.34-.42 5.76a6.89 6.89 0 0 1-.65.78c-.81.88-1 1.12-.29 1.87a13.42 13.42 0 0 1 1.74 2.69c.16.29.35.65.52.93a9.08 9.08 0 0 1 5.24-2.46 4 4 0 0 1 3.44.83 2 2 0 0 1 .33 2.62A4.8 4.8 0 0 1 72 66.68a.48.48 0 0 0-.23-.04ZM11.86 21.16Zm73 50a2 2 0 0 1-.34 0c-1-.19-1.55-1.13-2-2a4.14 4.14 0 0 0-.6-.88c-1.45-1-2.16-1.92-2.17-2.91a2.32 2.32 0 0 1 1.14-1.95l1.9-1.21c2.12-1.35 2.88-.85 4.24.71l.58.65a3.93 3.93 0 0 1 1.06 3 6 6 0 0 1-2.36 4 2.29 2.29 0 0 1-1.46.56Zm-.16-7.74a9 9 0 0 0-.87.49L82 65.06c-.22.16-.25.27-.25.27s0 .43 1.28 1.26a4.45 4.45 0 0 1 1.23 1.56 4.81 4.81 0 0 0 .66 1A1.71 1.71 0 0 1 85 69a4.09 4.09 0 0 0 1.62-2.6 2 2 0 0 0-.55-1.52l-.61-.68a5.76 5.76 0 0 0-.77-.81Z"
    //   />
    // </svg>
    <svg
      className={`${extraClass.wrapper}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      // style={{
      //   enableBackground: 'new 0 0 100 100',
      // }}
      viewBox="0 0 100 100"
    >
      <circle cx={1.2} cy={4.7} r={1.2} />
      <circle cx={4.7} cy={4.7} r={1.2} />
      <circle cx={8.2} cy={4.7} r={1.2} />
      <circle cx={11.7} cy={4.7} r={1.2} />
      <circle cx={15.2} cy={4.7} r={1.2} />
      <circle cx={18.6} cy={4.7} r={1.2} />
      <circle cx={22.1} cy={4.7} r={1.2} />
      <circle cx={25.6} cy={4.7} r={1.2} />
      <circle cx={29.1} cy={4.7} r={1.2} />
      <circle cx={32.6} cy={4.7} r={1.2} />
      <circle cx={36.1} cy={4.7} r={1.2} />
      <circle cx={74.4} cy={4.7} r={1.2} />
      <circle cx={77.9} cy={4.7} r={1.2} />
      <circle cx={4.7} cy={8.2} r={1.2} />
      <circle cx={8.2} cy={8.2} r={1.2} />
      <circle cx={11.7} cy={8.2} r={1.2} />
      <circle cx={15.2} cy={8.2} r={1.2} />
      <circle cx={18.6} cy={8.2} r={1.2} />
      <circle cx={22.1} cy={8.2} r={1.2} />
      <circle cx={25.6} cy={8.2} r={1.2} />
      <circle cx={29.1} cy={8.2} r={1.2} />
      <circle cx={32.6} cy={8.2} r={1.2} />
      <circle cx={36.1} cy={8.2} r={1.2} />
      <circle cx={39.5} cy={8.2} r={1.2} />
      <circle cx={43} cy={8.2} r={1.2} />
      <circle cx={46.5} cy={8.2} r={1.2} />
      <circle cx={50} cy={8.2} r={1.2} />
      <circle cx={53.5} cy={8.2} r={1.2} />
      <circle cx={57} cy={8.2} r={1.2} />
      <circle cx={60.5} cy={8.2} r={1.2} />
      <circle cx={63.9} cy={8.2} r={1.2} />
      <circle cx={67.4} cy={8.2} r={1.2} />
      <circle cx={74.4} cy={8.2} r={1.2} />
      <circle cx={77.9} cy={8.2} r={1.2} />
      <circle cx={81.4} cy={8.2} r={1.2} />
      <circle cx={4.7} cy={11.7} r={1.2} />
      <circle cx={8.2} cy={11.7} r={1.2} />
      <circle cx={11.7} cy={11.7} r={1.2} />
      <circle cx={15.2} cy={11.7} r={1.2} />
      <circle cx={18.6} cy={11.7} r={1.2} />
      <circle cx={22.1} cy={11.7} r={1.2} />
      <circle cx={25.6} cy={11.7} r={1.2} />
      <circle cx={29.1} cy={11.7} r={1.2} />
      <circle cx={32.6} cy={11.7} r={1.2} />
      <circle cx={36.1} cy={11.7} r={1.2} />
      <circle cx={39.5} cy={11.7} r={1.2} />
      <circle cx={43} cy={11.7} r={1.2} />
      <circle cx={46.5} cy={11.7} r={1.2} />
      <circle cx={50} cy={11.7} r={1.2} />
      <circle cx={53.5} cy={11.7} r={1.2} />
      <circle cx={57} cy={11.7} r={1.2} />
      <circle cx={60.5} cy={11.7} r={1.2} />
      <circle cx={63.9} cy={11.7} r={1.2} />
      <circle cx={67.4} cy={11.7} r={1.2} />
      <circle cx={70.9} cy={11.7} r={1.2} />
      <circle cx={74.4} cy={11.7} r={1.2} />
      <circle cx={77.9} cy={11.7} r={1.2} />
      <circle cx={81.4} cy={11.7} r={1.2} />
      <circle cx={22.1} cy={15.2} r={1.2} />
      <circle cx={25.6} cy={15.2} r={1.2} />
      <circle cx={29.1} cy={15.2} r={1.2} />
      <circle cx={32.6} cy={15.2} r={1.2} />
      <circle cx={36.1} cy={15.2} r={1.2} />
      <circle cx={39.5} cy={15.2} r={1.2} />
      <circle cx={43} cy={15.2} r={1.2} />
      <circle cx={46.5} cy={15.2} r={1.2} />
      <circle cx={50} cy={15.2} r={1.2} />
      <circle cx={53.5} cy={15.2} r={1.2} />
      <circle cx={57} cy={15.2} r={1.2} />
      <circle cx={60.5} cy={15.2} r={1.2} />
      <circle cx={63.9} cy={15.2} r={1.2} />
      <circle cx={67.4} cy={15.2} r={1.2} />
      <circle cx={70.9} cy={15.2} r={1.2} />
      <circle cx={74.4} cy={15.2} r={1.2} />
      <circle cx={77.9} cy={15.2} r={1.2} />
      <circle cx={81.4} cy={15.2} r={1.2} />
      <circle cx={29.1} cy={18.6} r={1.2} />
      <circle cx={32.6} cy={18.6} r={1.2} />
      <circle cx={36.1} cy={18.6} r={1.2} />
      <circle cx={39.5} cy={18.6} r={1.2} />
      <circle cx={43} cy={18.6} r={1.2} />
      <circle cx={50} cy={18.6} r={1.2} />
      <circle cx={53.5} cy={18.6} r={1.2} />
      <circle cx={57} cy={18.6} r={1.2} />
      <circle cx={60.5} cy={18.6} r={1.2} />
      <circle cx={63.9} cy={18.6} r={1.2} />
      <circle cx={67.4} cy={18.6} r={1.2} />
      <circle cx={70.9} cy={18.6} r={1.2} />
      <circle cx={74.4} cy={18.6} r={1.2} />
      <circle cx={77.9} cy={18.6} r={1.2} />
      <circle cx={81.4} cy={18.6} r={1.2} />
      <circle cx={32.6} cy={22.1} r={1.2} />
      <circle cx={36.1} cy={22.1} r={1.2} />
      <circle cx={39.5} cy={22.1} r={1.2} />
      <circle cx={53.5} cy={22.1} r={1.2} />
      <circle cx={57} cy={22.1} r={1.2} />
      <circle cx={60.5} cy={22.1} r={1.2} />
      <circle cx={63.9} cy={22.1} r={1.2} />
      <circle cx={67.4} cy={22.1} r={1.2} />
      <circle cx={70.9} cy={22.1} r={1.2} />
      <circle cx={74.4} cy={22.1} r={1.2} />
      <circle cx={77.9} cy={22.1} r={1.2} />
      <circle cx={81.4} cy={22.1} r={1.2} />
      <circle cx={57} cy={25.6} r={1.2} />
      <circle cx={60.5} cy={25.6} r={1.2} />
      <circle cx={63.9} cy={25.6} r={1.2} />
      <circle cx={67.4} cy={25.6} r={1.2} />
      <circle cx={70.9} cy={25.6} r={1.2} />
      <circle cx={74.4} cy={25.6} r={1.2} />
      <circle cx={77.9} cy={25.6} r={1.2} />
      <circle cx={81.4} cy={25.6} r={1.2} />
      <circle cx={84.8} cy={25.6} r={1.2} />
      <circle cx={60.5} cy={29.1} r={1.2} />
      <circle cx={63.9} cy={29.1} r={1.2} />
      <circle cx={67.4} cy={29.1} r={1.2} />
      <circle cx={70.9} cy={29.1} r={1.2} />
      <circle cx={74.4} cy={29.1} r={1.2} />
      <circle cx={77.9} cy={29.1} r={1.2} />
      <circle cx={81.4} cy={29.1} r={1.2} />
      <circle cx={84.8} cy={29.1} r={1.2} />
      <circle cx={63.9} cy={32.6} r={1.2} />
      <circle cx={67.4} cy={32.6} r={1.2} />
      <circle cx={70.9} cy={32.6} r={1.2} />
      <circle cx={74.4} cy={32.6} r={1.2} />
      <circle cx={77.9} cy={32.6} r={1.2} />
      <circle cx={81.4} cy={32.6} r={1.2} />
      <circle cx={84.8} cy={32.6} r={1.2} />
      <circle cx={88.3} cy={32.6} r={1.2} />
      <circle cx={67.4} cy={36.1} r={1.2} />
      <circle cx={70.9} cy={36.1} r={1.2} />
      <circle cx={74.4} cy={36.1} r={1.2} />
      <circle cx={77.9} cy={36.1} r={1.2} />
      <circle cx={81.4} cy={36.1} r={1.2} />
      <circle cx={84.8} cy={36.1} r={1.2} />
      <circle cx={88.3} cy={36.1} r={1.2} />
      <circle cx={67.4} cy={39.5} r={1.2} />
      <circle cx={70.9} cy={39.5} r={1.2} />
      <circle cx={74.4} cy={39.5} r={1.2} />
      <circle cx={77.9} cy={39.5} r={1.2} />
      <circle cx={81.4} cy={39.5} r={1.2} />
      <circle cx={84.8} cy={39.5} r={1.2} />
      <circle cx={88.3} cy={39.5} r={1.2} />
      <circle cx={91.8} cy={39.5} r={1.2} />
      <circle cx={63.9} cy={43} r={1.2} />
      <circle cx={67.4} cy={43} r={1.2} />
      <circle cx={70.9} cy={43} r={1.2} />
      <circle cx={74.4} cy={43} r={1.2} />
      <circle cx={77.9} cy={43} r={1.2} />
      <circle cx={81.4} cy={43} r={1.2} />
      <circle cx={84.8} cy={43} r={1.2} />
      <circle cx={88.3} cy={43} r={1.2} />
      <circle cx={91.8} cy={43} r={1.2} />
      <circle cx={63.9} cy={46.5} r={1.2} />
      <circle cx={67.4} cy={46.5} r={1.2} />
      <circle cx={70.9} cy={46.5} r={1.2} />
      <circle cx={74.4} cy={46.5} r={1.2} />
      <circle cx={77.9} cy={46.5} r={1.2} />
      <circle cx={81.4} cy={46.5} r={1.2} />
      <circle cx={84.8} cy={46.5} r={1.2} />
      <circle cx={88.3} cy={46.5} r={1.2} />
      <circle cx={91.8} cy={46.5} r={1.2} />
      <circle cx={63.9} cy={50} r={1.2} />
      <circle cx={67.4} cy={50} r={1.2} />
      <circle cx={70.9} cy={50} r={1.2} />
      <circle cx={74.4} cy={50} r={1.2} />
      <circle cx={77.9} cy={50} r={1.2} />
      <circle cx={81.4} cy={50} r={1.2} />
      <circle cx={84.8} cy={50} r={1.2} />
      <circle cx={88.3} cy={50} r={1.2} />
      <circle cx={91.8} cy={50} r={1.2} />
      <circle cx={95.3} cy={50} r={1.2} />
      <circle cx={63.9} cy={53.5} r={1.2} />
      <circle cx={67.4} cy={53.5} r={1.2} />
      <circle cx={70.9} cy={53.5} r={1.2} />
      <circle cx={74.4} cy={53.5} r={1.2} />
      <circle cx={77.9} cy={53.5} r={1.2} />
      <circle cx={81.4} cy={53.5} r={1.2} />
      <circle cx={84.8} cy={53.5} r={1.2} />
      <circle cx={88.3} cy={53.5} r={1.2} />
      <circle cx={91.8} cy={53.5} r={1.2} />
      <circle cx={95.3} cy={53.5} r={1.2} />
      <circle cx={67.4} cy={57} r={1.2} />
      <circle cx={70.9} cy={57} r={1.2} />
      <circle cx={74.4} cy={57} r={1.2} />
      <circle cx={77.9} cy={57} r={1.2} />
      <circle cx={81.4} cy={57} r={1.2} />
      <circle cx={84.8} cy={57} r={1.2} />
      <circle cx={88.3} cy={57} r={1.2} />
      <circle cx={91.8} cy={57} r={1.2} />
      <circle cx={95.3} cy={57} r={1.2} />
      <circle cx={67.4} cy={60.5} r={1.2} />
      <circle cx={70.9} cy={60.5} r={1.2} />
      <circle cx={74.4} cy={60.5} r={1.2} />
      <circle cx={77.9} cy={60.5} r={1.2} />
      <circle cx={81.4} cy={60.5} r={1.2} />
      <circle cx={84.8} cy={60.5} r={1.2} />
      <circle cx={88.3} cy={60.5} r={1.2} />
      <circle cx={91.8} cy={60.5} r={1.2} />
      <circle cx={95.3} cy={60.5} r={1.2} />
      <circle cx={70.9} cy={63.9} r={1.2} />
      <circle cx={74.4} cy={63.9} r={1.2} />
      <circle cx={77.9} cy={63.9} r={1.2} />
      <circle cx={81.4} cy={63.9} r={1.2} />
      <circle cx={84.8} cy={63.9} r={1.2} />
      <circle cx={88.3} cy={63.9} r={1.2} />
      <circle cx={91.8} cy={63.9} r={1.2} />
      <circle cx={95.3} cy={63.9} r={1.2} />
      <circle cx={98.8} cy={63.9} r={1.2} />
      <circle cx={70.9} cy={67.4} r={1.2} />
      <circle cx={74.4} cy={67.4} r={1.2} />
      <circle cx={77.9} cy={67.4} r={1.2} />
      <circle cx={81.4} cy={67.4} r={1.2} />
      <circle cx={84.8} cy={67.4} r={1.2} />
      <circle cx={88.3} cy={67.4} r={1.2} />
      <circle cx={91.8} cy={67.4} r={1.2} />
      <circle cx={95.3} cy={67.4} r={1.2} />
      <circle cx={98.8} cy={67.4} r={1.2} />
      <circle cx={74.4} cy={70.9} r={1.2} />
      <circle cx={77.9} cy={70.9} r={1.2} />
      <circle cx={81.4} cy={70.9} r={1.2} />
      <circle cx={84.8} cy={70.9} r={1.2} />
      <circle cx={88.3} cy={70.9} r={1.2} />
      <circle cx={91.8} cy={70.9} r={1.2} />
      <circle cx={95.3} cy={70.9} r={1.2} />
      <circle cx={98.8} cy={70.9} r={1.2} />
      <circle cx={77.9} cy={74.4} r={1.2} />
      <circle cx={81.4} cy={74.4} r={1.2} />
      <circle cx={84.8} cy={74.4} r={1.2} />
      <circle cx={88.3} cy={74.4} r={1.2} />
      <circle cx={91.8} cy={74.4} r={1.2} />
      <circle cx={95.3} cy={74.4} r={1.2} />
      <circle cx={98.8} cy={74.4} r={1.2} />
      <circle cx={77.9} cy={77.9} r={1.2} />
      <circle cx={81.4} cy={77.9} r={1.2} />
      <circle cx={84.8} cy={77.9} r={1.2} />
      <circle cx={88.3} cy={77.9} r={1.2} />
      <circle cx={91.8} cy={77.9} r={1.2} />
      <circle cx={95.3} cy={77.9} r={1.2} />
      <circle cx={84.8} cy={81.4} r={1.2} />
      <circle cx={88.3} cy={81.4} r={1.2} />
      <circle cx={91.8} cy={81.4} r={1.2} />
      <circle cx={95.3} cy={81.4} r={1.2} />
      <circle cx={84.8} cy={84.8} r={1.2} />
      <circle cx={88.3} cy={84.8} r={1.2} />
      <circle cx={91.8} cy={84.8} r={1.2} />
      <circle cx={95.3} cy={84.8} r={1.2} />
      <circle cx={84.8} cy={88.3} r={1.2} />
      <circle cx={88.3} cy={88.3} r={1.2} />
      <circle cx={91.8} cy={88.3} r={1.2} />
      <circle cx={95.3} cy={88.3} r={1.2} />
      <circle cx={88.3} cy={91.8} r={1.2} />
      <circle cx={91.8} cy={91.8} r={1.2} />
      <circle cx={77.9} cy={95.3} r={1.2} />
      <circle cx={81.4} cy={95.3} r={1.2} />
      <circle cx={84.8} cy={95.3} r={1.2} />
    </svg>
  );
};

export default FloridaDotedIcon;

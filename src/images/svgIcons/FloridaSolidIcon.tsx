import React from 'react';
interface IProps {
  extraClass: {
    wrapper: string;
    path: string;
  };
}
const FloridaSolidIcon = ({ extraClass }: IProps) => {
  return (
    <svg
      className={`${extraClass.wrapper}`}
      xmlns="http://www.w3.org/2000/svg"
      xmlSpace="preserve"
      viewBox="0 0 100 100"
    >
      <path
        className={`${extraClass.path}`}
        d="M94.326 64.785 87.08 47.519c-.155-.375-.073-1.126.16-1.459l.099-.147c.786-1.118.847-2.844.143-4.013l-6.317-10.483c-.367-.613-.833-1.765-.993-2.464l-2.619-11.449c-.307-1.355-1.575-2.533-2.948-2.745l-3.543-.543c-.859-.13-1.696.143-2.262.742-.479.505-.721 1.191-.682 1.925l.104 1.821c-.544-.854-1.622-1.489-2.762-1.571L38.814 15.28c-.367-.026-.911-.415-1.053-.755l-.254-.596c-.531-1.251-1.955-2.227-3.314-2.266l-26.038-.746h-.082c-1.472 0-2.801 1.135-3.025 2.585l-.013.073c-.225 1.433.656 2.974 2.002 3.513l.009.004c.181.078.319.354.272.548l-.522 1.994c-.207.786-.056 1.58.406 2.179.466.6 1.195.945 2.007.945h12.062c.582 0 1.575.324 2.041.669l7.76 5.675c.716.522 1.795.85 2.813.85.371 0 .721-.043 1.04-.129l12.499-3.357a.75.75 0 0 1 .181-.018c.38 0 .777.203.923.389l6.888 8.821c.721.919 2.137 1.765 3.289 1.968l1.372.233c.401.069.988.544 1.14.919l.237.583c.241.591.396 1.709.323 2.343L60.56 52.195c-.12 1.066.082 2.62.475 3.612l4.217 10.686c.479 1.213 1.743 2.059 3.077 2.059.125 0 .25-.004.375-.021l-.112.41c-.341 1.277.116 2.93 1.07 3.85l1.791 1.718c.424.41.933 1.342 1.045 1.916l.263 1.355c.264 1.347 1.477 2.58 2.818 2.861l1.247.263c.445.095 1.097.604 1.295 1.015l2.542 5.282c.531 1.108 1.791 1.881 3.056 1.881.186 0 .367-.017.543-.047l5.581-1.019c1.406-.255 2.594-1.575 2.701-3.004l.212-2.771c.043-.6.427-1.347.66-1.562.803-.725 1.398-2.141 1.42-3.361L95 68.294c.017-1.04-.272-2.55-.674-3.509z"
      />
    </svg>
  );
};

export default FloridaSolidIcon;
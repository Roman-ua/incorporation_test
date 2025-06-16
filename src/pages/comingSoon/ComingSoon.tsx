import React from 'react';
import cmgSoon from '../../images/shared/comingsoon.png';

const ComingSoon = () => {
  return (
    <div className="flex flex-col items-center justify-center p-10">
      <img src={cmgSoon} alt="logo" className="w-2/12" />
      <h1 className="text-xl font-bold">Coming Soon...</h1>
    </div>
  );
};

export default ComingSoon;

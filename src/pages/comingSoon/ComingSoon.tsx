import React from 'react';
import cmgSoon from '../../images/shared/comingsoon.png';
import { useLocation } from 'react-router-dom';

const ComingSoon = () => {
  const location = useLocation();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-64px)]">
      <div className="text-xl font-bold">
        <p className="capitalize inline-block">
          {location.pathname.split('/').pop()}
        </p>{' '}
        under development
      </div>
      <img src={cmgSoon} alt="logo" className="w-1/3" />
      <h1 className="text-3xl font-bold">Coming Soon...</h1>
    </div>
  );
};

export default ComingSoon;

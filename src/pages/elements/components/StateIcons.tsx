import { states } from './StateCardsElements';
import StateIconHandler from '../../../components/shared/StateIconHandler';
import React from 'react';

const StateIcons = () => {
  return (
    <div className="w-1/2 mb-20">
      <h2 className="text-md text-gray-600 font-semibold mb-8">Icons States</h2>
      <div className="flex items-center justify-start">
        {states.map((state) => {
          return (
            <StateIconHandler
              key={state}
              selectedState={state}
              state={state}
              simpleIcon={false}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StateIcons;

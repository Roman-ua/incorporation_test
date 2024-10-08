import { states } from './StateCardsElements';
import StateIconHandler from '../../../components/shared/StateIconHandler';
import React from 'react';
import StateDotedIconHandler from '../../../components/shared/StateDotedIconHandler';
import StateSolidIconHandler from '../../../components/shared/StateSolidIconHandler';

const StateIcons = () => {
  return (
    <div className="w-1/2 mb-20">
      <h2 className="text-md text-gray-600 font-semibold mb-8">Icons States</h2>
      <div className="flex items-center justify-start mb-2 group">
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
      <div className="flex items-center justify-start">
        {states.map((state) => {
          return (
            <StateIconHandler
              key={`${state}-2`}
              selectedState={state}
              state={state}
              simpleIcon={true}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-start mt-10 mb-2">
        {states.map((state) => {
          return (
            <StateDotedIconHandler
              key={`${state}-3`}
              selectedState={state}
              state={state}
              simpleIcon={false}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-start">
        {states.map((state) => {
          return (
            <StateDotedIconHandler
              key={`${state}-4`}
              selectedState={state}
              state={state}
              simpleIcon={true}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-start mt-10 mb-2">
        {states.map((state) => {
          return (
            <StateSolidIconHandler
              key={`${state}-3`}
              selectedState={state}
              state={state}
              simpleIcon={false}
            />
          );
        })}
      </div>
      <div className="flex items-center justify-start">
        {states.map((state) => {
          return (
            <StateSolidIconHandler
              key={`${state}-4`}
              selectedState={state}
              state={state}
              simpleIcon={true}
            />
          );
        })}
      </div>
    </div>
  );
};

export default StateIcons;

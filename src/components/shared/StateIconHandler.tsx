import React from 'react';
import DelawareIcon from '../../images/svgIcons/DelawareIcon';
import TexasIcon from '../../images/svgIcons/TexasIcon';
import CaliforniaIcon from '../../images/svgIcons/CaliforniaIcon';
import FloridaIcon from '../../images/svgIcons/FloridaIcon';

const StateIconHandler = ({
  state,
  simpleIcon,
  selectedState,
}: {
  state: string;
  simpleIcon: boolean;
  selectedState: string;
}) => {
  console.log(selectedState, 'selectedState');
  const extraClass = {
    wrapper: 'w-20 transition-all duration-150 ease-in-out',
    path: `
      ${selectedState === state ? 'fill-gray-500 stroke-gray-500' : 'stroke-gray-200 fill-gray-200'} 
      ${selectedState === state ? 'group-hover:fill-gray-500 group-hover:stroke-gray-500' : 'group-hover:fill-gray-300 group-hover:stroke-gray-300'} 
      transition-all duration-150 ease-in-out
    `,
  };

  const simpleIconExtraClass = {
    wrapper: 'w-8 mr-3 bg-yellow-300/80 rounded p-1.5',
    path: 'stroke-gray-700 fill-gray-700',
  };
  return (
    <>
      {state === 'Delaware' && (
        <DelawareIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Texas' && (
        <TexasIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'California' && (
        <CaliforniaIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Florida' && (
        <FloridaIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
    </>
  );
};

export default StateIconHandler;

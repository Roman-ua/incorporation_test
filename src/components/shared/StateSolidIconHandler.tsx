import React from 'react';
import FloridaSolidIcon from '../../images/svgIcons/FloridaSolidIcon';
import TexasSolidIcon from '../../images/svgIcons/TexasSolidIcon';
import DelawareSolidIcon from '../../images/svgIcons/DelawareSolidIcon';
import CaliforniaSolidIcon from '../../images/svgIcons/CaliforniaSolidIcon';

const StateSolidIconHandler = ({
  state,
  simpleIcon,
  selectedState,
}: {
  state: string;
  simpleIcon: boolean;
  selectedState: string;
}) => {
  const extraClass = {
    wrapper: 'w-14 transition-all duration-150 ease-in-out',
    path: `
      ${selectedState === state ? 'fill-gray-500 stroke-gray-500' : 'stroke-gray-200 fill-gray-200'} 
      ${selectedState === state ? 'group-hover:fill-gray-500 group-hover:stroke-gray-500' : 'group-hover:fill-gray-300 group-hover:stroke-gray-300'} 
      transition-all duration-150 ease-in-out
    `,
  };

  const simpleIconExtraClass = {
    wrapper: 'w-5 mr-2 bg-yellow-300/80 rounded-sm p-0.5',
    path: 'stroke-gray-700 fill-gray-700',
  };
  return (
    <>
      {state === 'Delaware' && (
        <DelawareSolidIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Texas' && (
        <TexasSolidIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'California' && (
        <CaliforniaSolidIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Florida' && (
        <FloridaSolidIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
    </>
  );
};

export default StateSolidIconHandler;

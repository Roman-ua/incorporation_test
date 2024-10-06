import React from 'react';
import DelawareDotedIcon from '../../images/svgIcons/DelawareDotedIcon';
import TexasDotedIcon from '../../images/svgIcons/TexasDotedIcon';
import CaliforniaDotedIcon from '../../images/svgIcons/CaliforniaDotedIcon';
import FloridaDotedIcon from '../../images/svgIcons/FloridaDotedIcon';

const StateDotedIconHandler = ({
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
    wrapper: 'w-8 mr-3 bg-yellow-300/80 rounded p-1',
    path: 'stroke-gray-700 fill-gray-700',
  };
  return (
    <>
      {state === 'Delaware' && (
        <DelawareDotedIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Texas' && (
        <TexasDotedIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'California' && (
        <CaliforniaDotedIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
      {state === 'Florida' && (
        <FloridaDotedIcon
          extraClass={simpleIcon ? simpleIconExtraClass : extraClass}
        />
      )}
    </>
  );
};

export default StateDotedIconHandler;

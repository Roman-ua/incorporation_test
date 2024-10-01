import React from 'react';
import DelawareIcon from '../../images/svgIcons/DelawareIcon';
import TexasIcon from '../../images/svgIcons/TexasIcon';
import CaliforniaIcon from '../../images/svgIcons/CaliforniaIcon';
import FloridaIcon from '../../images/svgIcons/FloridaIcon';

const StateIconHandler = ({
  state,
  simpleIcon,
}: {
  state: string;
  simpleIcon: boolean;
}) => {
  const extraClass = {
    wrapper: 'w-20 transition-all duration-150 ease-in-out',
    path: 'stroke-gray-200 fill-gray-200 group-hover:fill-gray-700 group-hover:stroke-gray-700 transition-all duration-150 ease-in-out',
  };

  const simpleIconExtraClass = {
    wrapper: 'w-6 ml-3',
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

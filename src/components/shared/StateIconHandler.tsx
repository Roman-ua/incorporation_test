import React from 'react';
import DelawareIcon from '../../images/svgIcons/DelawareIcon';
import TexasIcon from '../../images/svgIcons/TexasIcon';
import CaliforniaIcon from '../../images/svgIcons/CaliforniaIcon';
import FloridaIcon from '../../images/svgIcons/FloridaIcon';

const StateIconHandler = ({ state }: { state: string }) => {
  const extraClass = {
    wrapper: 'ml-2',
    path: '',
  };
  return (
    <>
      {state === 'Delaware' && <DelawareIcon extraClass={extraClass} />}
      {state === 'Texas' && <TexasIcon extraClass={extraClass} />}
      {state === 'California' && <CaliforniaIcon extraClass={extraClass} />}
      {state === 'Florida' && <FloridaIcon extraClass={extraClass} />}
    </>
  );
};

export default StateIconHandler;

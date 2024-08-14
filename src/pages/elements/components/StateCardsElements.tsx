import React from 'react';
import StateCards from '../../createCompany/components/StateCards';

const states = ['Florida', 'Texas', 'Delaware', 'California'];

const StateCardsElements = () => {
  const [state, setState] = React.useState('');
  return (
    <div className="w-1/2 mb-20">
      <StateCards
        value={state}
        changeEvent={setState}
        state={states}
        title={'State cards heading'}
      />
    </div>
  );
};

export default StateCardsElements;

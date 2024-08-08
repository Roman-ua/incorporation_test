import JoinedCard from '../../createCompany/components/JoinedCard';
import React from 'react';

const companyTypes = [
  { fullName: 'Corporation', shortName: 'C-corp' },
  { fullName: 'Limited Liability Company', shortName: 'LLC' },
  { fullName: 'Non-profit', shortName: 'Non-profit' },
];
const JoinedCardsElements = () => {
  const [state, setState] = React.useState('');
  return (
    <div className="w-1/2 mb-10">
      <JoinedCard
        value={state}
        changeEvent={setState}
        state={companyTypes}
        title={'Joined cards heading'}
      />
    </div>
  );
};

export default JoinedCardsElements;

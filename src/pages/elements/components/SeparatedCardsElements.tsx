import React from 'react';
import SeparatedCards from '../../createCompany/components/SeparatedCards';

const companyTypes = [
  { fullName: 'Corporation', shortName: 'C-corp', title: 'C-corp' },
  { fullName: 'Limited Liability Company', shortName: 'LLC', title: 'LLC' },
  { fullName: 'Non-profit', shortName: 'Non-profit', title: 'Non-profit' },
];

const SeparatedCardsElements = () => {
  const [state, setState] = React.useState('');

  return (
    <div className="w-2/3 mb-20">
      <SeparatedCards
        value={state}
        changeEvent={setState}
        state={companyTypes}
        title={'Separated cards heading'}
      />
    </div>
  );
};
export default SeparatedCardsElements;

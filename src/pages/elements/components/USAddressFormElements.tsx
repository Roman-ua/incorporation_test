import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import USAddressForm from '../../createCompany/components/USAddressForm';

const USAddressFormElements = () => {
  const [state, setState] = React.useState({});

  return (
    <div className="w-1/2 mb-20">
      <SectionHeading
        text={'US Address Form'}
        status={!!Object.keys(state).length}
      />
      <USAddressForm setFromState={setState} />
    </div>
  );
};

export default USAddressFormElements;

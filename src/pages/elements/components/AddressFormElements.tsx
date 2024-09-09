import React from 'react';
import AddressForm from '../../createCompany/components/AddressForm';
import SectionHeading from '../../createCompany/components/SectionHeading';

const AddressFormElements = () => {
  const [state, setState] = React.useState({});

  return (
    <div className="w-1/2 mb-20">
      <SectionHeading
        text={'Address Form'}
        status={!!Object.keys(state).length}
      />
      <AddressForm setFromState={setState} />
    </div>
  );
};

export default AddressFormElements;

import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { VALIDATORS } from '../../../constants/regexs';
import { toast } from 'sonner';

const USAddressFormElements = () => {
  const [state, setState] = React.useState({});
  const setDataHandler = (key: string, value: string) => {
    if (VALIDATORS.LANGUAGE.test(value)) {
      setState({ ...state, [key]: value });
    } else {
      toast.error('Invalid language', {
        description: 'Only English letters, numbers, and symbols are allowed',
      });
    }
  };

  const [stateTwo, setStateTwo] = React.useState({});
  const setDataTwoHandler = (key: string, value: string) => {
    if (VALIDATORS.LANGUAGE.test(value)) {
      setStateTwo({ ...stateTwo, [key]: value });
    } else {
      toast.error('Invalid language', {
        description: 'Only English letters, numbers, and symbols are allowed',
      });
    }
  };

  return (
    <div className="w-1/2 mb-20">
      <SectionHeading
        text={'US Address Form'}
        status={!!Object.keys(state).length}
        hideStatus={true}
      />
      <SimpleAddressForm
        disabledFlag={false}
        inputCommonClasses={
          'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200'
        }
        requiredError={false}
        data={state}
        countryDisabled={true}
        setData={setDataHandler}
      />
      <div className="mt-10" />
      <SectionHeading
        text={'International Address Form'}
        status={!!Object.keys(state).length}
        hideStatus={true}
      />
      <SimpleAddressFormNotUS
        disabledFlag={false}
        inputCommonClasses={
          'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200'
        }
        requiredError={false}
        data={stateTwo}
        setData={setDataTwoHandler}
      />
      {/*<USAddressForm setFromState={setState} />*/}
    </div>
  );
};

export default USAddressFormElements;

import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { VALIDATORS } from '../../../constants/regexs';

const USAddressFormElements = () => {
  const [state, setState] = React.useState({});
  const [languageError, setLanguageError] = React.useState<boolean>(false);

  const setDataHandler = (key: string, value: string) => {
    if (VALIDATORS.LANGUAGE.test(value)) {
      setState({ ...state, [key]: value });

      if (languageError) {
        setLanguageError(false);
      }
    } else {
      setLanguageError(true);
    }
  };

  const [stateTwo, setStateTwo] = React.useState({});
  const setDataTwoHandler = (key: string, value: string) => {
    if (VALIDATORS.LANGUAGE.test(value)) {
      setStateTwo({ ...stateTwo, [key]: value });

      if (languageError) {
        setLanguageError(false);
      }
    } else {
      setLanguageError(true);
    }
  };

  return (
    <div className="w-1/2 mb-20 relative">
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
      {languageError && (
        <div className="absolute -bottom-9 left-0 text-sm text-gray-900 bg-yellow-300/30 px-2 py-1 rounded-md">
          ⚠️ We currently support only English letters for address.
        </div>
      )}
      {/*<USAddressForm setFromState={setState} />*/}
    </div>
  );
};

export default USAddressFormElements;

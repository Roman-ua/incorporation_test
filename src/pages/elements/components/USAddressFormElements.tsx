import React from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { VALIDATORS } from '../../../constants/regexs';
import { filterLatinOnly } from '../../../utils/helpers';

const USAddressFormElements = () => {
  const [state, setState] = React.useState({});
  const [languageError, setLanguageError] = React.useState<boolean>(false);

  const setDataHandler = (key: string, value: string) => {
    const isOnlyAllowed = VALIDATORS.LANGUAGE.test(value);
    const hasCyrillic = /[\u0400-\u04FF]/.test(value);

    const filteredResult = filterLatinOnly(value);
    setState((prevState) => ({
      ...prevState,
      [key]: filteredResult,
    }));

    if (isOnlyAllowed && !hasCyrillic) {
      setLanguageError(false);
    } else {
      setLanguageError(true);
    }
  };

  const [stateTwo, setStateTwo] = React.useState({});
  const setDataTwoHandler = (key: string, value: string) => {
    const isOnlyAllowed = VALIDATORS.LANGUAGE.test(value);
    const hasCyrillic = /[\u0400-\u04FF]/.test(value);

    const filteredResult = filterLatinOnly(value);
    setStateTwo((prevState) => ({
      ...prevState,
      [key]: filteredResult,
    }));

    if (isOnlyAllowed && !hasCyrillic) {
      setLanguageError(false);
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
          <div>
            ⚠️{' '}
            <span className="ml-1">
              We currently support only English letters for address.
            </span>
          </div>
        </div>
      )}
      {/*<USAddressForm setFromState={setState} />*/}
    </div>
  );
};

export default USAddressFormElements;

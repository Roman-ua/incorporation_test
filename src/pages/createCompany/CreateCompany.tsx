import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StepsProgress from './components/StepsProgress';
import CommonTextInput from './components/CommonTextInput';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../constants/navigation/routes';
import { Link, useLocation } from 'react-router-dom';
import CustomCalendar from './components/CustomCalendar';
import StateCards from './components/StateCards';
import JoinedCard from './components/JoinedCard';
import Separator from './components/Separator';
import { VALIDATORS } from '../../constants/regexs';
import SeparatedCards from './components/SeparatedCards';
import ConfirmPage from './components/ConfirmPage';
import USAddressForm from './components/USAddressForm';
import ButtonWithArrow from '../../components/shared/ButtonWithArrow/ButtonWithArrow';
import useCompany from '../../utils/hooks/Company/useCompany';
import { ICompanyDataForSave } from '../../state/types/company';

export const companyTypes = [
  { fullName: 'Corporation', shortName: 'C-corp' },
  { fullName: 'Limited Liability Company', shortName: 'LLC' },
  { fullName: 'Non-profit', shortName: 'Non-profit' },
];

const registrationStates = [
  { fullName: 'State of Florida', shortName: 'FL', title: 'Florida' },
  { fullName: 'State of Delaware', shortName: 'DE', title: 'Delaware' },
  { fullName: 'State of Texas', shortName: 'TX', title: 'Texas' },
  { fullName: 'State of California', shortName: 'CA', title: 'California' },
];

const status = [
  'Active',
  'Inactive',
  'Dissolved',
  'Withdrawn',
  'Administrative Dissolution',
];

const stepOneSchema = yup.object().shape({
  name: yup
    .string()
    .required('Company Name is required')
    .matches(VALIDATORS.NAME),
  state_name: yup.string().required('State of Registration is required'),
  type_name: yup.string().required('State of Registration is required'),
});

const stepTwoSchema = yup.object().shape({
  registration_date: yup.string().required('Registration Date is required'),
  registration_number: yup
    .string()
    .required('Registration Date is required')
    .matches(VALIDATORS.COMPANY_NUMBER),
  status_name: yup.string().required('State of Registration is required'),
});

const stepThreeSchema = yup.object().shape({
  address: yup.object().shape({
    country: yup.string(),
    address0: yup.string(),
    address1: yup.string(),
    address2: yup.string(),
    address3: yup.string(),
    city: yup.string(),
    zip: yup.string(),
    state: yup.string(),
  }),
});

const localStorageKey = 'multistep-form-data';
type Step = 'stepOneData' | 'stepTwoData' | 'stepThreeData';

export type StepOneData = {
  state_name: string;
  name: string;
  type_name: string;
};

export type StepTwoData = {
  registration_date: string;
  registration_number: string;
  status_name: string;
};

export type StepThreeData = {
  address: {
    country?: string;
    line1?: string;
    line2?: string;
    line3?: string;
    line4?: string;
    city?: string;
    zip?: string;
    state?: string;
  };
};

type FormData = StepOneData & StepTwoData & StepThreeData;

const defaultStepOneValues: StepOneData = {
  state_name: '',
  name: '',
  type_name: '',
};

const defaultStepTwoValues: StepTwoData = {
  registration_date: '',
  registration_number: '',
  status_name: '',
};

const defaultStepThreeValues: StepThreeData = {
  address: {
    country: 'United States',
    line1: '',
    city: '',
    zip: '',
    state: '',
  },
};

const queryKeyHandler = (location: Location, key: string, value?: string) => {
  const searchParams = new URLSearchParams(location.search);
  const myParam = searchParams.get(key);

  if (value) {
    searchParams.set(key, value);
    const newUrl = `${window.location.pathname}?${searchParams.toString()}`;
    window.history.replaceState(null, '', newUrl);
  }

  return myParam || '';
};

const CreateCompany = () => {
  // const navigate = useNavigate();

  const { createCompanyHandler } = useCompany();

  const parsedData = JSON.parse(
    localStorage.getItem(localStorageKey) as string
  );
  const location = useLocation();

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const stepFormQuery = queryKeyHandler(location, 'step');

  const [currentStep, setCurrentStep] = useState<number>(
    +stepFormQuery || parsedData?.step || 0
  );
  const [stepOneData, setStepOneData] = useState<StepOneData>(
    parsedData?.stepOneData || defaultStepOneValues
  );
  const [stepTwoData, setStepTwoData] = useState<StepTwoData>(
    parsedData?.stepTwoData || defaultStepTwoValues
  );
  const [stepThreeData, setStepThreeData] = useState<StepThreeData>(
    parsedData?.stepThreeData || defaultStepThreeValues
  );

  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const { step, stepOneData, stepTwoData, stepThreeData } =
        JSON.parse(savedData);
      setCurrentStep(step);
      setStepOneData(stepOneData);
      setStepTwoData(stepTwoData);
      setStepThreeData(stepThreeData);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    queryKeyHandler(location, 'step', `${currentStep}`);
  }, [currentStep]);

  const setStepToLocalStorage = (
    step: Step,
    data: StepOneData | StepTwoData | StepThreeData
  ) => {
    const initData = {
      step: currentStep,
      stepOneData,
      stepTwoData,
      stepThreeData,
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    initData[step] = data;

    localStorage.setItem(localStorageKey, JSON.stringify(initData));
  };

  const stepOneForm = useForm<StepOneData>({
    defaultValues: stepOneData,
    resolver: yupResolver(stepOneSchema),
  });
  const stepOneFormObserver = stepOneForm.watch();

  const stepTwoForm = useForm<StepTwoData>({
    defaultValues: stepTwoData,
    resolver: yupResolver(stepTwoSchema),
  });
  const stepTwoFormObserver = stepTwoForm.watch();

  const stepThreeForm = useForm<StepThreeData>({
    defaultValues: stepThreeData,
    resolver: yupResolver(stepThreeSchema),
  });
  const stepThreeFormObserver = stepThreeForm.watch();

  const handleStepOneSubmit: SubmitHandler<StepOneData> = (data) => {
    setStepOneData(data);
    setCurrentStep(1);

    setStepToLocalStorage('stepOneData', data);
  };

  const handleStepTwoSubmit: SubmitHandler<StepTwoData> = (data) => {
    setStepTwoData(data);
    setCurrentStep(2);

    setStepToLocalStorage('stepTwoData', data);
  };

  const handleStepThreeSubmit: SubmitHandler<StepThreeData> = (data) => {
    setStepThreeData(data);
    setCurrentStep(3);

    setStepToLocalStorage('stepThreeData', data);
    const finalData: FormData = {
      ...stepOneData,
      ...stepTwoData,
      ...data,
    };

    localStorage.setItem('finalFormData', JSON.stringify(finalData));
  };

  return (
    <>
      <div className="bg-mainBackground w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:z-10">
        <div className="w-1/5 pr-2 max-lg:hidden" />
        <div className="w-1/2">
          <h1 className="font-bold max-lg:text-xl">
            {currentStep === 0 && 'Company Details'}
            {currentStep === 1 && 'Registration Information'}
            {currentStep === 2 && 'Address'}
            {currentStep === 3 && 'Review'}
          </h1>
        </div>
        <div className="w-1/4 pr-2 flex items-end justify-end">
          <Link to={ROUTES.HOME}>
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="min-h-[calc(100vh-65px)] bg-mainBackground m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20">
        <div className="w-1/5 pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <StepsProgress
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            firstStepData={Object.values(stepOneFormObserver)}
            secondStepData={Object.values(stepTwoFormObserver)}
            thirdStepData={
              Object.values({
                country: stepThreeFormObserver.address?.country,
                city: stepThreeFormObserver.address?.city,
                address0: stepThreeFormObserver.address?.line1,
                state: stepThreeFormObserver.address?.state,
                zip: stepThreeFormObserver.address?.zip,
              }) as string[]
            }
          />
        </div>
        <div className="w-1/2 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-16">
          {currentStep === 0 && (
            <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)}>
              <div>
                <Controller
                  name="name"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <>
                      <CommonTextInput
                        id="name"
                        name="name"
                        field={field}
                        title="Company Name"
                        removeLabel={true}
                        extraStyles="mb-16"
                        heading="Company Name"
                        requiredError={Object.keys(
                          stepOneForm.formState.errors
                        ).includes('name')}
                      />
                      <Separator />
                    </>
                  )}
                />
                <Controller
                  name="type_name"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <JoinedCard
                        state={companyTypes}
                        title={'Company Type'}
                        value={field.value}
                        changeEvent={field.onChange}
                        requiredError={Object.keys(
                          stepOneForm.formState.errors
                        ).includes('type_name')}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="state_name"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <SeparatedCards
                        state={registrationStates}
                        title={'Registration State'}
                        value={field.value}
                        changeEvent={field.onChange}
                        requiredError={Object.keys(
                          stepOneForm.formState.errors
                        ).includes('state_name')}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-end">
                  <ButtonWithArrow title={'Next Step'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)}>
              <div>
                <Controller
                  name="registration_date"
                  control={stepTwoForm.control}
                  render={({ field }) => {
                    return (
                      <>
                        <CustomCalendar
                          field={field}
                          requiredError={Object.keys(
                            stepTwoForm.formState.errors
                          ).includes('registration_date')}
                        />
                        <Separator />
                      </>
                    );
                  }}
                />
                <Controller
                  name="registration_number"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <>
                      <CommonTextInput
                        id="number"
                        name="number"
                        field={field}
                        title="Number"
                        removeLabel={true}
                        heading="Registration Number"
                        extraStyles="mb-16"
                        requiredError={Object.keys(
                          stepTwoForm.formState.errors
                        ).includes('registration_number')}
                      />
                      <Separator />
                    </>
                  )}
                />
                <Controller
                  name="status_name"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <StateCards
                        state={status}
                        title={'Company Status'}
                        value={field.value}
                        changeEvent={field.onChange}
                        secondTitle={'Company status'}
                        requiredError={Object.keys(
                          stepTwoForm.formState.errors
                        ).includes('status_name')}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <ButtonWithArrow title={'Next Step'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 2 && (
            <form onSubmit={stepThreeForm.handleSubmit(handleStepThreeSubmit)}>
              <div>
                <Controller
                  name="address"
                  control={stepThreeForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <USAddressForm
                        setFromState={field.onChange}
                        value={field?.value}
                        requiredError={Object.keys(
                          stepThreeForm.formState.errors
                        ).includes('address')}
                        heading={'Main Address'}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <ButtonWithArrow title={'Next Step'} />
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
          {currentStep === 3 && (
            <div>
              <ConfirmPage
                stepOneData={stepOneFormObserver}
                stepTwoData={stepTwoFormObserver}
                stepThreeData={stepThreeFormObserver}
                setCurrentStep={setCurrentStep}
              />
              <div className="bg-mainBackground py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(2)}
                    className="min-w-28 rounded-md mr-2 bg-mainBackground px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={
                      !Object.values(stepOneFormObserver).every(
                        (value) => value
                      ) ||
                      !Object.values(stepTwoFormObserver).every(
                        (value) => value
                      )
                    }
                    onClick={() => {
                      createCompanyHandler({
                        ...stepOneData,
                        ...stepTwoData,
                        ...stepThreeData.address,
                      } as ICompanyDataForSave);
                    }}
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500 disabled:cursor-not-allowed"
                  >
                    Submit
                  </button>
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </div>
          )}
        </div>
        <div className="w-1/4" />
      </div>
    </>
  );
};

export default CreateCompany;

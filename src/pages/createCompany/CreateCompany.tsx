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

const companyTypes = [
  { fullName: 'Corporation', shortName: 'C-corp' },
  { fullName: 'Limited Liability Company', shortName: 'LLC' },
  { fullName: 'Non-profit', shortName: 'Non-profit' },
];

const registrationStates = [
  { fullName: 'State of Florida', shortName: 'FL' },
  { fullName: 'State of Delaware', shortName: 'DE' },
  { fullName: 'State of Texas', shortName: 'TX' },
  { fullName: 'State of California', shortName: 'CA' },
];

const status = [
  'Active',
  'Inactive',
  'Dissolved',
  'Withdrawn',
  'Administrative Dissolution',
];

const stepOneSchema = yup.object().shape({
  companyName: yup
    .string()
    .required('Company Name is required')
    .matches(VALIDATORS.NAME),
  registeredIn: yup.string().required('State of Registration is required'),
  companyType: yup.string().required('State of Registration is required'),
});

const stepTwoSchema = yup.object().shape({
  registrationDate: yup.string().required('Registration Date is required'),
  registrationNumber: yup
    .string()
    .required('Registration Date is required')
    .matches(VALIDATORS.COMPANY_NUMBER),
  status: yup.string().required('State of Registration is required'),
});

const localStorageKey = 'multistep-form-data';
type Step = 'stepOneData' | 'stepTwoData';

export type StepOneData = {
  registeredIn: string;
  companyName: string;
  companyType: string;
};

export type StepTwoData = {
  registrationDate: string;
  registrationNumber: string;
  status: string;
};

type FormData = StepOneData & StepTwoData;

const defaultStepOneValues: StepOneData = {
  registeredIn: '',
  companyName: '',
  companyType: '',
};

const defaultStepTwoValues: StepTwoData = {
  registrationDate: '',
  registrationNumber: '',
  status: '',
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

  useEffect(() => {
    const savedData = localStorage.getItem(localStorageKey);
    if (savedData) {
      const { step, stepOneData, stepTwoData } = JSON.parse(savedData);
      setCurrentStep(step);
      setStepOneData(stepOneData);
      setStepTwoData(stepTwoData);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    queryKeyHandler(location, 'step', `${currentStep}`);
  }, [currentStep]);

  const setStepToLocalStorage = (
    step: Step,
    data: StepOneData | StepTwoData
  ) => {
    const initData = {
      step: currentStep,
      stepOneData,
      stepTwoData,
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

  const handleStepOneSubmit: SubmitHandler<StepOneData> = (data) => {
    setStepOneData(data);
    setCurrentStep(1);

    setStepToLocalStorage('stepOneData', data);
  };

  const handleStepTwoSubmit: SubmitHandler<StepTwoData> = (data) => {
    setStepTwoData(data);
    setCurrentStep(2);

    setStepToLocalStorage('stepTwoData', data);
    const finalData: FormData = { ...stepOneData, ...data };
    console.log('Final form data:', finalData);
  };

  return (
    <>
      <div className="w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:z-10">
        <div className="w-1/5 pr-2 max-lg:hidden" />
        <div className="w-1/2">
          <h1 className="font-bold max-lg:text-xl">
            {currentStep === 0 && 'Company Details'}
            {currentStep === 1 && 'Registration Information'}
            {currentStep === 2 && 'Review'}
          </h1>
        </div>
        <div className="w-1/4 pr-2 flex items-end justify-end">
          <Link to={ROUTES.HOME}>
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-10 max-lg:pt-32 max-lg:pb-20">
        <div className="w-1/5 pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <StepsProgress
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
            firstStepData={Object.values(stepOneFormObserver)}
            secondStepData={Object.values(stepTwoFormObserver)}
          />
        </div>
        <div className="w-1/2 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-16">
          {currentStep === 0 && (
            <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)}>
              <div>
                <Controller
                  name="companyName"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <>
                      <CommonTextInput
                        id="name"
                        name="name"
                        field={field}
                        title="Company Name"
                        extraInputStyles="text-3xl font-bold"
                        removeLabel={true}
                        extraStyles="mb-16"
                        heading="Company Name"
                      />
                      <Separator />
                    </>
                  )}
                />
                <Controller
                  name="companyType"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <JoinedCard
                        state={companyTypes}
                        title={'Company Type'}
                        value={field.value}
                        changeEvent={field.onChange}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="registeredIn"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <SeparatedCards
                        state={registrationStates}
                        title={'Registration State'}
                        value={field.value}
                        changeEvent={field.onChange}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-white py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-end">
                  <button
                    type="submit"
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next Step
                  </button>
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)}>
              <div>
                <Controller
                  name="registrationDate"
                  control={stepTwoForm.control}
                  render={({ field }) => {
                    return (
                      <>
                        <CustomCalendar field={field} />
                        <Separator />
                      </>
                    );
                  }}
                />
                <Controller
                  name="registrationNumber"
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
                      />
                      <Separator />
                    </>
                  )}
                />
                <Controller
                  name="status"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <StateCards
                        state={status}
                        title={'Company Status'}
                        value={field.value}
                        changeEvent={field.onChange}
                        secondTitle={'Company status'}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-white py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(0)}
                    className="min-w-28 rounded-md mr-2 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next Step
                  </button>
                </div>
                <div className="w-1/4 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <div>
              <ConfirmPage
                stepOneData={stepOneData}
                stepTwoData={stepTwoData}
                setCurrentStep={setCurrentStep}
              />
              <div className="bg-white py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="min-w-28 rounded-md mr-2 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
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

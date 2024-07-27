import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StepsProgress from './components/StepsProgress';
import CommonTextInput from './components/CommonTextInput';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../constants/navigation/routes';
import { Link } from 'react-router-dom';
import CustomCalendar from './components/CustomCalendar';
import StateCards from './components/StateCards';
import JoinedCard from './components/JoinedCard';
import Separator from './components/Separator';

const states = ['Florida', 'Texas', 'Delaware', 'California'];
const companyTypes = [
  { fullName: 'Corporation', shortName: 'C-corp' },
  { fullName: 'Limited Liability Company', shortName: 'LLC' },
  { fullName: 'Non-profit', shortName: 'Non-profit' },
];

const status = [
  'Active',
  'Inactive',
  'Dissolved',
  'Withdrawn',
  'Administrative Dissolution',
];

const stepOneSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  companyType: yup.string().required('State of Registration is required'),
});

const stepTwoSchema = yup.object().shape({
  registeredIn: yup.string().required('State of Registration is required'),
  registrationDate: yup.string().required('Registration Date is required'),
  registrationNumber: yup.string().required('Registration Date is required'),
  status: yup.string().required('State of Registration is required'),
});

const localStorageKey = 'multistep-form-data';
type Step = 'stepOneData' | 'stepTwoData';

type StepOneData = {
  companyName: string;
  companyType: string;
};

type StepTwoData = {
  registeredIn: string;
  registrationDate: string;
  registrationNumber: string;
  status: string;
};

type FormData = StepOneData & StepTwoData;

const defaultStepOneValues: StepOneData = {
  companyName: '',
  companyType: '',
};

const defaultStepTwoValues: StepTwoData = {
  registeredIn: '',
  registrationDate: '',
  registrationNumber: '',
  status: '',
};

const CreateCompany = () => {
  const parsedData = JSON.parse(
    localStorage.getItem(localStorageKey) as string
  );
  const [currentStep, setCurrentStep] = useState<number>(parsedData?.step || 0);
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

  const stepTwoForm = useForm<StepTwoData>({
    defaultValues: stepTwoData,
    resolver: yupResolver(stepTwoSchema),
  });

  const handleStepOneSubmit: SubmitHandler<StepOneData> = (data) => {
    setStepOneData(data);
    setCurrentStep(1);
    setStepToLocalStorage('stepOneData', data);
  };

  const handleStepTwoSubmit: SubmitHandler<StepTwoData> = (data) => {
    setStepTwoData(data);
    setStepToLocalStorage('stepTwoData', data);

    const finalData: FormData = { ...stepOneData, ...data };
    console.log('Final form data:', finalData);
  };

  return (
    <>
      <div className="w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:z-10">
        <div className="w-1/5 pr-2 max-lg:hidden" />
        <div className="w-2/3">
          <h1 className="text-3xl text-md font-bold max-lg:text-xl">
            {currentStep === 0 && 'Company Name and Type'}
            {currentStep === 1 && 'Registration Information'}
          </h1>
        </div>
        <div className="w-1/6 pr-2 flex items-end justify-end">
          <Link to={ROUTES.HOME}>
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-20 max-lg:pt-32 max-lg:pb-20">
        <div className="w-1/5 pr-2 pl-8 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <StepsProgress
            currentStep={currentStep}
            setCurrentStep={setCurrentStep}
          />
        </div>
        <div className="w-2/3 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-16">
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
                        // extraStyles="text-lg"
                        state={companyTypes}
                        title={'Select Company Type'}
                        value={field.value}
                        changeEvent={field.onChange}
                        // secondTitle={'Company type'}
                      />
                    </div>
                  )}
                />
              </div>
              <div className="bg-white py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-36 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-2/3 max-xl:w-full flex items-center justify-end">
                  <button
                    type="submit"
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next Step
                  </button>
                </div>
                <div className="w-1/6 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)}>
              <div>
                <Controller
                  name="registeredIn"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <>
                      <div className="mb-16">
                        <StateCards
                          state={states}
                          title={'Select Registration State'}
                          value={field.value}
                          changeEvent={field.onChange}
                          secondTitle={'Registration state'}
                        />
                      </div>
                      <Separator />
                    </>
                  )}
                />
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
                        title={'Select Company Status'}
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
                <div className="w-2/3 max-xl:w-full flex items-center justify-between">
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
                    Submit
                  </button>
                </div>
                <div className="w-1/6 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}
        </div>
        <div className="w-1/6" />
      </div>
    </>
  );
};

export default CreateCompany;

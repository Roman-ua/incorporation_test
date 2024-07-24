import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StepsProgress from './components/StepsProgress';
import SimpleCustomSelect from './components/SimpleCustomSelect';
import CommonTextInput from './components/CommonTextInput';
// import { XCircleIcon } from '@heroicons/react/20/solid';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ROUTES } from '../../constants/navigation/routes';
import { Link } from 'react-router-dom';
import CustomCalendar from './components/CustomCalendar';
import StateCards from './components/StateCards';
import InfoDescription from './components/InfoDescription';

// const companyType = [
//   { id: 1, name: 'Corporation' },
//   { id: 2, name: 'Limited Liability Company (LLC)' },
//   { id: 3, name: 'Non-profit' },
// ];
const states = ['Florida', 'Texas', 'Delaware', 'California'];
const companyTypes = [
  'Corporation (Inc)',
  'Limited Liability Company (LLC)',
  'Non-profit',
];
const status = [
  { id: 1, name: 'Active' },
  { id: 2, name: 'Inactive' },
  { id: 3, name: 'Dissolved' },
  { id: 4, name: 'Withdrawn' },
  { id: 5, name: 'Administrative Dissolution' },
];

const descriptionFirstStep =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin pulvinar mollis mollis. Fusce auctor posuere eros, sit amet tincidunt enim euismod a. Phasellus elit mauris, aliquam a turpis vitae, gravida vehicula nibh.';
// const stateList = [
//   { id: 1, name: 'Florida' },
//   { id: 2, name: 'Delaware' },
//   { id: 3, name: 'Texas' },
//   { id: 4, name: 'California' },
// ];

const stepOneSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
});

const stepTwoSchema = yup.object().shape({
  registeredIn: yup.string().required('State of Registration is required'),
  registrationDate: yup.string().required('Registration Date is required'),
  registrationNumber: yup.string().required('Registration Date is required'),
  companyType: yup.string().required('State of Registration is required'),
  status: yup.string().required('State of Registration is required'),
});

// const addressSchema = yup.object().shape({
//   street: yup.string().required('Street is required'),
//   street2: yup.string(),
//   city: yup.string().required('City is required'),
//   state: yup.string().required('State is required'),
//   postalCode: yup.string().required('Postal Code is required'),
//   country: yup.string().required('Country is required'),
// });

const localStorageKey = 'multistep-form-data';
type Step = 'stepOneData' | 'stepTwoData';
// | 'stepThreeData';

// type Address = {
//   street: string;
//   street2?: string;
//   city: string;
//   state: string;
//   postalCode: string;
//   country: string;
// };

type StepOneData = {
  companyName: string;
};

type StepTwoData = {
  registeredIn: string;
  registrationDate: string;
  registrationNumber: string;
  companyType: string;
  status: string;
};

// type StepThreeData = {
//   addresses: Address[];
// };

type FormData = StepOneData & StepTwoData;

const defaultStepOneValues: StepOneData = {
  companyName: '',
};

const defaultStepTwoValues: StepTwoData = {
  registeredIn: '',
  registrationDate: '',
  registrationNumber: '',
  companyType: '',
  status: '',
};

// const defaultStepThreeValues: StepThreeData = {
//   addresses: [
//     {
//       street: '',
//       street2: '',
//       city: '',
//       state: '',
//       postalCode: '',
//       country: 'United States',
//     },
//   ],
// };

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
  // const [stepThreeData, setStepThreeData] = useState<StepThreeData>(
  //   parsedData?.stepThreeData || defaultStepThreeValues
  // );

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

  // const stepThreeForm = useForm<StepThreeData>({
  //   defaultValues: stepThreeData,
  //   resolver: yupResolver(
  //     yup.object().shape({
  //       addresses: yup.array().of(addressSchema).required(),
  //     })
  //   ),
  // });

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

  // const handleStepThreeSubmit: SubmitHandler<StepThreeData> = (data) => {
  //   setStepThreeData(data);
  //   setStepToLocalStorage('stepThreeData', data);
  //
  //   const finalData: FormData = { ...stepOneData, ...stepTwoData, ...data };
  //   console.log('Final form data:', finalData);
  // };

  // const addAddress = () => {
  //   setStepThreeData({
  //     ...stepThreeData,
  //     addresses: [
  //       ...stepThreeData.addresses,
  //       {
  //         street: '',
  //         street2: '',
  //         city: '',
  //         state: '',
  //         postalCode: '',
  //         country: 'United States',
  //       },
  //     ],
  //   });
  // };

  // const removeAddress = (index: number) => {
  //   const updatedAddresses = stepThreeData.addresses.filter(
  //     (_, i) => i !== index
  //   );
  //   setStepThreeData({ ...stepThreeData, addresses: updatedAddresses });
  // };

  return (
    <>
      <div className="w-full border-b py-4 px-6 flex items-center justify-between max-lg:px-4 max-lg:fixed max-lg:top-0 max-lg:left-0 max-lg:right-0 max-lg:bg-white max-lg:z-10">
        <div className="w-1/5 pr-2 max-lg:hidden" />
        <div className="w-1/2">
          <h1 className="text-3xl text-md font-bold max-lg:text-xl">
            {currentStep === 0 && 'Company Name'}
            {currentStep === 1 && 'Registration Information'}
          </h1>
        </div>
        <div className="w-1/5 pr-2 flex items-end justify-end">
          <Link to={ROUTES.HOME}>
            <XMarkIcon className="w-6 h-6" />
          </Link>
        </div>
      </div>
      <div className="m-auto flex items-start justify-between w-full max-lg:flex-col px-6 pt-20 max-lg:pt-32 max-lg:pb-20">
        <div className="w-1/5 pr-2 pl-8 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <StepsProgress currentStep={currentStep} />
        </div>
        <div className="w-1/2 max-xl:w-full max-lg:px-20 max-lg:mt-6 max-sm:px-0 pb-16">
          {currentStep === 0 && (
            <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)}>
              <div>
                <InfoDescription text={descriptionFirstStep} />
                <Controller
                  name="companyName"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <CommonTextInput
                      id="name"
                      name="name"
                      field={field}
                      title="Company Name"
                      extraStyles="mb-6"
                    />
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
                <div className="w-1/5 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {currentStep === 1 && (
            <form onSubmit={stepTwoForm.handleSubmit(handleStepTwoSubmit)}>
              <div>
                <InfoDescription text={descriptionFirstStep} />
                <Controller
                  name="registeredIn"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <StateCards
                        state={states}
                        title={'Select Registration State'}
                        value={field.value}
                        changeEvent={field.onChange}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="registrationDate"
                  control={stepTwoForm.control}
                  render={({ field }) => {
                    return <CustomCalendar field={field} />;
                  }}
                />
                <Controller
                  name="registrationNumber"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <CommonTextInput
                      id="name"
                      name="name"
                      field={field}
                      title="Number"
                      heading="Registration Number"
                      extraStyles="mb-16"
                    />
                  )}
                />
                <Controller
                  name="companyType"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <div className="mb-16">
                      <StateCards
                        extraStyles="text-xl"
                        state={companyTypes}
                        title={'Select Company Type'}
                        value={field.value}
                        changeEvent={field.onChange}
                      />
                    </div>
                  )}
                />
                <Controller
                  name="status"
                  control={stepTwoForm.control}
                  render={({ field }) => (
                    <div className="mb-40">
                      <SimpleCustomSelect
                        changeEvent={field.onChange}
                        list={status}
                        title={'Status'}
                        heading={'Company Status'}
                        value={field.value}
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
                    Submit
                  </button>
                </div>
                <div className="w-1/5 pr-2 max-lg:hidden" />
              </div>
            </form>
          )}

          {/*{currentStep === 2 && (*/}
          {/*  <form onSubmit={stepThreeForm.handleSubmit(handleStepThreeSubmit)}>*/}
          {/*    <div>*/}
          {/*      {stepThreeData.addresses.map((address, index: number) => (*/}
          {/*        <>*/}
          {/*          {index !== 0 && (*/}
          {/*            <div className="mt-6 flex items-center justify-between w-full">*/}
          {/*              <div className="font-bold">Address #{index + 1}</div>*/}
          {/*              <div onClick={() => removeAddress(index)}>*/}
          {/*                <XCircleIcon className="w-5 h-5 hover:cursor-pointer text-gray-500" />*/}
          {/*              </div>*/}
          {/*            </div>*/}
          {/*          )}*/}
          {/*          <div key={index} className={`${index !== 0 ? 'mt-4' : ''}`}>*/}
          {/*            <div className="flex items-center justify-between mb-6 flex-col">*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.street`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <CommonTextInput*/}
          {/*                    id="street"*/}
          {/*                    name="street"*/}
          {/*                    field={field}*/}
          {/*                    title="Street address"*/}
          {/*                    extraStyles="mb-4"*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.street2`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <CommonTextInput*/}
          {/*                    id="street2"*/}
          {/*                    name="street2"*/}
          {/*                    field={field}*/}
          {/*                    title="Floor, suite, etc."*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <div className="flex items-center justify-between mb-6 max-lg:flex-col">*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.city`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <CommonTextInput*/}
          {/*                    id="city"*/}
          {/*                    name="city"*/}
          {/*                    field={field}*/}
          {/*                    title="City"*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <div className="flex items-center justify-between mb-6 max-lg:flex-col">*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.state`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <SimpleCustomSelect*/}
          {/*                    value={field.value}*/}
          {/*                    changeEvent={field.onChange}*/}
          {/*                    list={stateList}*/}
          {/*                    title="State"*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.postalCode`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <CommonTextInput*/}
          {/*                    id="postCode"*/}
          {/*                    name="postCode"*/}
          {/*                    field={field}*/}
          {/*                    title="Zip"*/}
          {/*                    extraStyles="ml-3"*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*            <div>*/}
          {/*              <Controller*/}
          {/*                name={`addresses.${index}.country`}*/}
          {/*                control={stepThreeForm.control}*/}
          {/*                render={({ field }) => (*/}
          {/*                  <CommonTextInput*/}
          {/*                    id="country"*/}
          {/*                    name="country"*/}
          {/*                    field={field}*/}
          {/*                    title="Country"*/}
          {/*                    readonly*/}
          {/*                  />*/}
          {/*                )}*/}
          {/*              />*/}
          {/*            </div>*/}
          {/*          </div>*/}
          {/*        </>*/}
          {/*      ))}*/}
          {/*      <div className="w-full flex items-center justify-end mb-6">*/}
          {/*        <button*/}
          {/*          type="button"*/}
          {/*          onClick={addAddress}*/}
          {/*          className="text-sm mt-6 text-gray-500"*/}
          {/*        >*/}
          {/*          One more Address*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*    </div>*/}
          {/*    <div className="bg-white py-3 px-6 fixed left-0 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-between max-lg:px-20 max-sm:px-6">*/}
          {/*      <div className="w-1/5 pr-2 max-lg:hidden" />*/}
          {/*      <div className="w-1/2 max-xl:w-full flex items-center justify-between">*/}
          {/*        <button*/}
          {/*          type="button"*/}
          {/*          onClick={() => setCurrentStep(1)}*/}
          {/*          className="min-w-28 rounded-md mr-2 bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"*/}
          {/*        >*/}
          {/*          Back*/}
          {/*        </button>*/}
          {/*        <button*/}
          {/*          type="submit"*/}
          {/*          className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"*/}
          {/*        >*/}
          {/*          Submit*/}
          {/*        </button>*/}
          {/*      </div>*/}
          {/*      <div className="w-1/5 pr-2 max-lg:hidden" />*/}
          {/*    </div>*/}
          {/*  </form>*/}
          {/*)}*/}
        </div>
        <div className="w-1/5" />
      </div>
    </>
  );
};

export default CreateCompany;

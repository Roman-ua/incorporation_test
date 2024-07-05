import React, { useState, useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import StepsProgress from './components/StepsProgress';
import SimpleCustomSelect from './components/SimpleCustomSelect';
import CommonTextInput from './components/CommonTextInput';
import DatePicker from './components/DatePicker';

const companyType = [
  { id: 1, name: 'Corporation' },
  { id: 2, name: 'Limited Liability Company (LLC)' },
  { id: 3, name: 'Non-profit' },
];

const stateList = [
  { id: 1, name: 'Florida' },
  { id: 2, name: 'Delaware' },
  { id: 3, name: 'Texas' },
  { id: 4, name: 'California' },
];

const stepOneSchema = yup.object().shape({
  companyName: yup.string().required('Company Name is required'),
  companyType: yup.string().required('Company Type is required'),
});

const stepTwoSchema = yup.object().shape({
  registeredIn: yup.string().required('State of Registration is required'),
  registrationDate: yup.string().required('Registration Date is required'),
});

const addressSchema = yup.object().shape({
  street: yup.string().required('Street is required'),
  street2: yup.string(),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  postalCode: yup.string().required('Postal Code is required'),
  country: yup.string().required('Country is required'),
});

const localStorageKey = 'multistep-form-data';

type Address = {
  street: string;
  street2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
};

type StepOneData = {
  companyName: string;
  companyType: string;
};

type StepTwoData = {
  registeredIn: string;
  registrationDate: string;
};

type StepThreeData = {
  addresses: Address[];
};

type FormData = StepOneData & StepTwoData & StepThreeData;

const defaultStepOneValues: StepOneData = {
  companyName: '',
  companyType: '',
};

const defaultStepTwoValues: StepTwoData = {
  registeredIn: '',
  registrationDate: '',
};

const defaultStepThreeValues: StepThreeData = {
  addresses: [
    {
      street: '',
      street2: '',
      city: '',
      state: '',
      postalCode: '',
      country: 'United States',
    },
  ],
};

const CreateCompany = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [stepOneData, setStepOneData] =
    useState<StepOneData>(defaultStepOneValues);
  const [stepTwoData, setStepTwoData] =
    useState<StepTwoData>(defaultStepTwoValues);
  const [stepThreeData, setStepThreeData] = useState<StepThreeData>(
    defaultStepThreeValues
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
    localStorage.setItem(
      localStorageKey,
      JSON.stringify({
        step: currentStep,
        stepOneData,
        stepTwoData,
        stepThreeData,
      })
    );
  }, [currentStep, stepOneData, stepTwoData, stepThreeData]);

  const stepOneForm = useForm<StepOneData>({
    defaultValues: stepOneData,
    resolver: yupResolver(stepOneSchema),
  });

  const stepTwoForm = useForm<StepTwoData>({
    defaultValues: stepTwoData,
    resolver: yupResolver(stepTwoSchema),
  });

  const stepThreeForm = useForm<StepThreeData>({
    defaultValues: stepThreeData,
    resolver: yupResolver(
      yup.object().shape({
        addresses: yup.array().of(addressSchema).required(),
      })
    ),
  });

  const handleStepOneSubmit: SubmitHandler<StepOneData> = (data) => {
    setStepOneData(data);
    setCurrentStep(1);
  };

  const handleStepTwoSubmit: SubmitHandler<StepTwoData> = (data) => {
    setStepTwoData(data);
    setCurrentStep(2);
  };

  const handleStepThreeSubmit: SubmitHandler<StepThreeData> = (data) => {
    setStepThreeData(data);
    const finalData: FormData = { ...stepOneData, ...stepTwoData, ...data };
    console.log('Final form data:', finalData);
  };

  const addAddress = () => {
    setStepThreeData({
      ...stepThreeData,
      addresses: [
        ...stepThreeData.addresses,
        {
          street: '',
          street2: '',
          city: '',
          state: '',
          postalCode: '',
          country: 'United States',
        },
      ],
    });
  };

  return (
    <>
      <div className="m-auto flex items-start justify-start w-full max-lg:flex-col">
        <div className="w-1/5 pr-2 max-lg:w-full max-lg:pr-0 max-lg:mb-6">
          <StepsProgress currentStep={currentStep} />
        </div>
        <div className="w-1/2 max-xl:w-full px-4 max-lg:px-36 max-sm:px-6">
          <h1 className="mb-8 text-md font-bold max-lg:mb-6">
            Create new company
          </h1>
          {currentStep === 0 && (
            <form onSubmit={stepOneForm.handleSubmit(handleStepOneSubmit)}>
              <div>
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
                <Controller
                  name="companyType"
                  control={stepOneForm.control}
                  render={({ field }) => (
                    <div className="mb-10">
                      <SimpleCustomSelect
                        changeEvent={field.onChange}
                        list={companyType}
                        title="Company Type"
                      />
                    </div>
                  )}
                />
              </div>
              <div className="py-3 fixed left-0 pl-72 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-start max-lg:px-36 max-lg:pl-0 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex justify-end max-xl:pr-8 max-lg:pr-0">
                  <button
                    type="submit"
                    className="min-w-28 rounded-md bg-mainBlue px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Next Step
                  </button>
                </div>
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
                    <div className="mb-6">
                      <SimpleCustomSelect
                        changeEvent={field.onChange}
                        list={stateList}
                        title="Registered In"
                      />
                    </div>
                  )}
                />
                <Controller
                  name="registrationDate"
                  control={stepTwoForm.control}
                  render={({ field }) => {
                    return <DatePicker field={field} />;
                  }}
                />
              </div>
              <div className="py-3 fixed left-0 pl-72 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-start max-lg:px-36 max-lg:pl-0 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex justify-end max-xl:pr-8 max-lg:pr-0">
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
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form onSubmit={stepThreeForm.handleSubmit(handleStepThreeSubmit)}>
              <div>
                {stepThreeData.addresses.map((address, index: number) => (
                  <div key={index}>
                    <div className="flex items-center justify-between mb-6 max-lg:flex-col">
                      <Controller
                        name={`addresses.${index}.street`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <CommonTextInput
                            id="street"
                            name="street"
                            field={field}
                            title="Street"
                          />
                        )}
                      />
                      <Controller
                        name={`addresses.${index}.street2`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <CommonTextInput
                            id="street2"
                            name="street2"
                            field={field}
                            title="Street 2"
                            extraStyles="ml-3"
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-6 max-lg:flex-col">
                      <Controller
                        name={`addresses.${index}.state`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <SimpleCustomSelect
                            changeEvent={field.onChange}
                            list={stateList}
                            title="State"
                          />
                        )}
                      />
                      <Controller
                        name={`addresses.${index}.city`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <CommonTextInput
                            id="city"
                            name="city"
                            field={field}
                            title="City"
                            extraStyles="ml-3"
                          />
                        )}
                      />
                    </div>
                    <div className="flex items-center justify-between mb-6 max-lg:flex-col">
                      <Controller
                        name={`addresses.${index}.postalCode`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <CommonTextInput
                            id="postCode"
                            name="postCode"
                            field={field}
                            title="Postal Code"
                          />
                        )}
                      />
                      <Controller
                        name={`addresses.${index}.country`}
                        control={stepThreeForm.control}
                        render={({ field }) => (
                          <CommonTextInput
                            id="country"
                            name="country"
                            field={field}
                            title="Country"
                            extraStyles="ml-3"
                            readonly
                          />
                        )}
                      />
                    </div>
                  </div>
                ))}
                <div className="w-full flex items-center justify-end mb-6">
                  <button type="button" onClick={addAddress}>
                    One more Address
                  </button>
                </div>
              </div>
              <div className="py-3 fixed left-0 pl-72 bottom-0 border-t w-full max-lg:left-0 flex items-start justify-start max-lg:px-36 max-lg:pl-0 max-sm:px-6">
                <div className="w-1/5 pr-2 max-lg:hidden" />
                <div className="w-1/2 max-xl:w-full flex justify-end max-xl:pr-8 max-lg:pr-0">
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
              </div>
            </form>
          )}
        </div>
      </div>
    </>
  );
};

export default CreateCompany;

import React, { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { Upload } from 'lucide-react';
import { classNames } from '../../../utils/helpers';
import SwitchButton from '../../../components/shared/SwitchButton/SwitchButton';
import SimpleAddressForm from '../../../components/shared/SimpleAddressForm/SimpleAddressForm';
import SimpleAddressFormNotUS from '../../../components/shared/SimpleAddressFormNotUS/SimpleAddressFormNotUS';
import { AddressFields } from '../../../interfaces/interfaces';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import DatePicker from '../../../components/shared/Modals/addCompanyFile/datePicker';
import XBtn from '../../../components/shared/buttons/XBtn';

export interface Person {
  id: string;
  fullName: string;
  email: string;
  sendInvitation: boolean;
  titles: string[];
  dateAdded: string;
  address: {
    type: 'US' | 'Other';
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
  picture: string;
}

interface AddPersonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (person: Person) => void;
}

const titles = [
  'Software Engineer',
  'Product Manager',
  'Marketing Manager',
  'Sales Representative',
  'HR Manager',
  'Operations Manager',
];

const defaultUS = {
  country: 'United States',
  address0: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  zip: '',
  state: '',
};

const defaultOther = {
  country: '',
  address0: '',
  address1: '',
  address2: '',
  address3: '',
  city: '',
  zip: '',
  state: '',
};

export function AddPersonModal({
  isOpen,
  onClose,
  onAdd,
}: AddPersonModalProps) {
  const [mandatoryError, setMandatoryError] = useState<boolean>(false);
  const [selected, setSelected] = useState<1 | 2>(1);
  const [address, setAddress] = React.useState<AddressFields>(defaultUS);
  const [dateValue, setDateValue] = React.useState<string>('');
  console.log(setMandatoryError, 'setMandatoryError');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    sendInvitation: true,
    titles: [] as string[],
    dateAdded: format(new Date(), 'yyyy-MM-dd'),
    addressType: 'US' as 'US' | 'Other',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    picture: '',
  });

  const formTypeHandler = (value: 1 | 2) => {
    if (value === 1) {
      setAddress(defaultUS);
    } else {
      setAddress(defaultOther);
    }

    setSelected(value);
  };

  const addressHandler = (key: string, value: string) => {
    setAddress((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const person: Person = {
      id: crypto.randomUUID(),
      fullName: formData.fullName,
      email: formData.email,
      sendInvitation: formData.sendInvitation,
      titles: formData.titles,
      dateAdded: formData.dateAdded,
      address: {
        type: formData.addressType,
        street: formData.street,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      },
      picture:
        formData.picture ||
        'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400',
    };
    onAdd(person);
    onClose();
  };

  const inputCommonClasses =
    'p-2 text-md border-b border-b-gray-200 placeholder:text-gray-500 hover:cursor-pointer focus:ring-0 focus:outline-none focus:border-gray-200';

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          as={motion.div}
          static
          open={isOpen}
          onClose={onClose}
          className="fixed inset-0 z-50 overflow-y-auto"
        >
          <div className="min-h-screen px-4 text-center">
            <Dialog.Overlay
              as={motion.div}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
            />

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ duration: 0.2 }}
              className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle bg-white shadow-xl rounded-md relative z-40"
            >
              <div className="flex justify-between items-center mb-6">
                <Dialog.Title
                  as="h3"
                  className="text-2xl font-semibold text-gray-900"
                >
                  Add New Person
                </Dialog.Title>
                <XBtn clickHandler={onClose} />
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="flex gap-6">
                  <div className="flex-1 space-y-6">
                    <div>
                      <div className="mb-2 font-bold text-sm">Full Name</div>
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, fullName: e.target.value })
                        }
                        className={classNames(
                          'block rounded-md border w-full border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer',
                          mandatoryError && !formData?.fullName && 'bg-red-50'
                        )}
                        type="text"
                        placeholder="Full name"
                        value={formData?.fullName}
                      />
                    </div>

                    <div>
                      <div className="font-bold mb-2 text-sm">Email</div>
                      <input
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                        className={classNames(
                          'block rounded-md border w-full  border-gray-200 p-2 text-md mb-2 text-gray-900 disabled:text-opacity-50 placeholder:text-gray-500  hover:cursor-pointer'
                        )}
                        type="text"
                        placeholder="Email"
                        value={formData.email}
                      />
                      <div className="mt-2">
                        <Checkbox
                          wrapperClass={'h-4 w-4'}
                          iconClass={'h-2 w-2'}
                          id={`Send invitation`}
                          title={'Send invitation'}
                          underInput={true}
                          checked={formData.sendInvitation}
                          onChange={(value) =>
                            setFormData({
                              ...formData,
                              sendInvitation: value,
                            })
                          }
                        />
                      </div>
                    </div>

                    <div>
                      <div className="font-bold mb-2 text-sm">Titles</div>
                      <div className="mt-2 grid grid-cols-2 gap-y-1 gap-x-20 w-full">
                        {titles.map((title, index) => (
                          <Checkbox
                            key={index}
                            id={`${index}`}
                            title={title}
                            underInput={false}
                            iconClass={'h-3 w-3'}
                            wrapperClass={'h-5 w-5 min-w-5 min-h-5'}
                            checked={formData.titles.includes(title)}
                            onChange={(value) => {
                              const newTitles = value
                                ? [...formData.titles, title]
                                : formData.titles.filter((t) => t !== title);
                              setFormData({ ...formData, titles: newTitles });
                            }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="w-48 space-y-4">
                    <div className="aspect-square rounded-lg border-2 border-dashed border-gray-300 p-2 flex flex-col items-center justify-center">
                      {formData.picture ? (
                        <img
                          src={formData.picture}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-lg"
                        />
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-1 text-sm text-gray-500">
                            Upload photo
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="font-bold mb-2 text-sm">Document Date</div>
                  <DatePicker
                    mandatoryError={mandatoryError}
                    value={dateValue}
                    setValue={setDateValue}
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-end justify-between">
                    <span className="font-bold text-sm">Address</span>
                    <SwitchButton
                      option1="US Address"
                      option2="Other"
                      selected={selected}
                      onSelect={formTypeHandler}
                    />
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: 'auto' }}
                    className="space-y-4"
                  >
                    {selected === 1 ? (
                      <SimpleAddressForm
                        disabledFlag={false}
                        inputCommonClasses={inputCommonClasses}
                        requiredError={mandatoryError}
                        countryDisabled={true}
                        data={address}
                        setData={addressHandler}
                      />
                    ) : (
                      <SimpleAddressFormNotUS
                        disabledFlag={false}
                        inputCommonClasses={inputCommonClasses}
                        requiredError={mandatoryError}
                        data={address}
                        setData={addressHandler}
                      />
                    )}
                  </motion.div>
                </div>

                <div className="mr-auto flex items-center justify-end">
                  <div className="w-1/2" />
                  <div
                    onClick={() => {}}
                    className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Cancel
                  </div>
                  <div
                    onClick={() => {}}
                    className="block rounded-md bg-mainBlue px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-sideBarBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                  >
                    Submit
                  </div>
                </div>
              </form>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
}

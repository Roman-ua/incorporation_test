import React, { useState, useEffect } from 'react';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';
import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';
import XBtn from '../../../components/shared/buttons/XBtn';
import { classNames } from '../../../utils/helpers';
import { validateEmail } from '../../../utils/validators';

interface EmailModalProps {
  setClose: () => void;
  onSubmit: (email: string, sendInvitation: boolean) => void;
  open: boolean;
}

export function EmailModal({ setClose, open, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [sendInvitation, setSendInvitation] = useState(false);
  const [mandatoryError, setMandatoryError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateEmail(email)) {
      setMandatoryError(false);
      onSubmit(email.trim(), sendInvitation);
      setEmail('');
      setSendInvitation(false);
    } else {
      setMandatoryError(true);
    }
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setClose();
    };

    if (open) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = '';
    };
  }, [open, setClose]);

  if (!open) return null;

  return (
    <ModalWrapperLayout closeModal={setClose} isOpen={open}>
      <form onSubmit={handleSubmit} noValidate>
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-xl font-medium tracking-tight">
              <span>Add Email</span>
              <XBtn clickHandler={setClose} />
            </h2>
            <p className="text-slate-600 text-sm mt-1">
              Enter an email address for this person.
            </p>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-slate-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="person@example.com"
              data-1p-ignore={true}
              className={classNames(
                'w-full px-3 py-2 border  rounded-md focus:outline-none focus:ring-1 ',
                mandatoryError && !validateEmail(email)
                  ? 'border-red-400 focus:ring-red-400 focus:border-red-400'
                  : 'border-slate-200 focus:ring-slate-400 focus:border-slate-400'
              )}
            />

            <div className="flex items-center space-x-2 mt-3">
              <Checkbox
                mandatoryError={false}
                wrapperClass={'h-4 w-4 min-w-4 min-h-4'}
                iconClass={'h-2.5 w-2.5'}
                id={`Send invitation`}
                title={'Send invitation'}
                underInput={true}
                checked={sendInvitation}
                onChange={(value) => setSendInvitation(value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 bg-slate-100 rounded-b-lg">
          <button
            type="button"
            onClick={setClose}
            className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={classNames(
              'ml-2 block rounded-md px-3 py-2 text-center text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out',
              validateEmail(email)
                ? 'bg-mainBlue hover:bg-sideBarBlue'
                : 'bg-gray-500'
            )}
          >
            Save
          </button>
        </div>
      </form>
    </ModalWrapperLayout>
  );
}

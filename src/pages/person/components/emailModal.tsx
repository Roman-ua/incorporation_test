import React, { useState } from 'react';
import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import { Checkbox } from '../../../components/shared/Checkboxes/CheckBoxSq';

interface EmailModalProps {
  setOpen: () => void;
  onSubmit: (email: string, sendInvitation: boolean) => void;
  open: boolean;
}

export function EmailModal({ setOpen, open, onSubmit }: EmailModalProps) {
  const [email, setEmail] = useState('');
  const [sendInvitation, setSendInvitation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit(email.trim(), sendInvitation);
      setEmail('');
      setSendInvitation(false);
    }
  };

  return (
    <Dialog open={open} onClose={setOpen} className="fixed z-10">
      <DialogBackdrop className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
          <DialogPanel className="relative transform rounded-lg overflow-hidden bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95">
            <form onSubmit={handleSubmit}>
              <div className="p-6">
                <div className="mb-6">
                  <h2 className="text-xl font-medium tracking-tight">
                    Add Email
                  </h2>
                  <p className="text-slate-600 text-sm mt-1">
                    Enter an email address for this person.
                  </p>
                </div>

                <div className="space-y-2">
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
                      required
                      className="w-full px-3 py-2 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-slate-400 focus:border-slate-400"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
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

              <div className="flex justify-end gap-2 px-6 py-4 bg-slate-50">
                <button
                  type="button"
                  onClick={setOpen}
                  className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-mainBlue hover:bg-sideBarBlue ml-2 block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
                >
                  Save
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
}

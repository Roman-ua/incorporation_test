import ModalWrapperLayout from '../../../components/shared/Modals/ModalWrapperLayout';
import XBtn from '../../../components/shared/buttons/XBtn';
import { inputError, inputSimpleFocus } from '../../../constants/form/form';
import { classNames } from '../../../utils/helpers';
import React, { useEffect } from 'react';

interface IProps {
  isOpen: boolean;
  setOpen: (value: boolean) => void;
  saveHandler: () => void;
}
const LinkToXeroModal = ({ isOpen, setOpen, saveHandler }: IProps) => {
  const [link, setLink] = React.useState<string>('');
  const [validationError, setValidationError] = React.useState<boolean>(false);
  const [mandatoryError, setMandatoryError] = React.useState(false);

  useEffect(() => {
    setMandatoryError(false);
    setValidationError(false);
  }, [link]);

  const validationHandler = (linkToValidate: string) => {
    try {
      const url = new URL(linkToValidate);

      if (url.hostname !== 'go.xero.com') {
        setValidationError(true);
        return false;
      }

      // 2) UUID в пути
      const uuidRegex =
        /[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}/i;

      const testResult = uuidRegex.test(url.pathname);

      if (!testResult) {
        setValidationError(true);
        return false;
      } else {
        setValidationError(false);
        return true;
      }
    } catch {
      setValidationError(true);
      return false;
    }
  };

  return (
    <ModalWrapperLayout closeModal={() => setOpen(false)} isOpen={isOpen}>
      <>
        <div className={'p-6'}>
          <div className="mb-6">
            <h2 className="text-xl font-medium tracking-tight">
              <span>Link to Xero</span>
              <XBtn
                clickHandler={() => {
                  setOpen(false);
                }}
              />
            </h2>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="Link"
              className="block text-sm font-medium text-slate-700"
            >
              Provide Related Link
            </label>
            <input
              onChange={(e) => setLink(e.target.value)}
              className={classNames(
                'w-full px-3 py-2 border rounded-md focus:outline-none',
                mandatoryError || validationError
                  ? inputError
                  : inputSimpleFocus
              )}
              onBlur={() => validationHandler(link)}
              data-1p-ignore={true}
              type="text"
              placeholder="Link"
              value={link}
            />
            {validationError && (
              <div className="text-xs text-red-700 mt-2">
                Provide please valid Link
              </div>
            )}
          </div>
        </div>
        <div className="w-full gap-2 px-6 py-4 bg-slate-100 rounded-b-lg">
          <div className="mr-auto flex items-center justify-end">
            <div
              onClick={() => {
                setOpen(false);
              }}
              className="mr-2 block px-3 py-2 text-center text-sm font-semibold text-gray-800 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                if (link && !validationError) {
                  saveHandler();
                } else {
                  setMandatoryError(true);
                }
              }}
              className={classNames(
                'ml-2 block rounded-md  px-3 py-2 text-center text-sm font-semibold text-white shadow-sm  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 transition-all duration-150 ease-in-out hover:cursor-pointer',
                link && !validationError
                  ? 'bg-mainBlue hover:bg-sideBarBlue'
                  : 'bg-gray-500'
              )}
            >
              Link
            </div>
          </div>
        </div>
      </>
    </ModalWrapperLayout>
  );
};

export default LinkToXeroModal;

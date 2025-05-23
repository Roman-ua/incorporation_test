import React, { useState } from 'react';
import SectionHeading from '../../createCompany/components/SectionHeading';
import { toast } from 'sonner';
import { Banner } from '../../../components/shared/Baner/Baner';
import { AnimatePresence } from 'framer-motion';
import { useRecoilState } from 'recoil';
import ThemeState from '../../../state/atoms/Theme';

const NotificationsElements = () => {
  const [showWarning, setShowWarning] = useState(false);
  const [showError, setShowError] = useState(false);
  const [theme, setTheme] = useRecoilState(ThemeState);

  return (
    <main className="flex flex-col items-start justify-start mb-20">
      <div className="w-full max-w-md space-y-8">
        <div>
          <SectionHeading
            text={'Notification Banners'}
            status={false}
            hideStatus={true}
          />
        </div>

        <AnimatePresence initial={false}>
          {showWarning && (
            <Banner
              key="warning"
              type="warning"
              title="Warning"
              message="This is an warning message that requires manual dismissal"
              actionClickHandler={() => undefined}
              onClose={() => setShowWarning(false)}
              actionTitle={'Warning Action'}
            />
          )}
        </AnimatePresence>

        <AnimatePresence initial={false}>
          {showError && (
            <Banner
              type="error"
              title="Error"
              message="This is an error message that requires manual dismissal"
              actionClickHandler={() => undefined}
              onClose={() => setShowError(false)}
              actionTitle={'Error Action'}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-2 gap-4">
          <div
            onClick={() => {
              toast.info('Simple event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
              });
            }}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center"
          >
            <span className="font-medium">Info</span>
            <span className="text-xs text-gray-500">
              White background, black text
            </span>
          </div>

          <div
            onClick={() => setShowWarning(true)}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100"
          >
            <span className="font-medium">Warning</span>
            <span className="text-xs text-amber-700">
              Yellow background, black text
            </span>
          </div>

          <div
            onClick={() => setShowError(true)}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-red-600 text-white border-red-700 hover:bg-red-700"
          >
            <span className="font-medium">Critical</span>
            <span className="text-xs text-white/90">
              Red background, white text
            </span>
          </div>

          <div
            onClick={() => {
              toast.success('Success event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
              });
            }}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center bg-green-600 text-white border-green-700 hover:bg-green-700"
          >
            <span className="font-medium">Done</span>
            <span className="text-xs text-white/90">
              Green background, white text
            </span>
          </div>

          <div
            onClick={() => {
              toast('White mode event has been created', {
                description: 'Sunday, December 03, 2023 at 9:00 AM',
              });
            }}
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center"
          >
            <span className="font-medium">Simple option</span>
            <span className="text-xs text-gray/90">
              White background, black text
            </span>
          </div>
          <div
            className="border hover:cursor-pointer rounded-md h-20 flex flex-col items-center justify-center"
            onClick={() =>
              setTheme(
                theme.theme === 'light' ? { theme: 'dark' } : { theme: 'light' }
              )
            }
          >
            <div>
              current theme:{' '}
              <span className="font-semibold">{theme.theme}</span>
            </div>
            <div className="text-xs text-gray/90">
              Click here to change theme
            </div>
            <div className="text-xs text-gray/90">
              After changing theme check toasts
            </div>
          </div>
        </div>
        <p className="text-sm text-gray-600">
          Click the buttons below to show different types of notifications
        </p>
      </div>
    </main>
  );
};

export default NotificationsElements;

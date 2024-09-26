import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import ConfettiAp from '../../components/shared/Confetti';
import SectionHeading from './components/SectionHeadeing';
import TasksSection from './components/TasksSection';
import MessagesSection from './components/MessagesSection';

function Home() {
  const navigate = useNavigate();
  const localData = localStorage.getItem('multistep-form-data');
  const [confetti, setConfetti] = React.useState(false);
  const [companyData, setCompanyData] = React.useState(
    localData ? JSON.parse(localData) : undefined
  );

  useEffect(() => {
    setCompanyData(localData ? JSON.parse(localData) : undefined);

    const timer = setTimeout(() => {
      if (!localStorage.getItem('confetti_success')) {
        setConfetti(true);
        localStorage.setItem('confetti_success', 'true');
      }
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  const handleButtonClick = () => {
    navigate(ROUTES.CREATE_COMPANY);
  };

  return (
    <div className="w-full p-4">
      {confetti && <ConfettiAp />}
      {!companyData ? (
        <div className="w-full flex-row mt-[20%]">
          <div className="w-full flex items-center justify-center mb-6">
            <ExclamationCircleIcon className="text-mainBlue w-10 h-10" />
          </div>
          <div className="mb-8 text-center text-lg">
            {`${"You don't have any registered company"}`} <br />
            and you are not affiliated with any company
          </div>
          <div className="text-center">
            <button
              onClick={handleButtonClick}
              type="button"
              className="rounded-md bg-mainBlue px-4 py-3 text-base font-semibold text-white shadow-sm hover:bg-mainBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mainBlue"
            >
              Add Company
            </button>
          </div>
        </div>
      ) : (
        <>
          <SectionHeading title={'General'} />
          <div className="flex items-center justify-between mb-8">
            <MessagesSection />
            <TasksSection />
          </div>
          <SectionHeading title={'Companies List'} />
          {/*{JSON.stringify(companyData)}*/}
        </>
      )}
    </div>
  );
}

export default Home;

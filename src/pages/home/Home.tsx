import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import ConfettiAp from '../../components/shared/Confetti';
import CompaniesList from './components/CompaniesList';
import SearchHeading from './components/SearchHeading';

function Home() {
  const navigate = useNavigate();
  const [confetti, setConfetti] = React.useState(false);

  const localData = localStorage.getItem('multistep-form-data');
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
    <div className="relative pl-10 pr-10 py-8 max-sm:pl-4 max-sm:pr-4 container max-w-7xl mx-auto">
      {confetti && <ConfettiAp />}
      {!companyData ? (
        <div className="w-full flex-row mt-[20%] text-sm">
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
          <SearchHeading />
          <CompaniesList />
        </>
      )}
    </div>
  );
}

export default Home;

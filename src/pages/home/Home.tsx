import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import ConfettiAp from '../../components/shared/Confetti';

function Home() {
  const navigate = useNavigate();

  const [confetti, setConfetti] = React.useState(false);
  const [companyData, setCompanyData] = React.useState(
    JSON.parse(localStorage.getItem('multistep-form-data') || 'undefined')
  );

  useEffect(() => {
    setCompanyData(
      JSON.parse(localStorage.getItem('multistep-form-data') || 'undefined')
    );

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
    <div className="w-full">
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
        <div className="relative">{JSON.stringify(companyData)}</div>
      )}
    </div>
  );
}

export default Home;

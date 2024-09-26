import React, { useEffect } from 'react';
import { ExclamationCircleIcon } from '@heroicons/react/20/solid';
import { ROUTES } from '../../constants/navigation/routes';
import { useNavigate } from 'react-router-dom';
import ConfettiAp from '../../components/shared/Confetti';
import SectionHeading from './components/SectionHeadeing';
import CompaniesList from './components/CompaniesList';

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
    <div className="relative">
      <div className="flex px-4 py-3 border-b overflow-hidden w-full fixed left-72 top-0 bg-white max-lg:left-0 max-lg:top-16">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600 mr-3 rotate-90"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
        <input
          type="text"
          placeholder="Search Something..."
          className="w-full outline-none bg-transparent text-gray-700 text-sm"
        />
      </div>
      <div className="w-full p-6">
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
            <div className="h-12" />
            <SectionHeading title={'Companies List'} />
            <CompaniesList />
          </>
        )}
      </div>
    </div>
  );
}

export default Home;

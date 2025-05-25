import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { ROUTES } from '../../../constants/navigation/routes';
import { useSetRecoilState } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';
import {
  ICompanyData,
  ICompanyDataForSave,
} from '../../../state/types/company';

const useCompany = () => {
  const navigate = useNavigate();
  const setCompaniesList = useSetRecoilState(WorkspacesState);

  const getAllowedCompanyTypes = async () => {
    const response = await axiosInstance.get('/company/types/');
    console.log(response, 'response');
  };

  const getCompaniesList = async () => {
    const response = await axiosInstance.get('/company/list/');

    if (!response.data.length) {
      navigate(ROUTES.WORKSPACES);
      return;
    }

    const selectedCompanyName = localStorage.getItem('selected_company');

    setCompaniesList((prevData) => {
      const result = {
        ...prevData,
        list: response.data,
      };

      if (selectedCompanyName) {
        const lastSelectedCompany = response.data.find(
          (company: ICompanyData) => company.name === selectedCompanyName
        );

        result.current = lastSelectedCompany;
      }

      return result;
    });
  };

  const createCompanyHandler = async (data: ICompanyDataForSave) => {
    const response = await axiosInstance.post('/company/create/', data);
    if (response.data?.name) {
      localStorage.setItem('selected_company', `${response.data?.name}`);
      setCompaniesList((prevState) => {
        return {
          ...prevState,
          current: response.data,
          list: [...prevState.list, response.data],
        };
      });

      navigate(ROUTES.HOME);
    }
  };

  return {
    getCompaniesList,
    createCompanyHandler,
    getAllowedCompanyTypes,
  };
};

export default useCompany;

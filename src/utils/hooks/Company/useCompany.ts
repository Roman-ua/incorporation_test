import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { ROUTES } from '../../../constants/navigation/routes';
import { useSetRecoilState } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';
import {
  ICompanyData,
  ICompanyDataForSave,
} from '../../../state/types/company';
import useEin from '../EIN/useEin';
import EinState from '../../../state/atoms/EIN';
import useCompanyIdFromUrl from './useCompanyIdBAsedLocation';
import { errorHandler, successHandler } from '../../helpers';
import { ErrorResponse } from '../../../state/types/errors';

const useCompany = () => {
  const navigate = useNavigate();
  const id = useCompanyIdFromUrl();

  const setCompaniesList = useSetRecoilState(WorkspacesState);
  const setEin = useSetRecoilState(EinState);

  const { getEin } = useEin();

  const getAllowedCompanyTypes = async () => {
    try {
      const response = await axiosInstance.get('/company/types/');
      console.log(response, 'response');
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  const getCompaniesList = async () => {
    try {
      const response = await axiosInstance.get('/company/list/');

      if (!response.data.length) {
        setCompaniesList((prevData) => {
          return {
            ...prevData,
            dataRequested: true,
          };
        });

        navigate(ROUTES.WORKSPACES);
        return;
      }

      const selectedCompanyId = id || localStorage.getItem('selected_company');

      if (selectedCompanyId) {
        const lastSelectedCompany = response.data.find(
          (company: ICompanyData) => company.id === +selectedCompanyId
        );

        if (lastSelectedCompany?.ein) {
          await getEin(lastSelectedCompany.ein);
        }
      }

      setCompaniesList((prevData) => {
        const result = {
          ...prevData,
          list: response.data,
          dataRequested: true,
        };

        if (selectedCompanyId) {
          const lastSelectedCompany = response.data.find(
            (company: ICompanyData) => company.id === +selectedCompanyId
          );

          result.current = lastSelectedCompany;
        }
        return result;
      });
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  const createCompanyHandler = async (data: ICompanyDataForSave) => {
    try {
      const response = await axiosInstance.post('/company/create/', data);
      if (response.data?.name) {
        successHandler(
          response.data.messages || [],
          response.data.titles || []
        );

        localStorage.setItem('selected_company', `${response.data?.name}`);
        setCompaniesList((prevState) => {
          return {
            ...prevState,
            current: response.data,
            list: [...prevState.list, response.data],
          };
        });

        localStorage.removeItem('finalFormData');
        localStorage.removeItem('multistep-form-data');
        setEin(null);
        navigate(`${ROUTES.HOME}/c_${response.data.id}`);
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  const getSpecificCompany = async (id: number) => {
    try {
      const response = await axiosInstance.get(`/company/${id}/`);
      if (response.data.message === 'Company details fetched successfully') {
        setCompaniesList((prevState) => {
          return {
            ...prevState,
            current: response.data.company_details,
          };
        });
      }
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  return {
    getCompaniesList,
    createCompanyHandler,
    getAllowedCompanyTypes,
    getSpecificCompany,
  };
};

export default useCompany;

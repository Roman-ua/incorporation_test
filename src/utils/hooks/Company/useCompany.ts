import { useNavigate, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../../api/axios';
import { ROUTES } from '../../../constants/navigation/routes';
import { useSetRecoilState } from 'recoil';
import WorkspacesState from '../../../state/atoms/Workspaces';
import {
  ICompanyData,
  ICompanyDataForSave,
} from '../../../state/types/company';
import { toast } from 'sonner';
import axios, { AxiosError } from 'axios';
import useEin from '../EIN/useEin';
import EinState from '../../../state/atoms/EIN';

const useCompany = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const id = searchParams.get('id');

  const setCompaniesList = useSetRecoilState(WorkspacesState);
  const setEin = useSetRecoilState(EinState);

  const { getEin } = useEin();

  const getAllowedCompanyTypes = async () => {
    try {
      const response = await axiosInstance.get('/company/types/');
      console.log(response, 'response');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.error('Error!', {
          description: axiosError.message ?? 'Unknown error',
        });
      } else {
        toast.error('Unexpected Error', {
          description: 'Something went wrong',
        });
      }
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.error('Error!', {
          description: axiosError.message ?? 'Unknown error',
        });
      } else {
        toast.error('Unexpected Error', {
          description: 'Something went wrong',
        });
      }
    }
  };

  const createCompanyHandler = async (data: ICompanyDataForSave) => {
    try {
      const response = await axiosInstance.post('/company/create/', data);
      if (response.data?.name) {
        toast.success('Success', {
          description: `Company ${response.data?.name} created successfully`,
        });

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
        navigate(`${ROUTES.HOME}?id=${response.data.id}`);
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;

        toast.error('Error!', {
          description: axiosError.message ?? 'Unknown error',
        });
      } else {
        toast.error('Unexpected Error', {
          description: 'Something went wrong',
        });
      }
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
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError;
        toast.error('Error!', {
          description: axiosError.message ?? 'Unknown error',
        });
      } else {
        toast.error('Unexpected Error', {
          description: 'Something went wrong',
        });
      }
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

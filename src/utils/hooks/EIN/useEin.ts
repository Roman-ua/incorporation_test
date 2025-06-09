import { useRecoilState, useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { EinDocumentCreate } from '../../../state/types/einTypes';
import EinState from '../../../state/atoms/EIN';

import { AxiosError } from 'axios';
import { toast } from 'sonner';
import axios from 'axios';

const useEin = () => {
  const [workspacesState, setWorkspacesState] = useRecoilState(WorkspacesState);
  const setEin = useSetRecoilState(EinState);

  const updateLocalCompany = async () => {
    try {
      const compnyResponse = await axiosInstance.get(
        `/company/${workspacesState.current.id}/`
      );

      if (
        compnyResponse.data.message === 'Company details fetched successfully.'
      ) {
        setWorkspacesState((prevState) => {
          return {
            ...prevState,
            list: prevState.list.map((item) =>
              item.id === compnyResponse.data.company_details.id
                ? compnyResponse.data.company_details
                : item
            ),
            current: compnyResponse.data.company_details,
          };
        });
        await getEin(compnyResponse.data.company_details.ein);
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

  const getEin = async (id: number) => {
    if (!id) return;

    try {
      const response = await axiosInstance.get(`/company/ein/${id}/`);
      const einElement = {
        ...response.data,
        company: response.data.company[0],
      };

      if (einElement) {
        setEin(einElement || null);
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

  const createEin = async (data: EinDocumentCreate, documentFlag: boolean) => {
    try {
      if (!data.document) {
        const response = await axiosInstance.post(
          `/company/${workspacesState.current.id}/ein/create/`,
          {
            ein_number: data.ein_number,
          }
        );

        if (response.data.ein) {
          await getEin(response.data.ein.id);
        }

        toast.success('Tax ID Added', {
          description: `Your Tax ID (EIN) has been successfully added to ${data.company_name}`,
        });

        return;
      }

      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString().split('T')[0]);
        } else {
          formData.append(key, value as string);
        }
      });

      await axiosInstance.post(
        `/company/${workspacesState.current.id}/ein-documents/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await updateLocalCompany();

      if (documentFlag) {
        toast.success('Document Added', {
          description: `Your ${data.document_type} confirmation document has been uploaded for ${data.company_name}`,
        });
      } else {
        toast.success('Tax ID Added', {
          description: `Your Tax ID (EIN) has been successfully added to ${data.company_name}`,
        });
      }
    } catch (error: unknown) {
      if (documentFlag) {
        toast.error('Oops', {
          description: `We couldn’t upload your ${data.document_type} document for ${data.company_name}. Please try again.`,
        });
      } else {
        toast.error('Oops', {
          description: `We couldn’t add your Tax ID (EIN) for ${data.company_name}. Please try again.`,
        });
      }
    }
  };

  const deleteEin = async (id: number) => {
    try {
      await axiosInstance.delete(`/company/ein/${id}/`);
      await updateLocalCompany();

      toast.success('Success', {
        description: `EIN deleted successfully`,
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

  const deleteEinDocument = async (id: number) => {
    try {
      await axiosInstance.delete(`/company/ein-documents/${id}/`);

      if (workspacesState.current.ein) {
        await getEin(workspacesState.current.ein);
      }

      toast.success('Success', {
        description: `EIN document deleted successfully`,
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

  const updateEinStatus = async (
    id: number,
    status: string,
    einNumber: string
  ) => {
    console.log(status);
    try {
      await axiosInstance.patch(`/company/ein/${id}/`, {
        ein_number: einNumber,
        status: status,
        last_verification_date: new Date().toISOString().split('T')[0],
      });

      if (workspacesState.current.ein) {
        await getEin(workspacesState.current.ein);
      }

      if (status === 'confirmed') {
        toast.success('Tax ID Confirmed', {
          description: `Your Tax ID (EIN) status for ${workspacesState.current.name} is now Confirmed.`,
        });
      } else {
        toast.success('Success', {
          description: `EIN status updated successfully`,
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

  return { createEin, getEin, deleteEin, deleteEinDocument, updateEinStatus };
};

export default useEin;

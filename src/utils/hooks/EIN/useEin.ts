import { useRecoilState, useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { EinDocumentCreate } from '../../../state/types/einTypes';
import EinState from '../../../state/atoms/EIN';
import { ErrorResponse } from '../../../state/types/errors';
import { errorHandler, successHandler } from '../../helpers';
import { toast } from 'sonner';

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
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
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
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  const createEin = async (data: EinDocumentCreate) => {
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

        successHandler(
          response.data.messages || [],
          response.data.titles || []
        );
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

      const responseEin = await axiosInstance.post(
        `/company/${workspacesState.current.id}/ein-documents/`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      await updateLocalCompany();

      successHandler(
        responseEin.data.messages || [],
        responseEin.data.titles || []
      );
    } catch (error: unknown) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
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
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
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
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  const updateEinStatus = async (
    id: number,
    status: string,
    einNumber: string
  ) => {
    try {
      const response = await axiosInstance.patch(`/company/ein/${id}/`, {
        ein_number: einNumber,
        status: status,
        last_verification_date: new Date().toISOString().split('T')[0],
      });

      if (workspacesState.current.ein) {
        await getEin(workspacesState.current.ein);
      }

      successHandler(response.data.messages || [], response.data.titles || []);
    } catch (error) {
      const errorResponse = error as ErrorResponse;
      errorHandler(errorResponse);
    }
  };

  return { createEin, getEin, deleteEin, deleteEinDocument, updateEinStatus };
};

export default useEin;

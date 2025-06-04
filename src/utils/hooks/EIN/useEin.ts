import { useRecoilState, useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { EinDocumentCreate } from '../../../state/types/einTypes';
import EinState from '../../../state/atoms/EIN';

const useEin = () => {
  const [workspacesState, setWorkspacesState] = useRecoilState(WorkspacesState);
  const setEin = useSetRecoilState(EinState);

  const getEin = async (id: number) => {
    if (!id) return;

    const response = await axiosInstance.get(`/company/ein/${id}/`);
    const einElement = { ...response.data, company: response.data.company[0] };

    if (einElement) {
      setEin(einElement || null);
    }
  };

  const createEin = async (data: EinDocumentCreate) => {
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

    const compnyResponse = await axiosInstance.get(
      `/company/${workspacesState.current.id}/`
    );

    if (
      compnyResponse.data.message === 'Company details fetched successfully.'
    ) {
      setWorkspacesState((prevState) => {
        return {
          ...prevState,
          current: compnyResponse.data.company_details,
        };
      });
      await getEin(compnyResponse.data.company_details.ein);
    }
  };

  const deleteEin = async (id: number) => {
    await axiosInstance.delete(`/company/ein/${id}/`);
  };

  const deleteEinDocument = async (id: number) => {
    await axiosInstance.delete(`/company/ein-documents/${id}/`);

    if (workspacesState.current.ein) {
      await getEin(workspacesState.current.ein);
    }
  };

  const updateEinStatus = async (
    id: number,
    status: string,
    einNumber: string
  ) => {
    await axiosInstance.patch(`/company/ein/${id}/`, {
      ein_number: einNumber,
      status: status,
      last_verification_date: new Date().toISOString().split('T')[0],
    });

    if (workspacesState.current.ein) {
      await getEin(workspacesState.current.ein);
    }
  };

  return { createEin, getEin, deleteEin, deleteEinDocument, updateEinStatus };
};

export default useEin;

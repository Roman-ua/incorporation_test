import { useRecoilValue, useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import WorkspacesState from '../../../state/atoms/Workspaces';
import { EinDocumentCreate } from '../../../state/types/einTypes';
import EinState from '../../../state/atoms/EIN';

const useEin = () => {
  const workspacesState = useRecoilValue(WorkspacesState);
  const setEin = useSetRecoilState(EinState);

  const getEin = async (id: number) => {
    const response = await axiosInstance.get(`/company/${id}/ein-documents/`);
    setEin(response.data?.[0] || null);
  };

  const createEin = async (data: EinDocumentCreate) => {
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

    await getEin(workspacesState.current.id);
  };

  return { createEin, getEin };
};

export default useEin;

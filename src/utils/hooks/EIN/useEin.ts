import { useRecoilValue } from 'recoil';
import axiosInstance from '../../../api/axios';
import { IEin } from '../../../state/atoms/EIN';
import WorkspacesState from '../../../state/atoms/Workspaces';

const useEin = () => {
  const workspacesState = useRecoilValue(WorkspacesState);

  const createEin = async (data: IEin) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value instanceof Date) {
        formData.append(key, value.toISOString().split('T')[0]);
      } else {
        formData.append(key, value as string);
      }
    });

    const response = await axiosInstance.post(
      `/company/${workspacesState.current.id}/ein-documents/`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    console.log(response.data);
  };
  const getEin = () => {};
  return { createEin, getEin };
};

export default useEin;

import { useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import GlobalDataState from '../../../state/atoms/GlobalData';

const useGlobalData = () => {
  const setGlobalData = useSetRecoilState(GlobalDataState);
  const getAllGlobalData = async () => {
    const data = {
      countryies: [],
      states: [],
      statuses: [],
      types: [],
    };

    const respCountryies = await axiosInstance.get('/company/countries/');
    data.countryies = respCountryies.data;

    const respStates = await axiosInstance.get('/company/states/');
    data.states = respStates.data;

    const respStatuses = await axiosInstance.get('/company/statuses/');
    data.statuses = respStatuses.data;

    const respTypes = await axiosInstance.get('/company/types/');
    data.types = respTypes.data;

    setGlobalData(data);
  };
  return { getAllGlobalData };
};

export default useGlobalData;

import { useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import UserProfileState, { IUser } from '../../../state/atoms/UserProfile';

const UseUserData = () => {
  const setData = useSetRecoilState(UserProfileState);

  const getUserData = async (): Promise<void> => {
    const respose = await axiosInstance.get<IUser>('/user/profile/');

    setData({ data: respose.data });
  };

  const logout = async () => {
    await axiosInstance.get<IUser>('/user/auth0/logout/');
  };
  return { getUserData, logout };
};

export default UseUserData;

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
    const respose = await axiosInstance.post(
      `${process.env.REACT_APP_MAIN_URL}/user/auth0/logout/`
    );

    if (respose?.data?.auth0_logout_url) {
      window.location.replace(`${respose?.data?.auth0_logout_url}`);
    }
  };
  return { getUserData, logout };
};

export default UseUserData;

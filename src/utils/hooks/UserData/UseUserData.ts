import { useSetRecoilState } from 'recoil';
import axiosInstance from '../../../api/axios';
import UserProfileState, { IUser } from '../../../state/atoms/UserProfile';
import { IUpdateUserContactInfo } from '../../../state/types/user';

const UseUserData = () => {
  const setData = useSetRecoilState(UserProfileState);

  const getUserData = async (): Promise<void> => {
    const respose = await axiosInstance.get<IUser>('/user/profile/');

    setData({ data: respose.data });
  };

  const updateUserData = async (
    data: IUpdateUserContactInfo
  ): Promise<void> => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== undefined) {
        formData.append(key, value);
      }
    });

    await axiosInstance.patch<IUser>('/user/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await getUserData();
  };

  const updateAvatar = async (image: File) => {
    const formData = new FormData();
    formData.append('image', image);
    await axiosInstance.patch<IUser>('/user/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await getUserData();
  };

  const deleteAvatar = async () => {
    const formData = new FormData();
    formData.append('image', '');
    await axiosInstance.patch<IUser>('/user/profile/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    await getUserData();
  };

  const logout = async () => {
    const refresh_token = localStorage.getItem('refreshToken');
    const respose = await axiosInstance.post(
      `${process.env.REACT_APP_MAIN_URL}/user/auth0/logout/`,
      { refresh_token }
    );

    if (respose?.data?.auth0_logout_url) {
      window.location.replace(`${respose?.data?.auth0_logout_url}`);
    }
  };
  return { getUserData, logout, updateUserData, updateAvatar, deleteAvatar };
};

export default UseUserData;

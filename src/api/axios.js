import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem('refreshToken');

      try {
        const response = await axiosInstance.post('refresh/', {
          refresh: refreshToken,
        });
        if (response.status === 200) {
          localStorage.setItem('accessToken', response.data.access);

          axiosInstance.defaults.headers.common['Authorization'] =
            'Bearer ' + response.data.accessToken;
          return axiosInstance(originalRequest);
        } else {
          localStorage.clear();
        }
      } catch (e) {
        console.error('Token refresh failed:', e);
        localStorage.clear();
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

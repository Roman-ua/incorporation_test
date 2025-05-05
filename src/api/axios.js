import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers['Authorization'] = 'Bearer ' + token;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        localStorage.clear();
        window.location.replace(
          `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
        );
        return Promise.reject(error);
      }

      try {
        const response = await fetch(
          `${process.env.REACT_APP_MAIN_URL}/user/auth0/refresh-token/`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);

          axiosInstance.defaults.headers.common['Authorization'] =
            'Bearer ' + data.access_token;

          originalRequest.headers['Authorization'] =
            'Bearer ' + data.access_token;

          return axiosInstance(originalRequest);
        } else {
          localStorage.clear();
          window.location.replace(
            `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
          );
          return Promise.reject(error);
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.clear();
        window.location.replace(
          `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
        );
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;

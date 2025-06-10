import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

interface RefreshTokenResponse {
  access_token: string;
  refresh_token: string;
}

const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_MAIN_URL,
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
    const token = localStorage.getItem('accessToken');
    if (token && config.headers) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse): AxiosResponse => response,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async (error: AxiosError): Promise<any> => {
    const originalRequest = error.config as AxiosRequestConfig & {
      _retry?: boolean;
    };

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem('refreshToken');
      if (!refreshToken) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

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
          const data: RefreshTokenResponse = await response.json();

          localStorage.setItem('accessToken', data.access_token);
          localStorage.setItem('refreshToken', data.refresh_token);

          axiosInstance.defaults.headers.common['Authorization'] =
            `Bearer ${data.access_token}`;

          if (originalRequest.headers) {
            originalRequest.headers['Authorization'] =
              `Bearer ${data.access_token}`;
          }

          return axiosInstance(originalRequest);
        } else {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          window.location.replace(
            `${process.env.REACT_APP_MAIN_URL}/user/auth0/authorize/`
          );
          return Promise.reject(error);
        }
      } catch (err) {
        console.error('Token refresh failed:', err);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');

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

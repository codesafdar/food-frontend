import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});


axiosInstance.interceptors.request.use(
  (config) => {

    const accessToken = localStorage.getItem("access_token")
    if (accessToken) {
      config.headers["Authorization"] = "Bearer " + accessToken;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);


//response interceptor to refresh token on receiving token expired error
axiosInstance.interceptors.response.use(
  async (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    let refreshToken = localStorage.getItem("refresh_token")

    if (refreshToken && error.response.status === 401 && !originalRequest._retry)
     {

      originalRequest._retry = true;
      try {
        const token = { refresh: refreshToken }
        return await axios
          .post(`${process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL}`, token)
          .then((res) => {

            if (res.status === 201) {

              const response = res.data
              localStorage.setItem("access_token", (response.access_token))
              localStorage.setItem("refresh_token", (response.refresh_token))

              return axiosInstance(originalRequest)
            }
          });
      }
      catch (_error) {
        localStorage.clear()
        window.location.href = `${process.env.NEXT_PUBLIC_NEXT_BASE_URL}auth/admin-login`
        return Promise.reject(_error)
      }

    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
import Cookies from "js-cookie";
import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:5000/api",
    headers: {
      "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get("refreshToken");
        if (!refreshToken) {
          Cookies.remove("token");
          Cookies.remove("refreshToken");
          Cookies.remove("role");
          window.location.href = "/my-secret-panel-15j30k";
          return Promise.reject(error);
        }
        const refreshResponse = await axios.post(
          "http://localhost:5000/api/auth/refresh-token",
          { refreshToken },
        );
        const newAccessToken = refreshResponse.data?.data?.token;
        const newRefreshToken = refreshResponse.data?.data?.refreshToken;
        if (!newAccessToken) {
          throw new Error("No new access token received");
        }
        Cookies.set("token", newAccessToken, { expires: 1 });
        if (newRefreshToken) {
          Cookies.set("refreshToken", newRefreshToken, { expires: 7 });
        }
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest);
      } catch (refreshError: any) {
        Cookies.remove("token");
        Cookies.remove("refreshToken");
        Cookies.remove("role");
        window.location.href = "/my-secret-panel-15j30k";
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  },
);

export default api;

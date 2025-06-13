import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;
const TIME_OUT = import.meta.env.VITE_API_TIMEOUT;

const api = axios.create({
  baseURL: API_URL,
  timeout: TIME_OUT,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await localStorage.getItem("authToken");
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    console.log("Error in request interceptor: ", error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("Error in response interceptor: ", error);

    if (error.response.status === 401) {
      localStorage.removeItem("authToken");
      window.location.href = "/login";
    }

    if (error.response) {
      return Promise.reject(error.response.data);
    } else if (error.request) {
      return Promise.reject({ message: "No response from server" });
    } else {
      return Promise.reject({ message: "Request configuration error" });
    }
  }
);

export default api;

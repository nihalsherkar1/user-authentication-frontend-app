import axios from "axios";

const myApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

myApi.interceptors.request.use((config) => {
  const rawRoot = sessionStorage.getItem("persist:root");

  try {
    if (rawRoot) {
      const root = JSON.parse(rawRoot);
      const login = root?.login;

      if (login) {
        const parsedLogin = JSON.parse(login);
        const token = parsedLogin?.token;

        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      }
    }
  } catch (err) {
    console.error("Error parsing persist:root", err);
  }

  return config; // ✅ always return config here
});

export default myApi;

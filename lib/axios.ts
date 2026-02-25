import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000", // Direct call to backend port
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;

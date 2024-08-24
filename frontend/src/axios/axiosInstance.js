import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://campus-food-delivery.onrender.com/api",
});

export default axiosInstance;

import axios from "axios";

const api = axios.create({
  baseURL: "https://take-home-test-api.nutech-integrasi.com",
});

export default api;

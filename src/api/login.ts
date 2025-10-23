import api from "./api";

export const loginUser = async (data: {
  email: string;
  password: string;
}) => {
  return api.post("/login", data);
};
import api from "./api";

export const registerUser = async (data: {
  email: string;
  first_name: string;
  last_name: string;
  password: string;
}) => {
  return api.post("/registration", data);
};
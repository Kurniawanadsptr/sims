import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { RootState } from "../redux/store";

export const AuthToken = () => {
  const reduxToken = useSelector((state: RootState) => state.auth.token);
  const cookieToken = Cookies.get("token");
  const token = reduxToken || cookieToken || "";

  return token;
};

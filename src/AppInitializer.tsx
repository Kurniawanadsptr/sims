import { useEffect } from "react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { login } from "./redux/slices/loginSlice";
const AppInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = Cookies.get("token") ?? "";
    if (token) {
      dispatch(login({ token }));
    }
  }, []);

  return null;
};

export default AppInitializer;

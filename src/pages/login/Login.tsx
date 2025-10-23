import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login, logout } from "../../redux/slices/loginSlice";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../api/login";
import { AlertError } from "../../utils/swal/swal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const LoginPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const tokenCookie = Cookies.get("token");

    if (tokenCookie && token && tokenCookie === token) {
      navigate("/dashboard");
    } else if (tokenCookie && !token) {
      dispatch(login({ token: tokenCookie }));
      navigate("/dashboard");
    } else if (token && !tokenCookie) {
      dispatch(logout());
      navigate("/");
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      AlertError("Masukkan Format Email Yang Benar");
      return;
    }
    if (password.length < 8) {
      AlertError("Password Minimal 8 Karakter");
      return;
    }
    try {
      const response = await loginUser({
        email,
        password,
      });

      const result = response.data;

      if (result.status !== 0) {
        AlertError(result.message || "Login gagal");
        return;
      }
      const token = response.data.data.token;
      Cookies.set("token", token, { expires: 1 });
      dispatch(login({ token }));
      navigate("/dashboard");
    } catch (error) {
      AlertError("Email Atau Password Anda Salah");
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen font-sans">
      <div className="flex-1 flex justify-center items-center px-6 md:px-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <img
                src="/assets/image/Logo.png"
                alt="logo"
                className="w-6 h-6"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-800">SIMS PPOB</h1>
          </div>
          <h2 className="text-2xl font-semibold text-center leading-snug mb-4">
            Masuk atau buat akun
            <br />
            <span className="text-2xl font-semibold">untuk memulai</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
              type="email"
              placeholder="Masukkan email anda"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              placeholder="Masukkan password anda"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="bg-red-600 text-white py-3 rounded hover:bg-red-700 transition"
            >
              Masuk
            </button>
            <p className="text-sm text-gray-600 text-center">
              Belum punya akun?{" "}
              <span
                className="text-red-600 cursor-pointer hover:underline"
                onClick={() => navigate("/Register")}
              >
                Registrasi di sini
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 bg-gray-100">
        <img
          src="./assets/image/Illustrasi Login.png"
          alt="Login"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default LoginPage;

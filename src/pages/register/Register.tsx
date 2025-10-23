import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../api/register";
import {
  AlertInfo,
  AlertError,
  CloseSwal,
  AlertLoading,
  AlertSuccess,
} from "../../utils/swal/swal";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const RegisterPage: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token);
  const navigate = useNavigate();
  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token, navigate]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const buttonEnabled =
    formData.firstName.trim() &&
    formData.lastName.trim() &&
    formData.email.trim() &&
    formData.password.trim();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;
    setIsSubmitting(true);

    const { firstName, lastName, email, password } = formData;

    if (!firstName || !lastName || !email || !password) {
      AlertInfo("Semua field wajib diisi");
      setIsSubmitting(false);
      return;
    }

    const emailFormat = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormat.test(email)) {
      AlertInfo("Format Email Tidak Valid");
      setIsSubmitting(false);
      return;
    }

    if (password.length < 8) {
      AlertInfo("Password minimal 8 karakter");
      setIsSubmitting(false);
      return;
    }

    AlertLoading("Mendaftarkan akun...");

    try {
      const response = await registerUser({
        email,
        first_name: firstName,
        last_name: lastName,
        password,
      });

      const result = response.data;

      CloseSwal();

      if (result.status !== 0) {
        AlertInfo(result.message || "Registrasi gagal");
        setIsSubmitting(false);
        return;
      }

      AlertSuccess("Registrasi berhasil! Silakan login.");
      navigate("/");
    } catch (error) {
      console.error("Register error:", error);
      CloseSwal();
      AlertError("Terjadi kesalahan saat registrasi");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex h-screen font-sans">
      <div className="w-1/2 flex flex-col justify-center items-center px-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <img
                src="/assets/image/logo.png"
                alt="logo"
                className="w-6 h-6"
              />
            </div>
            <h1 className="text-xl font-bold text-gray-800">SIMS PPOB</h1>
          </div>

          <h2 className="text-2xl font-semibold text-center leading-snug mb-4">
            Lengkapi data untuk <br />
            <span className="text-2xl font-semibold">membuat akun</span>
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full">
            <input
              type="text"
              name="firstName"
              placeholder="Nama depan"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="text"
              name="lastName"
              placeholder="Nama belakang"
              value={formData.lastName}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="email"
              name="email"
              placeholder="Masukkan email anda"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <input
              type="password"
              name="password"
              placeholder="Masukkan password anda"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              disabled={!buttonEnabled}
              className={`py-3 rounded transition ${
                buttonEnabled
                  ? "bg-red-600 text-white hover:bg-red-700"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              Registrasi
            </button>
            <p className="text-sm text-gray-600 text-center">
              Sudah punya akun?{" "}
              <span
                className="text-red-600 cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Masuk di sini
              </span>
            </p>
          </form>
        </div>
      </div>

      <div className="w-1/2 bg-gray-100">
        <img
          src="/assets/image/Illustrasi Login.png"
          alt="Register"
          className="object-cover w-full h-full"
        />
      </div>
    </div>
  );
};

export default RegisterPage;

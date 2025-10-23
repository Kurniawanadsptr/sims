import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { resetDashboard } from "../redux/slices/dashboard";
import { logout } from "../redux/slices/loginSlice";
const navItems = [
  { to: "/dashboard", label: "Home" },
  { to: "/topup", label: "Top Up" },
  { to: "/transaction", label: "Transaksi" },
  { to: "/profile", label: "Akun" },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetDashboard());
    localStorage.removeItem("services");
    localStorage.removeItem("servicesExpired");
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 bg-white shadow-md px-6 py-4 flex items-center justify-between z-50">
        <div className="flex items-center space-x-2 lg:px-20">
          <img src="/assets/image/Logo.png" alt="Logo" className="w-8 h-8" />
          <span className="text-lg font-semibold text-gray-800">SIMS PPOB</span>
        </div>
        <ul className="hidden md:flex space-x-6 text-sm font-medium lg:px-20">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-b-2 border-red-500 pb-1"
                    : "text-black hover:text-red-500"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={handleLogout}
              className="text-black hover:text-red-500 text-sm font-medium"
            >
              Logout
            </button>
          </li>
        </ul>
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </nav>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            className="text-gray-700"
            onClick={() => setIsOpen(false)}
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <ul className="flex flex-col space-y-4 p-6 text-sm font-medium">
          {navItems.map(({ to, label }) => (
            <li key={to}>
              <NavLink
                to={to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  isActive
                    ? "text-red-500 border-b-2 border-red-500 pb-1 block"
                    : "text-black hover:text-red-500 block"
                }
              >
                {label}
              </NavLink>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="text-black hover:text-red-500 block text-left w-full"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        />
      )}
    </>
  );
};

export default Navbar;

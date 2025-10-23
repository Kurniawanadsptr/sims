import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import Cookies from "js-cookie";

interface ProfileData {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?: string;
}

interface Saldo {
  balance: number;
}

export const DashboardHooks = (token: string) => {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [saldo, setSaldo] = useState<Saldo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetched = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    if (hasFetched.current) return;
    hasFetched.current = true;

    const fetchDashboard = async () => {
      try {
        const [profileRes, saldoRes] = await Promise.all([ 
          api.get("/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          api.get("/balance", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProfile(profileRes.data.data);
        setSaldo(saldoRes.data.data);
        setError(null);
      } catch (err: any) {
        console.error("Gagal mengambil data:", err);
        Cookies.remove("token");
        setError("Gagal mengambil data");
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [token, navigate]);

  return { profile, saldo, error, loading };
};

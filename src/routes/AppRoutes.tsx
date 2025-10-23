import { Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import RegisterPage from "../pages/register/Register";
import Dashboard from "../pages/dashboard/Dashboard";
import Layout from "../MasterLayout/Layout";
import Topup from "../pages/TopUp/Topup";
import ServicesPayment from "../pages/services/services";
import HistoryTransaction from "../pages/transaction/history";
import ProfileCard from "../pages/account/profile";

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/Register" element={<RegisterPage />} />
    <Route path="/Dashboard"
      element={
        <Layout>
          <Dashboard />
        </Layout>
      }
    />
    <Route path="/TopUp"
      element={
        <Layout>
          <Topup />
        </Layout>
      }
    />
    <Route path="/services/:slug"
      element={
        <Layout>
          <ServicesPayment />
        </Layout>
      }
    />
    <Route path="/transaction"
      element={
        <Layout>
          <HistoryTransaction />
        </Layout>
      }
    />
    <Route path="/profile"
      element={
          <ProfileCard />
      }
    />
  </Routes>
);

export default AppRoutes;

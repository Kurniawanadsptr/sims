import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setLoading,
  setProfile,
  setSaldo,
  setError,
} from "../redux/slices/dashboard";
import { selectDashboard } from "../redux/selectors";
import { AuthToken } from "../hooks/fetchToken";
import { DashboardHooks } from "../hooks/dashboard";
import Loading from "../utils/loading/loading";
import Navbar from "./Navbar";
import ProfileSection from "../pages/dashboard/ProfileSection";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useDispatch();
  const token = AuthToken();
  const { profile, saldo, error } = DashboardHooks(token);
  const dashboardState = useSelector(selectDashboard);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(setProfile(profile));
    dispatch(setSaldo(saldo));
    dispatch(setError(error));
    dispatch(setLoading(false));
  }, [profile, saldo, error, dispatch]);
  if (dashboardState.loading || !dashboardState.profile || dashboardState.saldo === null)
    return <Loading />;
  if (dashboardState.error)
    return <div className="text-red-500 p-4">Error: {dashboardState.error}</div>;

  return (
    <div className="layoutMaster min-h-screen">
      <Navbar />
      <ProfileSection
        profile={dashboardState.profile}
        saldo={dashboardState.saldo}
      />
      <main>{children}</main>
    </div>
  );
};

export default Layout;

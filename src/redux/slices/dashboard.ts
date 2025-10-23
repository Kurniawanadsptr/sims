import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Profile {
  first_name: string;
  last_name: string;
  email: string;
  profile_image?:string;
}

interface Saldo {
  balance: number;
}

interface DashboardState {
  profile: Profile | null;
  saldo: Saldo | null;
  loading: boolean;
  error: string | null;
}

const initialState: DashboardState = {
  profile: null,
  saldo: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    setProfile(state, action: PayloadAction<Profile | null>) {
      state.profile = action.payload;
    },
    setSaldo(state, action: PayloadAction<Saldo | null>) {
      state.saldo = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
    resetDashboard(state) {
      state.profile = null;
      state.saldo = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setProfile,
  setSaldo,
  setError,
  resetDashboard,
} = dashboardSlice.actions;

export default dashboardSlice.reducer;
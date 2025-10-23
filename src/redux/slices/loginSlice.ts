import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface LoginState {
  email: string;
  token: string;
  isLoggedIn: boolean;
}

const initialState: LoginState = {
  email: "",
  token: "",
  isLoggedIn: false,
};

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email?: string; token: string }>) {
      state.email = action.payload.email ?? "";
      state.token = action.payload.token;
      state.isLoggedIn = true;
    },
    logout(state) {
      state.email = "";
      state.token = "";
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = loginSlice.actions;
export default loginSlice.reducer;

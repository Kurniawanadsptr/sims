import { RootState } from "./store";

export const selectAuth = (state: RootState) => state.auth;
export const selectDashboard = (state: RootState) => state.dashboard;

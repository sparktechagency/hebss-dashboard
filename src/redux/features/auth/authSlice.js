import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  token: localStorage.getItem("token") || null,
  isAuthenticated: !!localStorage.getItem("token"),
  verificationEmail: localStorage.getItem("verificationEmail") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = true;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.verificationEmail = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      localStorage.removeItem("verificationEmail");
    },
    setVerificationEmail: (state, action) => {
      state.verificationEmail = action.payload;
      localStorage.setItem("verificationEmail", action.payload);
    },

    // ✅ NEW: update user info (e.g., after profile update)
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
      localStorage.setItem("user", JSON.stringify(state.user));
    },
  },
});

export const { setCredentials, logout, setVerificationEmail, updateUser } =
  authSlice.actions;

export default authSlice.reducer;

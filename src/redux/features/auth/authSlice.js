import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: null,
  isAuthenticated: false,
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
      localStorage.setItem("verificationEmail", action.payload); // ✅ store it
    },
  },
});

export const { setCredentials, logout, setVerificationEmail } = authSlice.actions;
export default authSlice.reducer;

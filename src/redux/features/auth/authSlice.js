import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: "",
  token: null,
  isAuthenticated: false,
  verificationEmail:null,
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
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("user"); 
      localStorage.removeItem("token"); 
    },
    setVerificationEmail: (state, action) => {
        state.verificationEmail = action.payload; 
      },
  },
});

export const { setCredentials, logout,setVerificationEmail } = authSlice.actions;
export default authSlice.reducer;

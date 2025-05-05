import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/login",
        method: "POST",
        body: data,
      }),
    }),
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/forget-password/send-otp",
        method: "POST",
        body: data,
      }),
    }),
    verifyOtp: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/verify-otp", 
        method: "POST",
        body: data,
      }),
    }),
    resetPassword: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/reset-password",  
        method: "POST",
        body: data, 
      }),
    }),
    changePassword: builder.mutation({
      query: (data) => ({
        url: "/admin/auth/change-password",  
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation,useForgotPasswordMutation,useVerifyOtpMutation ,useGetAllAdminsQuery,useUpdateAdminMutation,useResetPasswordMutation,useChangePasswordMutation } = authApi;
export default authApi;


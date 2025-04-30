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
        url: "admin/auth/forget-password/send-otp",
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
    changePassword: builder.mutation({
      query: ({email,password}) => ({
        url: "/admin/auth/change-password",
        method: "POST",
        body:{email,password}
      }),
    }),
    //  New create admin endpoint
     createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/create", 
        method: "POST",
        body: data,
      }),
    }),
    // getAllAdmins: builder.query({
    //   query: () => '/admin/retrieve/all',
    // }),
      // New get all admins endpoint
      getAllAdmins: builder.query({
        query: () => ({
          url: "/admin/retrieve/all", 
          method: "GET",
        }),
      }),
  }),
});

export const { useLoginMutation,useForgotPasswordMutation,useVerifyOtpMutation,useCreateAdminMutation, useChangePasswordMutation ,useGetAllAdminsQuery,useUpdateAdminMutation } = authApi;
export default authApi;


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
    
  }),
});

export const { useLoginMutation,useForgotPasswordMutation } = authApi;
export default authApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "/user/retrive/all",
    }),
    getSingleUser: builder.query({
      query: (_id) => `user/retrive/${_id}`,
    }),
    updateUserById: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/user/update/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    sendMailindivisual: builder.mutation({
      query: ({ userId, email, subject, text }) => ({
        url: `/user/send-email/indivisual/${userId}`,
        method: "POST",
        body: { email, subject, text },
      }),
    }),
    sendMailAllUsers:builder.mutation({
      query:({subject,text,email})=>({
        url:'/user/send-email/bulk',
        method:'POST',
        body:{email,subject,text}
      })
    })
  }),
});

export const {
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserByIdMutation,
  useSendMailindivisualMutation,
  useSendMailAllUsersMutation,
} = userApi;

export default userApi;

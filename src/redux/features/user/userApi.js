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
    getSingleUser:builder.query({
      query:(_id)=> `user/retrive/${_id}`
    }),
    updateUserById:builder.mutation({
      query:({_id,...data})=>({
        url:`/user/update/${_id}`,
        method:"PATCH",
        body:data,
      })
    })
  }),
});

export const { useGetAllUserQuery,useGetSingleUserQuery,useUpdateUserByIdMutation } = userApi;

export default userApi;

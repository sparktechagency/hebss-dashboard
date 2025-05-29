import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Admins"],
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
    getAllAdmins: builder.query({
      query: () => ({
        url: "/admin/retrive/all",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admins"],
    }),
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Admins"],
    }),
  }),
});

export const {
  useCreateAdminMutation,
  useGetAllAdminsQuery,
  useDeleteAdminMutation,
  useUpdateAdminMutation,
} = adminApi;

export default adminApi;

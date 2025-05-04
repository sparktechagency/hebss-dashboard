import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const adminApi = createApi({
  reducerPath: "adminApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
  }),
  endpoints: (builder) => ({
    createAdmin: builder.mutation({
      query: (data) => ({
        url: "/admin/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllAdmins: builder.query({
      query: () => ({
        url: "/admin/retrive/all",
        method: "GET",
      }),
    }),
    // Delete admin by ID
    deleteAdmin: builder.mutation({
      query: (id) => ({
        url: `/admin/delete/${id}`,
        method: "DELETE",
      }),
    }),
    // Edit admin
    updateAdmin: builder.mutation({
      query: ({ id, data }) => ({
        url: `/admin/update/${id}`, 
        method: "PATCH",
        body: data, 
      }),
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

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "/user/retrive/all",
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;

export default userApi;

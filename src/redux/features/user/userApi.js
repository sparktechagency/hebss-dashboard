import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
  }),
  endpoints: (builder) => ({
    getAllUser: builder.query({
      query: () => "/user/retrive/all",
    }),
  }),
});

export const { useGetAllUserQuery } = userApi;

export default userApi;

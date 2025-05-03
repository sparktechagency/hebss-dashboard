import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
  }),
  endpoints: (builder) => ({
    createOrUpdateAboutUs: builder.mutation({
      query: (data) => ({
        url: "/about-us/create-or-update", 
        method: "POST",  
        body: data,  
      }),
    }),
  }),
});

export const { useCreateOrUpdateAboutUsMutation } = aboutApi;
export default aboutApi;

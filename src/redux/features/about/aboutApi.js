import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const aboutApi = createApi({
  reducerPath: "aboutApi",
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
    createOrUpdateAboutUs: builder.mutation({
      query: (data) => ({
        url: "/about-us/create-or-update",
        method: "POST",
        body: data,
      }),
    }),
    getAboutUs:builder.query({
      query:()=> "/about-us/retrive"
    }),
    createOrUpdatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy-policy/create-or-update",
        method: "POST",
        body: data,
      }),
    }),
    getPrivacyPolicy: builder.query({
      query: () => "/privacy-policy/retrive",
       transformResponse: (response) => {
        return response;
      },
    }),
    createOrUpdateTrems: builder.mutation({
      query: (data) => ({
        url: "/terms-condition/create-or-update",
        method: "POST",
        body: data,
      }),
       invalidatesTags: ["Terms"],
    }),
     getTerms: builder.query({
      query: () => "/terms-condition/retrive",
       providesTags: ["Terms"],
    }),
  
  }),
});

export const {
  useCreateOrUpdateAboutUsMutation,
  useCreateOrUpdatePrivacyPolicyMutation,
  useCreateOrUpdateTremsMutation,
  useGetPrivacyPolicyQuery, 
  useGetAboutUsQuery,
  useGetTermsQuery
} = aboutApi;

export default aboutApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const aboutApi = createApi({
  reducerPath: "aboutApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
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
    createOrUpdatePrivacyPolicy: builder.mutation({
      query: (data) => ({
        url: "/privacy-policy/create-or-update",  
        method: "POST",  
        body: data, 
      }),
    }),
    createOrUpdateTrems:builder.mutation({
      query:(data)=>({
        url:"/terms-condition/create-or-update",
        method:"POST",
        body:data,
      })
    })
  }),
});

export const { useCreateOrUpdateAboutUsMutation,useCreateOrUpdatePrivacyPolicyMutation,useCreateOrUpdateTremsMutation } = aboutApi;
export default aboutApi;

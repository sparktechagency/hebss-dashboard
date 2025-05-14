import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const faqApi = createApi({
  reducerPath: "faqApi",
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
    createFaq: builder.mutation({
      query: (data) => ({
        url: "/faq/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllFaq: builder.query({
      query: () => "/faq/retrieve",
    }),
    editFaq: builder.mutation({
      query: ({ _id, ...data }) => ({
        url: `/faq/update/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    deleteFaq:builder.mutation({
        query:(_id)=>({
            url:`/faq/delete/${_id}`,
            method:"DELETE",
           
        })
    })
  }),
});

export const { useCreateFaqMutation, useGetAllFaqQuery, useEditFaqMutation,useDeleteFaqMutation } =
  faqApi;

export default faqApi;

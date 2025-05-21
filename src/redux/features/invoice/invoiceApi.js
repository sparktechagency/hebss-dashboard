import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const invoiceApi = createApi({
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
    createInvoice: builder.mutation({
      query: (data) => ({
        url: "/invoice/create",
        method: "POST",
        body: data,
      }),
    }),
    getInvoiceHistoryById: builder.query({
      query: (id) => `/invoice/retrieve/history/user/${id}`,
    }),
    getCurrentInvoiceByUserId: builder.query({
      query: (userId) => `/box/retrieve/${userId}`,
    }),
    updateInvoiceByInvoiceId: builder.mutation({
      query: ({ invoiceId, data }) => ({
        url: `/invoice/update/${invoiceId}`,
        method: "PATCH",
        body: data,
      }),
    }),

  }),
});

export const {
  useCreateInvoiceMutation,
  useGetInvoiceHistoryByIdQuery,
  useGetCurrentInvoiceByUserIdQuery,
  useUpdateInvoiceByInvoiceIdMutation,
 
} = invoiceApi;

export default invoiceApi;

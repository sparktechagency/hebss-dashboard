import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
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
    // Create Subscription - POST
    createSubscription: builder.mutation({
      query: (data) => ({
        url: "/subscription/create",
        method: "POST",
        body: data,
      }),
    }),

    // Get All Subscriptions - GET
    getAllSubscription: builder.query({
      query: () => ({
        url: "/subscription/retrieve",
        method: "GET",
      }),
    }),

    // Edit Subscription - PATCH
    editSubscription: builder.mutation({
      query: ({ _id, data }) => ({
        url: `/subscription/update/${_id}`,
        method: "PATCH",
        body: data,
      }),
    }),

    deleteSubscription: builder.mutation({
      query: (_id) => ({
        url: `/subscription/delete/${_id}`,
        method: "DELETE",
      }),
    }),

     getSubscriptionByUserId: builder.query({
      query: (userId) => `/subscription-purchase/retrieve/user/${userId}`, // ✅ correct!
    }),





  }),
});

// Export hooks for each endpoint
export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionQuery,
  useDeleteSubscriptionMutation,
  useEditSubscriptionMutation,
  useGetSubscriptionByUserIdQuery
} = subscriptionApi;

export default subscriptionApi;

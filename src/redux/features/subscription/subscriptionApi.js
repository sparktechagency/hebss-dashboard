import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const subscriptionApi = createApi({
  reducerPath: "subscriptionApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    // baseUrl:"http://10.0.60.55:5003/v1",
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
      query: (userId) => `/subscription-purchase/retrieve/user/${userId}`, 
    }),
     cancelSubscription: builder.mutation({
      query: ({id,data}) => ({
        url: `/subscription-purchase/cancel/subscription-purchase/${id}`,
        method: "PATCH", 
        body:data,
      }),
    }),
  }),
});

// Export hooks for each endpoint
export const {
  useCreateSubscriptionMutation,
  useGetAllSubscriptionQuery,
  useDeleteSubscriptionMutation,
  useEditSubscriptionMutation,
  useGetSubscriptionByUserIdQuery,
  useCancelSubscriptionMutation,
} = subscriptionApi;

export default subscriptionApi;

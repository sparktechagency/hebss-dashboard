import TAGS from "../../../utils/tags.types";
import { baseApi } from "../../api/baseApi";

const SubscriptionApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubscription: builder.query({
            query: (params) => ({
                url: `/subscription/retrive/search`,
                method: "GET",
                params
            }),
            providesTags: [TAGS.SUBSCRIPTION]
        }),
        createSubscription: builder.mutation({
            query: (data) => ({
                url: "/subscription/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.SUBSCRIPTION]
        }),
        updateSubscription: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/subscription/update/${_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [TAGS.SUBSCRIPTION]
        }),
        deleteSubscription: builder.mutation({
            query: (_id) => ({
                url: `/subscription/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TAGS.SUBSCRIPTION]
        }),
        getSpecificSubscription: builder.query({
            query: (_id) => ({
                url: `/subscription/retrive/${_id}`,
                method: "GET",
            }),
            providesTags: [TAGS.SUBSCRIPTION]
        }),

        // Message - Cost:
        getMessageCost: builder.query({
            query: () => ({
                url: "/messageCost/retrive",
                method: "GET"
            }),
            providesTags: [TAGS.MESSAGECOST]

        }),
        createMessageCost: builder.mutation({
            query: (data) => ({
                url: "/messageCost/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.MESSAGECOST]
        }),
        updateMessageCost: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/messageCost/update/${_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [TAGS.MESSAGECOST]
        }),
        deleteMessageCost: builder.mutation({
            query: (_id) => ({
                url: `/messageCost/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TAGS.MESSAGECOST]
        }),
    })
})


export const {
    useGetSubscriptionQuery,
    useCreateSubscriptionMutation,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation,
    useGetSpecificSubscriptionQuery,
    useGetMessageCostQuery,
    useCreateMessageCostMutation,
    useUpdateMessageCostMutation,
    useDeleteMessageCostMutation
} = SubscriptionApi;
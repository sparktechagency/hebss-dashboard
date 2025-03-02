import TAGS from "../../../utils/tags.types";
import { baseApi } from "../../api/baseApi";

const SettingsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAndUpdateAboutUs: builder.mutation({
            query: (data) => ({
                url: '/about-us/create-or-update',
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.ABOUT_US]

        }),
        getAboutUs: builder.query({
            query: () => ({
                url: '/about-us/retrive',
                method: "GET",
            }),
            providesTags: [TAGS.ABOUT_US]
        }),
        createPrivacyPolicy: builder.mutation({
            query: (data) => ({
                url: '/privacy-policy/create-or-update',
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.PRIVACY_POLICY]
        }),
        getPrivacyPolicy: builder.query({
            query: () => ({
                url: '/privacy-policy/retrive',
                method: "GET"
            }),
            providesTags: [TAGS.PRIVACY_POLICY]
        }),
        createTermsAndConditions: builder.mutation({
            query: (data) => ({
                url: '/terms-condition/create-or-update',
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.TERMS_CONDITION]
        }),
        getTermsAndConditions: builder.query({
            query: () => ({
                url: '/terms-condition/retrive',
                method: "GET"
            }),
            providesTags: [TAGS.TERMS_CONDITION]
        }),


        // slider:
        getAllSliders: builder.query({
            query: () => ({
                url: '/slider/retrive/all',
                method: "GET"
            }),
            providesTags: [TAGS.BANNER]
        }),
        createSlider: builder.mutation({
            query: (data) => ({
                url: "/slider/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.BANNER]
        }),
        deleteSlider: builder.mutation({
            query: (_id) => ({
                url: `/slider/delete/${_id}`,
                method: "DELETE",
            }),
            invalidatesTags: [TAGS.BANNER]
        }),
        updateSlider: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/slider/update/${_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [TAGS.BANNER]
        }),
        // contact us:

        createContactUs: builder.mutation({
            query: (data) => ({
                url: '/contact-us/create-or-update',
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.CONTACT_US]
        }),

        getAllContacts: builder.query({
            query: () => ({
                url: '/contact-us/retrive',
                method: "GET"
            }),
            providesTags: [TAGS.CONTACT_US]
        }),





    })
});

export const {
    useCreateAndUpdateAboutUsMutation,
    useGetAboutUsQuery,
    useCreatePrivacyPolicyMutation,
    useGetPrivacyPolicyQuery,
    useCreateTermsAndConditionsMutation,
    useGetTermsAndConditionsQuery,

    useGetAllSlidersQuery,
    useCreateSliderMutation,
    useDeleteSliderMutation,
    useUpdateSliderMutation,
    useCreateContactUsMutation,
    useGetAllContactsQuery
} = SettingsApi;
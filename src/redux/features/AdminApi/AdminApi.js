import TAGS from "../../../utils/tags.types";
import { baseApi } from "../../api/baseApi";

const AdminApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createAdmin: builder.mutation({
            query: (data) => ({
                url: "/admin/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.ADMIN]
        }),
        getAdmin: builder.query({
            query: () => ({
                url: "/admin/retrive/all",
                method: "GET"
            }),
            providesTags: [TAGS.ADMIN]
        }),
        deleteAdmin: builder.mutation({
            query: (_id) => ({
                url: `/admin/delete/${_id}`,
                method: "DELETE",


            }),
            invalidatesTags: [TAGS.ADMIN]
        }),
        // Admin profile Api:
        getAdminProfile: builder.query({
            query: (_id) => ({
                url: `/admin/retrive/${_id}`,
                method: "GET",
            }),
            providesTags: [TAGS.ADMIN]
        }),
        changePassword: builder.mutation({
            query: (data) => ({
                url: "/admin/auth/change-password",
                method: "POST",
                body: data
            })
        }),
        updateAdmin: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/admin/update/${_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [TAGS.ADMIN]
        }),


    })
})
export const {
    useCreateAdminMutation,
    useGetAdminQuery,
    useDeleteAdminMutation,
    useGetAdminProfileQuery,
    useChangePasswordMutation,
    useUpdateAdminMutation
} = AdminApi
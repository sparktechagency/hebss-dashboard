import TAGS from "../../../utils/tags.types";
import { baseApi } from "../../api/baseApi";

const CategoryApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllCategory: builder.query({
            // query: ({ query, page, limit }) => ({
            //     url: `/category/retrive/search?${query}&page=${page}&limit=${limit}`,
            //     method: "GET",
            // }),
            query: () => ({
                url: `/speciality/retrive/search?`,
                method: "GET",
            }),
            providesTags: [TAGS.CATEGORY],
        }),
        createCategory: builder.mutation({
            query: (data) => ({
                url: `/speciality/create`,
                method: "POST",
                body: data
            }),
            invalidatesTags: [TAGS.CATEGORY]
        }),
        deleteCategory: builder.mutation({
            query: (_id) => ({
                url: `/speciality/delete/${_id}`,
                method: "DELETE"
            }),
            invalidatesTags: [TAGS.CATEGORY]
        }),
        updateCategory: builder.mutation({
            query: ({ _id, data }) => ({
                url: `/speciality/update/${_id}`,
                method: "PATCH",
                body: data
            }),
            invalidatesTags: [TAGS.CATEGORY]
        })
    })
});

export const {
    useGetAllCategoryQuery,
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useUpdateCategoryMutation
} = CategoryApi;
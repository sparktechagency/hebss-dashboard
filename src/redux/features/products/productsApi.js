import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
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
  tagTypes: ["Books", "Categories", "Grades", "Collections"],
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/book/retrieve",
      providesTags: ["Books"],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/book/create",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ["Books"],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `/book/update/${bookId}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ["Books"],
    }),
    // Add deleteBook mutation
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/delete/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Books"],
    }),
    getAllCategory: builder.query({
      query: () => "/category/retrieve",
      providesTags: ["Categories"], // add this
    }),
    getAllGrade: builder.query({
      query: () => "/grade/retrieve",
      providesTags: ["Grades"], // add this
    }),
    getAllCollection: builder.query({
      query: () => "/collection/retrieve",
      providesTags: ["Collections"], // add this
    }),
  }),
});

export const {
  useGetAllBooksQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useDeleteBookMutation,
  useGetAllCategoryQuery,
  useGetAllCollectionQuery,
  useGetAllGradeQuery,
} = productsApi;

export default productsApi;

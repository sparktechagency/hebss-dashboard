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
  endpoints: (builder) => ({
    getAllBooks: builder.query({
      query: () => "/book/retrieve",
      providesTags: ['Books'], // Tag the 'Books' for invalidation
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/book/create",
        method: "POST",
        body: newBook,
      }),
      // Invalidate the Books cache after creating a new book
      invalidatesTags: ['Books'], // This will invalidate the cache for Books
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `/book/update/${bookId}`,
        method: "PATCH",
        body: updatedBook,
      }),
      // Invalidate the Books cache after updating a book
      invalidatesTags: ['Books'], // This will invalidate the cache for Books
    }),
  }),
});

export const { useGetAllBooksQuery, useCreateBookMutation, useUpdateBookMutation } = productsApi;

export default productsApi;

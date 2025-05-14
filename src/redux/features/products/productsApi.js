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
      providesTags: ['Books'],
    }),
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/book/create",
        method: "POST",
        body: newBook,
      }),
      invalidatesTags: ['Books'],
    }),
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `/book/update/${bookId}`,
        method: "PATCH",
        body: updatedBook,
      }),
      invalidatesTags: ['Books'],
    }),
    // Add deleteBook mutation
    deleteBook: builder.mutation({
      query: (bookId) => ({
        url: `/book/delete/${bookId}`,
        method: "DELETE",
      }),
      invalidatesTags: ['Books'],
    }),
  }),
});

export const { 
  useGetAllBooksQuery, 
  useCreateBookMutation, 
  useUpdateBookMutation, 
  useDeleteBookMutation 
} = productsApi;

export default productsApi;

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const productsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.60.55:5003/v1",
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
    }),
      // Mutation to create a new book
    createBook: builder.mutation({
      query: (newBook) => ({
        url: "/book/create",
        method: "POST",
        body: newBook,
      }),
    }),

    // Mutation to update an existing book
    updateBook: builder.mutation({
      query: ({ bookId, updatedBook }) => ({
        url: `/book/update/${bookId}`,
        method: "PATCH",
        body: updatedBook,
      }),
    }),
  }),
});

export const { useGetAllBooksQuery,useCreateBookMutation,useUpdateBookMutation } = productsApi;

export default productsApi;

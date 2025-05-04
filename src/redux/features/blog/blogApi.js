import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define the blogApi using Redux Toolkit Query
const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `http://10.0.60.55:5003/v1`,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
      }),
    }),
    // New endpoint to fetch all blogs
    getAllBlogs: builder.query({
      query: () => "/blog/retrieve/all",
    }),
    // Edit an existing blog
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/update/${id}`, 
        method: "PATCH",
        body: data,
      }),
    }),

    // Delete a blog
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`, 
        method: "DELETE",
      }),
    }),
  }),
});

export const { useCreateBlogMutation, useGetAllBlogsQuery,useDeleteBlogMutation,useEditBlogMutation } = blogApi;

export default blogApi;

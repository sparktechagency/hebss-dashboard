import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogApi",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("token");
      if (token) headers.set("Authorization", `Bearer ${token}`);
      return headers;
    },
  }),
  tagTypes: ["Blogs"], // <-- Declare tags here
  endpoints: (builder) => ({
    createBlog: builder.mutation({
      query: (data) => ({
        url: "/blog/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blogs"],  // <-- Invalidate blogs cache after create
    }),
    getAllBlogs: builder.query({
      query: () => "/blog/retrieve/all",
      providesTags: ["Blogs"],     // <-- Provide blogs cache tag
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blog/update/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Blogs"],  // <-- Invalidate blogs cache after update
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],  // <-- Invalidate blogs cache after delete
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useGetAllBlogsQuery,
  useDeleteBlogMutation,
  useEditBlogMutation,
} = blogApi;

export default blogApi;

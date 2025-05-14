import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const reviewsApi = createApi({
  reducerPath: "reviewsApi",
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
    getAllReviews: builder.query({
      query: () => "/review/retrieve/all",
    }),
  }),
});

export const { useGetAllReviewsQuery } = reviewsApi;

export default reviewsApi;

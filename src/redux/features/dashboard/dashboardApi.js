import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl:import.meta.env.VITE_BACKEND_URL,
  }),
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query({
      query: () => "dashboard-matrix/retrieve",
      transformResponse: (response) => response.data, 
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = dashboardApi;

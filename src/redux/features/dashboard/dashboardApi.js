import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dashboardApi = createApi({
  reducerPath: "dashboardApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://10.0.60.55:5003/v1/",
  }),
  endpoints: (builder) => ({
    getDashboardMetrics: builder.query({
      query: () => "dashboard-matrix/retrieve",
      transformResponse: (response) => response.data, 
    }),
  }),
});

export const { useGetDashboardMetricsQuery } = dashboardApi;

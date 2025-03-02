import { baseApi } from "../../api/baseApi";

const DashboardApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashboard: builder.query({
            query: () => ({
                url: "/dashboard/metrixs/retrive",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetDashboardQuery
} = DashboardApi;   
/* eslint-disable no-unused-vars */
import { baseApi } from "../../api/baseApi";

const AppointmentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAppointment: builder.query({
            query: () => ({
                url: "/appointment/retrive/all/sss",
                // url: "/appointment/retrive/all/sss?page=1&limit=8&searchQuery=6799edf1511f3d038a2e0d8d",
                method: "GET",
            }),
        }),
    }),
});

export const {
    useGetAppointmentQuery
} = AppointmentApi
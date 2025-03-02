import { baseApi } from "../../api/baseApi";

const UsersApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPatients: builder.query({
            query: () => ({
                url: "/user/retrive/all?role=patient",
                method: "GET",
            }),
        }),
        getAllDoctors: builder.query({
            query: () => ({
                url: "/user/retrive/all?role=therapist",
                method: "GET",
            }),
        }),

    })
});

export const {
    useGetAllPatientsQuery,
    useGetAllDoctorsQuery,
} = UsersApi;
import { baseApi } from "../../api/baseApi";

const PaymentApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllPayment: builder.query({
            query: () => ({
                url: "/payment-history/retrive/all",
                method: "GET"
            })
        })
    })
});

export const {
    useGetAllPaymentQuery
} = PaymentApi;
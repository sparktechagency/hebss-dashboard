import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const invoiceApi = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BACKEND_URL,
    }),
    endpoints:(builder)=>({
        createInvoice:builder.mutation({
            query:(data)=>({
                url:"/invoice/create",
                method:"POST",
                body:data,
            })
        })
    })
})

export const {useCreateInvoiceMutation} = invoiceApi

export default invoiceApi
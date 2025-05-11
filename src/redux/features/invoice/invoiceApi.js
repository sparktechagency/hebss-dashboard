import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const invoiceApi = createApi({
    baseQuery:fetchBaseQuery({
        baseUrl:"http://10.0.60.55:5003/v1"
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
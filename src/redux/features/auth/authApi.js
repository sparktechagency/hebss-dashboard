import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const  authApi = createApi({
    reducerPath:"authApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`http://10.0.60.55:5003/v1`,
        credentials:"include" 
    }),
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:"/admin/auth/login",
                method:"POST",
                body:data
            }),
            credentials:"include"
        })
    })
})

export const {useLoginMutation} = authApi
export default authApi

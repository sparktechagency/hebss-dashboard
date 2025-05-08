import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const contactApi = createApi({
    reducerPath:"contactApi",
    baseQuery:fetchBaseQuery({
        baseUrl:`http://10.0.60.55:5003/v1`,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem("token"); 
        
            if (token) {
              headers.set("Authorization", `Bearer ${token}`);
            }
        
            return headers;
          },
    }),
    endpoints:(builder)=>({
        createContact:builder.mutation({
            query:(data)=>({
                url:"/contact-us/create-or-update",
                method:"POST",
                body:data,
            })
        })

    })
})

export const {useCreateContactMutation} = contactApi

export default contactApi
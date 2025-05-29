import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


const contactApi = createApi({
    reducerPath:"contactApi",
    baseQuery:fetchBaseQuery({
        baseUrl:import.meta.env.VITE_BACKEND_URL,
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
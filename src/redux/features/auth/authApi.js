import { baseApi } from "../../api/baseApi";

const AuthAPi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userInfo) => ({
                url: "/admin/auth/login",
                method: "POST",
                body: userInfo
            })
        }),
        forgatePassword: builder.mutation({
            query: (email) => ({
                url: "/admin/auth/forget-password/send-otp",
                method: "POST",
                body: email
            })
        }),
        verifyOtp: builder.mutation({
            query: (data) => ({
                url: '/admin/auth/verify-otp',
                method: "POST",
                body: data
            })
        }),
        resetPassword: builder.mutation({
            query: (data) => ({
                url: '/admin/auth/reset-password',
                method: "POST",
                body: data
            })
        })
    })
});
export const {
    useLoginMutation,
    useForgatePasswordMutation,
    useVerifyOtpMutation,
    useResetPasswordMutation
} = AuthAPi;
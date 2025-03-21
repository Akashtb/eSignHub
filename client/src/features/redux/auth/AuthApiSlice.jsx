import { apiSlice } from "../../../api/ApiSlice"

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: credentials => ({
                url: '/auth/login',
                method: 'POST',
                body: { ...credentials }
            })
        }),
        logOut: builder.mutation({
            query: () => ({
                url: '/auth/logOut',
                method: 'POST',
            })
        }),
    })
})

export const {
    useLoginMutation,
    useLogOutMutation
} = authApiSlice
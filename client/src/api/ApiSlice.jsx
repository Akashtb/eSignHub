import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { logOut, setCredentials } from '../features/redux/auth/AuthSlice'

const baseQuery = fetchBaseQuery({
    baseUrl: 'http://localhost:3007',
    credentials: 'include',
    prepareHeaders: (headers, { getState }) => {
        const token = getState().auth.token
        if (token) {
            headers.set("authorization", `Bearer ${token}`)
        }
        return headers
    }
})

const baseQueryWithReauth = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions)
    console.log(result);
    

    if (result?.error?.status === 403) {
        console.log('sending refresh token')
        const refreshResult = await baseQuery({
            url: '/auth/refreshToken',
            method: 'POST', 
        }, api, extraOptions);

        console.log(refreshResult)
        if (refreshResult?.data) {
            const user = api.getState().auth.user
            api.dispatch(setCredentials({ accessToken: refreshResult.data.accessToken, role:refreshResult.data.role,user:refreshResult.data.user }));
            result = await baseQuery(args, api, extraOptions)
        } else {
            api.dispatch(logOut())
        }
    }

    return result
}

export const apiSlice = createApi({
    baseQuery: baseQueryWithReauth,
    endpoints: builder => ({})
})
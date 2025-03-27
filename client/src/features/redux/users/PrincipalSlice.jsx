import { apiSlice } from "../../../api/ApiSlice";

export const StudentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
 
        getPrincipalById: builder.query({
            query: (id) => `/principal/view/${id}`,
        }),
        updatePrincipalDetail: builder.mutation({
            query: ({ id, studentData }) => ({
                url: `/principal/update/${id}`,
                method: 'PATCH',
                body: studentData,
            }),
            invalidatesTags: [{ type: 'Principal' }],
        }),
    }),
})

export const {
useGetPrincipalByIdQuery,
useUpdatePrincipalDetailMutation
} = StudentApiSlice;

import { apiSlice } from "../../../api/ApiSlice";

export const PrincipalApiSlice = apiSlice.injectEndpoints({
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
        totalEachUser:builder.query({
            query: () => `/principal/totalEachUser`,
        }),
        eachDepartmentTotalStudent:builder.query({
            query: () => `/principal/departmentWise`,
        })
    }),
})

export const {
useGetPrincipalByIdQuery,
useUpdatePrincipalDetailMutation,
useTotalEachUserQuery,
useEachDepartmentTotalStudentQuery
} = PrincipalApiSlice;

import { apiSlice } from "../../../api/ApiSlice";

export const HODApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllHOD: builder.query({
            query: () => '/hod/viewAll', 
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        getHODById: builder.query({
            query: (id) => `/hod/view/${id}`,
        }),
        updateHODDetail: builder.mutation({ 
            query: ({ id, HODData }) => ({
                url: `/hod/update/${id}`,
                method: 'PATCH',
                body: HODData,
            }),
        }),
        deleteHOD: builder.mutation({
            query: (id) => ({
                url: `/hod/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        createHOD: builder.mutation({
            query: (finalData) => ({
                url: '/hod/create',
                method: 'POST',
                body: finalData,
            }),
            invalidatesTags: [{ type: 'HOD' }],
        }),
    }),
})

export const {
   useGetAllHODQuery,
   useGetHODByIdQuery,
   useUpdateHODDetailMutation,
   useDeleteHODMutation,  
   useCreateHODMutation
} = HODApiSlice;

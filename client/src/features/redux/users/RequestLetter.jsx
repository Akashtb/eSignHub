import { apiSlice } from "../../../api/ApiSlice";

export const requestLetterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRequestLetter: builder.query({
            query: () => '/requestLetter/viewAll', 
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        getRequestLetterById: builder.query({
            query: (id) => `/requestLetter/view/${id}`,
        }),
        deleteRequestLetter: builder.mutation({
            query: (id) => ({
                url: `/requestLetter/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        createRequestLetter: builder.mutation({
            query: (HODData) => ({
                url: '/requestLetter/createStudent',
                method: 'POST',
                body: HODData,
            }),
            invalidatesTags: [{ type: 'RequestLetter' }],
        }),
    }),
})

export const {
useGetAllRequestLetterQuery,
useGetRequestLetterByIdQuery,
useDeleteRequestLetterMutation,
useCreateRequestLetterMutation,
} = requestLetterApiSlice;

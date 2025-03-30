import { apiSlice } from "../../../api/ApiSlice";

export const requestLetterApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllRequestLetter: builder.query({
            query: () => '/requestLetter/viewAll', 
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        recipientList: builder.query({
            query: () => '/requestLetter/recipientList', // ✅ Removed `method: 'GET'`
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        getRequestLetterById: builder.query({
            query: (id) => `/requestLetter/view/${id}`,
        }),
        approveRequestLetter: builder.mutation({ 
            query: (id) => ({
                url: `/requestLetter/approveRequestLetter/${id}`,
                method: 'PATCH',
            }),
        }),
        rejectRequestLetter: builder.mutation({ 
            query: (id) => ({
                url: `/requestLetter/rejectRequestLetter/${id}`,
                method: 'PATCH',
            }),
        }),
        deleteRequestLetter: builder.mutation({
            query: (id) => ({
                url: `/requestLetter/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        markRequestLetterAsSeen: builder.mutation({
            query: (id) => ({
                url: `/requestLetter/markRequestLetterAsSeen/${id}`,
                method: 'PATCH',
            }),
        }), 
        createRequestLetter: builder.mutation({
            query: ({ subject, messageBody, toUids }) => ({
                url: '/requestLetter/create',
                method: 'POST',
                body: { subject, messageBody, toUids },
            }),
            invalidatesTags: [{ type: 'RequestLetter' }],
        }),
    }),
});

export const {
    useGetAllRequestLetterQuery,
    useGetRequestLetterByIdQuery,
    useDeleteRequestLetterMutation,
    useCreateRequestLetterMutation,
    useApproveRequestLetterMutation,
    useRejectRequestLetterMutation,
    useRecipientListQuery,
    useMarkRequestLetterAsSeenMutation, 
} = requestLetterApiSlice;

import { apiSlice } from "../../../api/ApiSlice";

export const StudentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTutor: builder.query({
            query: () => '/tutor/viewAll',
            keepUnusedDataFor: 0,
            refetchOnMountOrArgChange: true,
        }),
        getTutorById: builder.query({
            query: (id) => `/tutor/view/${id}`,
        }),
        updateTutorDetail: builder.mutation({
            query: ({ id, tutorData }) => ({
                url: `/tutor/update/${id}`,
                method: 'PATCH',
                body: tutorData,
            }),
        }),
        deleteTutor: builder.mutation({
            query: (id) => ({
                url: `/tutor/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        createTutor: builder.mutation({
            query: (tutorData) => ({
                url: '/tutor/create',
                method: 'POST',
                body: tutorData,
            }),
            invalidatesTags: [{ type: 'Tutor' }],
        }),
    }),
})

export const {
    useGetAllTutorQuery,
    useGetTutorByIdQuery,
    useUpdateTutorDetailMutation,
    useDeleteTutorMutation,
    useCreateTutorMutation,
} = StudentApiSlice;

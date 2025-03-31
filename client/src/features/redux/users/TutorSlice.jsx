import { apiSlice } from "../../../api/ApiSlice";

export const TutorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllTutors: builder.query({  
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
            })
        }),
        deleteTutor: builder.mutation({
            query: (id) => ({
                url: `/tutor/delete/${id}`,
                method: 'DELETE',
            })  
        }),
        createTutor: builder.mutation({
            query: (finalData) => ({
                url: '/tutor/create',
                method: 'POST',
                body: finalData,
            }),
            invalidatesTags: [{ type: 'Tutor' }],
        }),
    }),
});

export const {
    useGetAllTutorsQuery,  
    useGetTutorByIdQuery,
    useUpdateTutorDetailMutation,
    useDeleteTutorMutation,
    useCreateTutorMutation,
} = TutorApiSlice;  
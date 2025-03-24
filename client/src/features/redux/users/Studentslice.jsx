import { apiSlice } from "../../../api/ApiSlice";

export const StudentApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getAllStudents: builder.query({
            query: () => '/student/viewAll', 
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        getStudentById: builder.query({
            query: (id) => `/student/view/${id}`,
        }),
        getRecentStudents: builder.query({
            query: () => '/student/getRecentStudents',
            keepUnusedDataFor: 0, 
            refetchOnMountOrArgChange: true,
        }),
        updateStudentDetail: builder.mutation({ 
            query: ({ id, studentData }) => ({
                url: `/student/update/${id}`,
                method: 'PATCH',
                body: studentData,
            }),
        }),
        deleteStudent: builder.mutation({
            query: (id) => ({
                url: `/student/delete/${id}`,
                method: 'DELETE',
            }),
        }),
        createStudent: builder.mutation({
            query: (studentData) => ({
                url: '/student/createStudent',
                method: 'POST',
                body: studentData,
            }),
            invalidatesTags: [{ type: 'Student' }],
        }),
    }),
})

export const {
    useGetAllStudentsQuery,
    useGetStudentByIdQuery,
    useGetRecentStudentsQuery,
    useUpdateStudentDetailMutation,
    useDeleteStudentMutation, 
    useCreateStudentMutation
} = StudentApiSlice;

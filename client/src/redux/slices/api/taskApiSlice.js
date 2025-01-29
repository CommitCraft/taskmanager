import { apiSlice } from "../apiSlice";
const TASKS_URL = "/task";
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASKS_URL}/dashboard`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getAllTask: builder.query({
            query: ({strQuery,isTrashed,search}) => ({
                url: `${TASKS_URL}?stage=${strQuery}&isTrashed=${isTrashed}&search=${search}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        createTask: builder.mutation({
            query: (task) => ({
                url: `${TASKS_URL}/create`,
                method: "POST",
                credentials: "include",
                body: data,
            }),
        }),
        duplicateTask: builder.mutation({
            query: (task) => ({
                url: `${TASKS_URL}/duplicate/${task._id}`,
                method: "POST",
                credentials: "include",
                body:{},
            }),
        }),
        updateTask: builder.mutation({
            query: (task) => ({
                url: `${TASKS_URL}/${task._id}`,
                method: "PUT",
                credentials: "include",
                body: data,
            }),
        }),
        

       
    }),
});

export const{useGetDashboardStatsQuery,useGetAllTaskQuery,useCreateTaskMutation,useUpdateTaskMutation,useDuplicateTaskMutation}=taskApiSlice;
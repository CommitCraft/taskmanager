import { apiSlice } from "../apiSlice";
const TASKS_URL = "/task";
export const taskApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getDashboardStats: builder.query({
            query: () => ({
                url: `${TASKS_URL}/dashbord`,
                method: "GET",
                credentials: "include",
            }),
        }),

        // createTask: builder.mutation({
        //     query: (data) => ({
        //         url: `${TASKS_URL}/create`,
        //         method: "POST",
        //         body: data,
        //         credentials: "include",
        //     }),
        // }),
        // updateTask: builder.mutation({
        //     query: (data) => ({
        //         url: `${TASKS_URL}/update`,
        //         method: "PUT",
        //         body: data,
        //         credentials: "include",
        //     }),
        // }),
        // deleteTask: builder.mutation({
        //     query: (data) => ({
        //         url: `${TASKS_URL}/delete`,
        //         method: "DELETE",
        //         body: data,
        //         credentials: "include",
        //     }),
        // }),
        // getTasks: builder.query({
        //     query: () => ({
        //         url: `${TASKS_URL}/get`,
        //         method: "GET",
        //         credentials: "include",
        //     }),
        // }),
    }),
});

export const{useGetDashboardStatsQuery}=taskApiSlice;
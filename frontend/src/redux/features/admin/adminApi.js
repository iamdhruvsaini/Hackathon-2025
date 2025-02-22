import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi= createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api`,
        credentials:'include',

    }),
    tagTypes:['ADMIN','EMPLOYEE'],

    endpoints: (builder) => ({

      getHomeStats: builder.query({
        query: () => `/admin/home-stats`,
        providesTags:['ADMIN']
      }),
      getTrendingPlayers: builder.query({
        query: () => `/admin/trending-players`,
        providesTags:['ADMIN']
      }),
      getSoldPlayers:builder.query({
        query: () => `/admin/recently-sold`,
        providesTags:['ADMIN']
      }),
      getEmployeeDetails:builder.query({
        query:()=>'/admin/employee-details',
        providesTags:['EMPLOYEE'],
      }),
      addNewEmpoyee: builder.mutation({
        query: (formData) => {
            return {
                url:'/users/create-admin',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['EMPLOYEE'],
      }),

      removeEmployee:builder.mutation({
        query: (formData) => {
            return {
                url:'/users/remove-admin',
                method:'POST',
                body:formData,
            }
        },
        invalidatesTags: ['EMPLOYEE'],
      }),
    }),

  })

  export const {
    useGetHomeStatsQuery,
    useGetTrendingPlayersQuery,
    useGetSoldPlayersQuery,
    useGetEmployeeDetailsQuery,
    useAddNewEmpoyeeMutation,
    useRemoveEmployeeMutation

  } = adminApi;
  export default adminApi;
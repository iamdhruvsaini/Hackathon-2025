import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adminApi= createApi({
    reducerPath: 'adminApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/admin`,
        credentials:'include',

    }),
    tagTypes:['Dashboard'],

    endpoints: (builder) => ({

      getPlayerPositionCount: builder.query({
        query: () => `/player-position-count`,
        providesTags:['Dashboard']
      }),

      

    }),

  })

  export const {} = adminApi;
  export default adminApi;
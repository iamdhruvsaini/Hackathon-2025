import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const statsRankingApi= createApi({
    reducerPath: 'statsRankingApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/stats`,
        credentials:'include',
    }),

    endpoints: (builder) => ({
      getRanking: builder.query({
        query: (link) => `/${link}`,
      }),

    }),

  })

  export const { useGetRankingQuery} = statsRankingApi;
  export default statsRankingApi;
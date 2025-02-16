import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playerPositionApi= createApi({
    reducerPath: 'playerPositionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/position`,
        credentials:'include',
    }),
    tagTypes:['PlayerPosition'],
    endpoints: (builder) => ({
      getDefendersPlayers: builder.query({
        query: (page) => `/defenders?page=${page}`,
        providesTags:['PlayerPosition']
      }),
    }),


    

  })

  export const {useGetDefendersPlayersQuery} = playerPositionApi;
  export default playerPositionApi;
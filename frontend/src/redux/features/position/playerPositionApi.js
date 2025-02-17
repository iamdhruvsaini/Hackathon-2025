import getBaseURL from '@/utils/baseURL'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const playerPositionApi = createApi({
    reducerPath: 'playerPositionApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: `${getBaseURL()}/api/position`,
        credentials: 'include',
    }),
    tagTypes: ['PlayerPosition'],
    endpoints: (builder) => ({
        getDefendersPlayers: builder.query({
            query: ({ page = 1, player, country, position, age }) => {
                let queryString = `/defenders?page=${page}`;
                
                if (player) queryString += `&player=${encodeURIComponent(player)}`;
                if (country) queryString += `&country=${encodeURIComponent(country)}`;
                if (position) queryString += `&position=${encodeURIComponent(position)}`;
                if (age) queryString += `&age=${age}`;
      
                return queryString;
            },
            providesTags: ['PlayerPosition']
        }),
    }),
});

export const { useGetDefendersPlayersQuery } = playerPositionApi;
export default playerPositionApi;

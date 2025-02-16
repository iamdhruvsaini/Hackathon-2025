import { configureStore } from '@reduxjs/toolkit'
import dashboardApi from '../features/dashboard/dashboardApi'
import statsRankingApi from '../features/stats/statsRankingApi';
import playerPositionApi from '../features/position/playerPositionApi';



const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]:dashboardApi.reducer,
    [statsRankingApi.reducerPath]:statsRankingApi.reducer,
    [playerPositionApi.reducerPath]:playerPositionApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      statsRankingApi.middleware,
      playerPositionApi.middleware

    ),
})

export default store;
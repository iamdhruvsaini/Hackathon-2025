import { configureStore } from '@reduxjs/toolkit'
import dashboardApi from '../features/dashboard/dashboardApi'
import statsRankingApi from '../features/stats/statsRankingApi';


const store = configureStore({
  reducer: {
    [dashboardApi.reducerPath]:dashboardApi.reducer,
    [statsRankingApi.reducerPath]:statsRankingApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      dashboardApi.middleware,
      statsRankingApi.middleware,

    ),
})

export default store;
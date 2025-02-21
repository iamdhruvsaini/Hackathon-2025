import AdminDashboardHome from "@/admin/admin-dashboard/AdminDashboardHome";
import AdminHome from "@/admin/AdminHome";
import AdminLogin from "@/admin/AdminLogin";
import DashboardLayout from "@/admin/DashboardLayout";
import App from "@/App";
import LoginPage from "@/components/LoginPage";
import PageNotFound from "@/components/PageNotFound";
import SignUpPage from "@/components/SignUpPage";
import StatsTable from "@/components/StatsTable";
import BasketMain from "@/pages/basket/BasketMain";
import Defenders from "@/pages/basket/defenders/Defenders";
import Forwards from "@/pages/basket/forwards/Forwards";
import Goalkeepers from "@/pages/basket/goalkeepers/Goalkeepers";
import Midfielders from "@/pages/basket/midfielders/Midfielders";
import Reserves from "@/pages/basket/reserves/Reserves";
import Wingers from "@/pages/basket/wingers/Wingers";
import CartPage from "@/pages/cart/CartPage";
import Dashboard from "@/pages/dashboard/dashboard";
import Home from "@/pages/home/Home";
import PlayerComparison from "@/pages/player-comparison/PlayerComparison";
import PlayerCard from "@/pages/players-card/PlayerCard";
import StatLink from "@/pages/stats/StatLink";

import { createBrowserRouter } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <SignUpPage />,
      },
      {
        path: "/card",
        element: <PlayerCard />,
      },
      {
        path: "/dashboard",
        element:<PrivateRoute><Dashboard /></PrivateRoute> ,
      },
      {
        path: "/basket",
        element: <PrivateRoute><BasketMain /></PrivateRoute>,
      },
      {
        path: "/cart",
        element: <PrivateRoute><CartPage /></PrivateRoute>,
      },
      {
        path: "/basket",
        element: <PrivateRoute><BasketMain /></PrivateRoute>,
      },
      {
        path: "/stat",
        element:<PrivateRoute><StatLink /></PrivateRoute> ,
      },
      {
        path: "/table/:link",
        element: <PrivateRoute><StatsTable /></PrivateRoute>,
      },
      {
        path: "/forwards",
        element: <PrivateRoute><Forwards /></PrivateRoute>,
      },
      {
        path: "/defenders",
        element:<PrivateRoute><Defenders /></PrivateRoute> ,
      },
      {
        path: "/goalkeepers",
        element: <PrivateRoute><Goalkeepers /></PrivateRoute>,
      },
      {
        path: "/midfielders",
        element: <PrivateRoute><Midfielders /></PrivateRoute>,
      },
      {
        path: "/reserves",
        element: <PrivateRoute><Reserves /></PrivateRoute>,
      },
      {
        path: "/wingers",
        element: <PrivateRoute><Wingers /></PrivateRoute>,
      },
      {
        path:"/player-comparison",
        element:<PlayerComparison/>
      }
    ],
  },


  {
    path: "/admin",
    element: <AdminHome/>,
    children:[
      {
        path: "/admin",
        element: <AdminLogin />,
      },
      {
        path: "/admin/dashboard",
        element:<DashboardLayout/>,
        children:[
          {
            path: "/admin/dashboard",
            element:<AdminDashboardHome/>
          },
          {
            path: "/admin/dashboard/players",
            element:<AdminDashboardHome/>
          },
          {
            path: "/admin/dashboard/configure-players",
            element:<AdminDashboardHome/>
          },
          {
            path: "/admin/dashboard/stats-update",
            element:<AdminDashboardHome/>
          },
        ]
      },
    ]
  },


  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

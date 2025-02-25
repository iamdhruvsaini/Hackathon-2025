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
import TrendingPlayers from "@/admin/admin-dashboard/TrendingPlayers";
import UsersPage from "@/admin/admin-dashboard/users/UsersPage";
import Employees from "@/admin/admin-dashboard/users/Employees";
import RemovePlayers from "@/admin/admin-dashboard/remove-players/RemovePlayers";



const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "register",
        element: <SignUpPage />,
      },
      {
        path: "card",
        element: <PlayerCard />,
      },
      {
        path: "dashboard",
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
      },
      {
        path: "basket",
        element: <PrivateRoute><BasketMain /></PrivateRoute>,
      },
      {
        path: "cart",
        element: <PrivateRoute><CartPage /></PrivateRoute>,
      },
      {
        path: "stat",
        element: <PrivateRoute><StatLink /></PrivateRoute>,
      },
      {
        path: "table/:link",
        element: <PrivateRoute><StatsTable /></PrivateRoute>,
      },
      {
        path: "forwards",
        element: <PrivateRoute><Forwards /></PrivateRoute>,
      },
      {
        path: "defenders",
        element: <PrivateRoute><Defenders /></PrivateRoute>,
      },
      {
        path: "goalkeepers",
        element: <PrivateRoute><Goalkeepers /></PrivateRoute>,
      },
      {
        path: "midfielders",
        element: <PrivateRoute><Midfielders /></PrivateRoute>,
      },
      {
        path: "reserves",
        element: <PrivateRoute><Reserves /></PrivateRoute>,
      },
      {
        path: "wingers",
        element: <PrivateRoute><Wingers /></PrivateRoute>,
      },
      {
        path: "player-comparison",
        element: <PlayerComparison />,
      },
    ],
  },
  
  {
    path: "/admin",
    element: <AdminHome />,
    children: [
      {
        index: true,
        element: <AdminLogin />,
      },
      {
        path: "portal",
        element: <DashboardLayout />,
        children: [
          {
            index: true,
            element: <AdminDashboardHome />,
          },
          {
            path:'trending-players',
            element:<TrendingPlayers/>
          },
          {
            path:'users',
            element:<UsersPage/>,
          },
          {
            path:'employees-details',
            element:<Employees/>
          },
          {
            path:'remove-players',
            element:<RemovePlayers/>
          }

        ],
      },
    ],
  },

  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

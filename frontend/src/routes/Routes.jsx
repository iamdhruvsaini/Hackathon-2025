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
import PlayerCard from "@/pages/players-card/PlayerCard";
import PlayersName from "@/pages/players/PlayersName";
import StatLink from "@/pages/stats/StatLink";

import { createBrowserRouter } from "react-router-dom";

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
        element: <Dashboard />,
      },
      {
        path: "/basket",
        element: <BasketMain />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/basket",
        element: <BasketMain />,
      },
      {
        path: "/stat",
        element: <StatLink />,
      },
      {
        path: "/table/:link",
        element: <StatsTable />,
      },
      {
        path: "/players",
        element: <PlayersName />,
      },

      {
        path: "/forwards",
        element: <Forwards />,
      },
      {
        path: "/defenders",
        element: <Defenders />,
      },
      {
        path: "/goalkeepers",
        element: <Goalkeepers />,
      },
      {
        path: "/midfielders",
        element: <Midfielders />,
      },
      {
        path: "/reserves",
        element: <Reserves />,
      },
      {
        path: "/wingers",
        element: <Wingers />,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
  },
]);

export default router;

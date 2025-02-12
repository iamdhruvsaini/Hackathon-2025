import App from "@/App";
import LoginPage from "@/components/LoginPage";
import PageNotFound from "@/components/PageNotFound";
import SignUpPage from "@/components/SignUpPage";
import StatsTable from "@/components/StatsTable";
import BasketMain from "@/pages/basket/BasketMain";
import CartPage from "@/pages/cart/CartPage";
import Dashboard from "@/pages/dashboard/dashboard";
import Home from "@/pages/home/Home";
import PlayerCard from "@/pages/players-card/PlayerCard";
import StatLink from "@/pages/stats/StatLink";

import { createBrowserRouter } from "react-router-dom";


const router=createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element: <Home/>

            },
            {
                path:"/login",
                element:<LoginPage/>
            },
            {
                path:'/register',
                element:<SignUpPage/>
            },
            {
                path:'/card',
                element:<PlayerCard/>
            },
            {
                path:'/dashboard',
                element:<Dashboard/>
            },
            {
                path:'/basket',
                element:<BasketMain/>
            },
            {
                path:'/cart',
                element:<CartPage/>
            },
            {
                path:'/basket',
                element:<BasketMain/>
            },
            {
                path:'/stat',
                element:<StatLink/>
            },
            {
                path:'/table/:id',
                element:<StatsTable/>
            }

        ]
    },
    {
        path:'*',
        element:<PageNotFound/>
    }
])


export default router;
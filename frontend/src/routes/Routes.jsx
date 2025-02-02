import App from "@/App";
import LoginPage from "@/components/LoginPage";
import SignUpPage from "@/components/SignUpPage";
import Home from "@/pages/home/Home";
import PlayerCard from "@/pages/players-card/PlayerCard";

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
            }
        ]
    }
])


export default router;
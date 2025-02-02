import React from "react";
import { IoArrowForwardSharp } from "react-icons/io5";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FaUser } from "react-icons/fa6";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, replace, useNavigate } from "react-router-dom";


const Navigation = () => {
  
  const user=false;
  const navigate=useNavigate();

  const handleProfileClick=()=>{
    navigate('/login')
  }
 


  
  return (
    <nav className="relative z-10 py-2 flex items-center justify-between px-4 bg-white shadow-md flex-1 ">
      <div className="flex items-center">
        <img src="./assets/asset 0.png" alt="" />
        <Link to={'/'} replace={true} className="text-lg font-medium pl-1">Dominion Fc.</Link>
      </div>
      <ul className="hidden lg:flex gap-12 justify-between items-center">
        <li>
          <a
            href=""
            className="hover:text-blue-600 text-balance text-base font-medium font-display"
          >
            Stats
          </a>
        </li>
        <li>
          <Link
            to={'/card'}
            className="hover:text-blue-600 text-balance text-base font-medium font-display"
          >
            Players
          </Link>
        </li>
        <li>
          <a
            href=""
            className="hover:text-blue-600 text-balance text-base font-medium font-display"
          >
            Stadium
          </a>
        </li>
        <li>
          <a
            href=""
            className="hover:text-blue-600 text-balance text-base font-medium font-display"
          >
            Pricing
          </a>
        </li>
      </ul>
      <div className="basis:1/4 flex gap-6 items-center">
        <div className="outline-none">
          {user ?
            <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar className="flex justify-center items-center">
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
            </DropdownMenu>:<FaUser className="cursor-pointer" onClick={handleProfileClick} />
          }
        </div>
        <Button
          variant={"outline"}
          className="hidden text-sm lg:flex gap-2 justify-between items-center border-gray-300 px-3 py-1 border rounded-xl w-fit hover:border-gray-700 duration-300"
        >
          <img src="./assets/asset 1.svg" alt="" />
          <span className="text-md font-display font-normal">
            Machine Learning Model
          </span>
          <IoArrowForwardSharp />
        </Button>
      </div>
    </nav>
  );
};

export default Navigation;

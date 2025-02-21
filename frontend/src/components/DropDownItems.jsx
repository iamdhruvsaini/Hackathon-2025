import React from "react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";



const DropDownItems = () => {
  const {logout,currentUser}=useAuth();
  console.log(currentUser.photo);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="flex justify-center items-center">
          {currentUser?.photo?
          <AvatarImage src={currentUser.photo} />:
          <AvatarImage src={"https://github.com/shadcn.png"} />
          }
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to={'/dashboard'}><DropdownMenuItem className="cursor-pointer">Dashboard</DropdownMenuItem></Link>
        <DropdownMenuSeparator />
        <Link to={'/stat'}><DropdownMenuItem className="cursor-pointer">Stats</DropdownMenuItem></Link>
        <DropdownMenuSeparator />
        <Link to={'/basket'}><DropdownMenuItem className="cursor-pointer">Basket</DropdownMenuItem></Link>
        <DropdownMenuSeparator />
        <Link to={'/login'}>
          <DropdownMenuItem onClick={()=>logout()} className="cursor-pointer" >Logout</DropdownMenuItem>
        </Link>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownItems;

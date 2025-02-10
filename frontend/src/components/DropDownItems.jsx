import React from "react";


import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const DropDownItems = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="flex justify-center items-center">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Players</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Basket</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownItems;

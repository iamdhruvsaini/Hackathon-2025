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
import { Link, useNavigate } from "react-router-dom";

const DropDownItems = () => {
  const { logout, currentUser } = useAuth();
  const navigate = useNavigate();
  const photoURL = currentUser?.photoURL || "https://github.com/shadcn.png";
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  console.log("Firebase Image URL:", currentUser?.photo);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar className="flex justify-center items-center">
          <AvatarImage
            src={photoURL}
            alt="User Avatar"
          />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <Link to="/dashboard">
          <DropdownMenuItem className="cursor-pointer">
            Dashboard
          </DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/stat">
          <DropdownMenuItem className="cursor-pointer">Stats</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <Link to="/basket">
          <DropdownMenuItem className="cursor-pointer">Basket</DropdownMenuItem>
        </Link>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropDownItems;

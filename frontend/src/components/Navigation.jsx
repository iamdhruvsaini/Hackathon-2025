import React from "react";
import { IoIosSearch } from "react-icons/io";
import NavItems from "./NavItems";
import { FaUser } from "react-icons/fa6";
import DropDownItems from "./DropDownItems";
import { useAuth } from "@/context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Navigation = () => {
  const navigate=useNavigate();
  const {currentUser}=useAuth();
  const handleProfileClick=()=>{
    navigate("/login")
  }
  return (
    <div className="w-full shadow-lg">
      <nav className="xl:max-w-[1300px] h-full mx-auto px-4 py-2 flex items-center justify-between">
        <Link className="text-xl font-semibold" to={'/'} replace={true}>Dominion Fc.</Link>
        <div className="hidden lg:block ml-24">
          <NavItems></NavItems>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative sm:w-60 w-40 space-x-2">
            <IoIosSearch className="absolute inline-block left-3 inset-y-2" />
            <input
              type="text"
              placeholder="Search Here"
              className="bg-gray-100 w-full py-1 md:px-8 px-6 rounded-md focus:outline-none"
            />
          </div>
          {currentUser ?<DropDownItems />:<FaUser className="cursor-pointer" onClick={handleProfileClick}></FaUser>}
        </div>
      </nav>
    </div>
  );
};

export default Navigation;

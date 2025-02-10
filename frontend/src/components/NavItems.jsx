import React from "react";
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Link } from "react-router-dom";

const NavItems = () => {
  return (
    <Menubar>
      <MenubarMenu>
        <Link to={"/dashboard"}>
          <MenubarTrigger>Dashboard</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <MenubarTrigger>Players</MenubarTrigger>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/basket"}>
          <MenubarTrigger>Basket</MenubarTrigger>
        </Link>
      </MenubarMenu>
      <MenubarMenu>
        <Link to={"/cart"}>
          <MenubarTrigger>Cart</MenubarTrigger>
        </Link>
      </MenubarMenu>
    </Menubar>
  );
};

export default NavItems;

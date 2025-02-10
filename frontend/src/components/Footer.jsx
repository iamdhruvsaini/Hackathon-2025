import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <div id="footer" className="mt-10 w-full bg-slate-50">
      <div className="xl:max-w-[1300px] mx-auto px-4">
      <div className="py-10 flex flex-col gap-8 items-center  lg:flex-row-reverse lg:justify-between">
        <div className="flex gap-8 lg:gap-4 lg:flex-row-reverse flex-col items-center">
          <p className="text-lg font-medium text-gray-700">Hackathon</p>
          <div className="text-gray-700 flex gap-4 items-center text-lg">
            <a href="https://linkedin.com/in/iamdhruvsaini/" target="_"><FaLinkedin className="cursor-pointer" /></a>
            <a href="https://github.com/iamdhruvsaini/" target="_"><FaGithub  className="cursor-pointer"/></a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <p className="font-semibold text-xl">Dominion Fc.</p>
        </div>
      </div>

      <div className="pt-4">
        <div className="flex gap-2 justify-center items-center pb-2">
          <p className="text-center text-gray-500  text-sm font-display font-normal">
            Made by Crusaders
          </p>
        </div>

        <p className="text-center text-gray-400 font-display font-normal text-sm">
          © 2025 Dominion Fc., Inc. All rights reserved.
        </p>
      </div>

      </div>
    </div>
  );
};

export default Footer;

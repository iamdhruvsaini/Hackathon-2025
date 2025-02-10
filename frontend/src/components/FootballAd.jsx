import React from "react";
import league from "../assets/league.gif";

const FootballAd = () => {
  return (
    <section>
      <div  className="mx-auto grid max-w-screen-xl rounded-lg p-4 md:p-8 lg:grid-cols-12 lg:gap-8 lg:p-16 xl:gap-16">
        <div  className="lg:col-span-5 lg:mt-0">
            <img src={league} alt="" className="w-[60%] sm:w-[40%] lg:w-full rounded-xl mx-auto" />
        </div>
        <div  className="me-auto place-self-center lg:col-span-7">
          <h1  className="mb-3 text-2xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-4xl">
            Save $500 today on your purchase <br />
            of a new iMac computer.
          </h1>
          <p  className="mb-6 text-gray-500 dark:text-gray-400">
            Reserve your new Apple iMac 27” today and enjoy exclusive savings
            with qualified activation. Pre-order now to secure your discount.
          </p>
        
        </div>
      </div>
    </section>
  );
};

export default FootballAd;

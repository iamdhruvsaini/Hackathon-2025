import { DatePicker } from "@/components/DatePicker";
import React from "react";
import { DashboardCard } from "./DashboardCard";
import { ChartComponent } from "./BarChart";
import { PlayersSelected } from "./PlayersSelected";
import Promo from "./Promo";

const Dashboard = () => {
  return (
    <div className="xl:max-w-[1300px] px-4 mx-auto mt-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Dashboard
        </h1>
        <DatePicker />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 items-stretch">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      <div className="flex flex-col lg:flex-row gap-4 ">
        <div className="w-full lg:w-[40%] min-h-[200px]">
          <ChartComponent />
        </div>
        <div className="w-full lg:w-[60%] border rounded-xl px-2 overflow-hidden min-h-[200px]">
          <PlayersSelected />
        </div>
      </div>
      <Promo/>
    </div>
  );
};

export default Dashboard;

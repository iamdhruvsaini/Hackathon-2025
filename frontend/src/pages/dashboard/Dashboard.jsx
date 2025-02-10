import { DatePicker } from "@/components/DatePicker";
import React from "react";
import { DashboardCard } from "./DashboardCard";
import { ChartComponent } from "./BarChart";
import { PlayersSelected } from "./PlayersSelected";

const Dashboard = () => {
  return (
    <div className="xl:max-w-[1300px] px-4 mx-auto mt-10 flex flex-col gap-6">
      <div className="flex justify-between">
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
          Dashboard
        </h1>
        <DatePicker />
      </div>

      <div className="grid lg:grid-cols-4 grid-cols-2 gap-2 place-items-center">
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard />
      </div>

      <div className="flex gap-4 md:flex-row flex-col">
        <div className="md:w-[40%]">
          <ChartComponent />
        </div>
        <div className="md:w-[60%] border rounded-xl p-2 overflow-hidden">
          <PlayersSelected />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

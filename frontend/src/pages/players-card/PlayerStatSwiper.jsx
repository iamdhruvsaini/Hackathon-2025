import { PieStatChart } from "@/components/PieStatChart";
import { RadialChart } from "@/components/RadialChart";

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import React from "react";
import { Pagination, Navigation } from "swiper/modules";
const PlayerStatSwiper = ({ playerPhysical, playerDetails, playerSkills }) => {
  return (
    // <div className="sm:flex gap-2 items-stretch">
    //   <div className="sm:w-[220px]">
    //     <RadialChart title={"Potential"} score={playerDetails.potential} />
    //   </div>
    //   <div className="sm:w-[220px]">
    //     <PieStatChart
    //       title={"Physical"}
    //       playerDetails={playerDetails}
    //       playerPhysical={playerPhysical}
    //     />
    //   </div>
    //   <div className="sm:w-[220px]">
    //     <RadialChart title={"Fitness"} score={playerSkills.physic} />
    //   </div>
    // </div>
    

    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      breakpoints={{
       
        970: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        1200:{
          slidesPerView: 3,
          spaceBetween: 10,
        }
      }}
      navigation={true}
      modules={[Pagination, Navigation]}
      className="sm:w-[50%] lg:w-full"
    >
      <SwiperSlide>
        <div className="">
          <RadialChart title={"Potential"} score={playerDetails.potential} />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="">
          <PieStatChart
            title={"Physical"}
            playerDetails={playerDetails}
            playerPhysical={playerPhysical}
          />
        </div>
      </SwiperSlide>

      <SwiperSlide>
        <div className="">
          <RadialChart title={"Fitness"} score={playerSkills.physic} />
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default PlayerStatSwiper;

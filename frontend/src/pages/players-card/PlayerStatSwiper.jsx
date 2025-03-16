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
          <h1>Age {playerDetails.age}</h1>
          <h2>height {playerPhysical.height_cm}</h2>
          <h3>weight {playerPhysical.weight_kg}</h3>
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


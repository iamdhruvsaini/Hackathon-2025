import React, { useEffect, useState } from "react";


const Recommended = () => {
  const [recommendation, setRecommendation] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/data.json");
      const data = await res.json();
      setRecommendation(data.slice(0, 3));
    };
    fetchData();
  }, []);

  return (
    <div className="hidden xl:mt-8 xl:block">
      <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-3xl">
        Recommended
      </h1>
      <div className="mt-6 grid grid-cols-3 gap-4 sm:mt-8">
        {recommendation.map((item, index) => (
          <div
            className="space-y-6 overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800"
            key={index}
          >
            <a href="#" className="overflow-hidden rounded">
              <img
                className="mx-auto h-44 w-44 dark:hidden"
                src={item.player_face_url}
                alt="imac image"
              />
            </a>
            <div>
              <a
                href="#"
                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                iMac 27”
              </a>
              <p className="mt-2 text-base font-normal text-gray-500 dark:text-gray-400">
                This generation has some improvements, including a longer
                continuous battery life.
              </p>
            </div>

            <p className="text-lg font-bold leading-tight text-red-600 dark:text-red-500">
              $299
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recommended;

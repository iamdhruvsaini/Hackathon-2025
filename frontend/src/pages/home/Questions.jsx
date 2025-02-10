
import { FoldableCard } from "@/components/FoldableCard";
import React from "react";

const askedQuestion=["","","",""];

const Questions = () => {
  return (
    <div>
      <p className="text-4xl font-bold text-gray-700">FAQ's</p>
      <div className="mt-10 mx-auto flex flex-col gap-5 lg:grid lg:grid-cols-2 px-4"
      >
        {askedQuestion.map(()=>(
            <FoldableCard></FoldableCard>
        ))}
        
      </div>
    </div>
  );
};

export default Questions;

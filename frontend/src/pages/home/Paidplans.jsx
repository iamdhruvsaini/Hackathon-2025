import { BellRing, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/PayementCard";

const plans = [
  {
    title: "Free",
    price:'$0/month'

  },
  {
    title: "Essential",
    price:'$50/month'
  },
  {
    title: "Professional",
    price:'$99/month'
  },
];

export default function Paidplans() {
  return (
    <section className="my-16">
        <p className="text-4xl font-bold text-gray-700">Choose Plan</p>
        <div className="flex md:w-[90%] flex-col md:flex-row mx-auto gap-4 mt-10">
        
            {plans.map((plan)=>(
            <Card key={Math.random()}>
                <CardHeader>
                <CardTitle>{plan.title}</CardTitle>
                <CardDescription>For personal use and maing your best possible playing 11.</CardDescription>
                <CardDescription>{plan.price}</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                <div className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                    <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                    <div className="space-y-1">
                    <p className="text-sm font-medium leading-none">
                       Acces the statistical view of Players
                    </p>
                    <p className="text-sm font-medium leading-none">
                       
                    </p>
                    
                    </div>
                </div>
                </CardContent>
                <CardFooter>
                <Button className="w-full">
                    <Check /> Pay Now
                </Button>
                </CardFooter>
            </Card>
            ))}

        </div>
    </section>
    
    
  );
}




import * as React from "react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Link } from "react-router-dom";



export function DashboardCard({card}) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className="hover:underline font-bold"><Link to={`/${card.link}`}>{card.title}</Link></CardTitle>
        <CardDescription className="text-pretty">{card.description.length >= 50 ? card.description.substring(0, 100) + "..." : card.description}
        </CardDescription>
      </CardHeader>
    </Card>
  )
}

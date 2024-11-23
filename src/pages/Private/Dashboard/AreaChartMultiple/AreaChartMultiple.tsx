"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

import { useEffect, useState } from "react"
import { Service } from "@/models"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

const chartConfig = {
  huanta: {
    label: "Huanta",
    color: "hsl(var(--chart-1))",
  },
  ctogrande: {
    label: "Canto Grande",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

type Total = {
  mes: string;
  huanta: number;
  ctogrande: number;
};

type PropAreaChartMultiple = {
  data: Service[];
}

export function AreaChartMultiple(props:PropAreaChartMultiple) {
  const {data} = props;

  const [dataChart, setDataChart] = useState<Total[]>()

  const sumarTotales = (services: Service[]) : Total[] => {
    const result = services.reduce((acc: Record<string, Total>, service)=>{

      const { mes, congregacion, ofrenda} = service;

      // Si el mes no existe en el acumulador, lo inicializamos.
      if(!acc[mes]){
        acc[mes] = {
          mes, huanta: 0, ctogrande:0
        };
      }

      // Acumulamos la asistencia segun la congregacion
      if(congregacion === "Huanta"){
        acc[mes].huanta += ofrenda;
      }else if(congregacion === "Canto Grande"){
        acc[mes].ctogrande += ofrenda;
      }
      return acc;
    },{});
    return Object.values(result)
  }
  useEffect(()=>{
    setDataChart(sumarTotales(data))
  },[])
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ofrenda</CardTitle>
        {/* <CardDescription>
          Showing total visitors for the last 6 months
        </CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={dataChart}
            margin={{
              left: -20,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={3}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Area
              dataKey="huanta"
              type="natural"
              fill="var(--color-huanta)"
              fillOpacity={0.4}
              stroke="var(--color-huanta)"
              stackId="a"
            />
            <Area
              dataKey="ctogrande"
              type="natural"
              fill="var(--color-ctogrande)"
              fillOpacity={0.4}
              stroke="var(--color-ctogrande)"
              stackId="a"
            />
            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-center gap-2 text-sm">
          
            <div className="flex items-center gap-2 font-medium leading-none">
              {/* Trending up by 5.2% this month <TrendingUp className="h-4 w-4" /> */}
              Monto de ofrendas recolectadas en las reuniones de servicio <TrendingUp className="h-4 w-4" />
            </div>
          
      </CardFooter>
    </Card>
  )
}

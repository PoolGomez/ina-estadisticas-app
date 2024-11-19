"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Card,
  CardContent,
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
import { Service } from "@/domain/models/Service"
import { useEffect, useState } from "react"
// const chartData = [
//   { month: "January", desktop: 186, mobile: 80 },
//   { month: "February", desktop: 305, mobile: 200 },
//   { month: "March", desktop: 237, mobile: 120 },
//   { month: "April", desktop: 73, mobile: 190 },
//   { month: "May", desktop: 209, mobile: 130 },
//   { month: "June", desktop: 214, mobile: 140 },
// ]

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
//   mobile: {
//     label: "Mobile",
//     color: "hsl(var(--chart-2))",
//   },
// } satisfies ChartConfig

const chartConfig = {
  huanta: {
    label: "Huanta",
    color: "hsl(var(--chart-1))",
    // color: "#2563eb",
  },
  ctogrande: {
    label: "Canto Grande",
    color: "hsl(var(--chart-2))",
    // color: "#60a5fa",
  },
} satisfies ChartConfig

type Total = {
  mes: string;
  huanta: number;
  ctogrande: number;
};

type PropBarChartMultiple = {
  data: Service[] //| undefined
}

export function BarChartMultiple(props: PropBarChartMultiple) {
  const {data} = props;

  const [dataChart, setDataChart] = useState<Total[]>();
  // const getTotalesMeses = (data: Service[]) =>{
  //   const resultado: {[mes:string]:{[congregacion:string]: number}} = {};

  //   if(data){
  //     data.forEach(({ mes, asistencia, congregacion }) => {
  //       // Inicializa el mes si no existe
  //       if (!resultado[mes]) {
  //         resultado[mes] = {};
  //       }
    
  //       // Inicializa la congregación si no existe y suma las asistencias
  //       resultado[mes][congregacion] = (resultado[mes][congregacion] || 0) + asistencia;
  //     });
  //   }
  
  //   // Convertimos el objeto acumulador a un array con el formato deseado
  //   Object.entries(resultado).map(([mes, congregaciones]) => ({
  //     mes,
  //     ...congregaciones,
  //   }));

  //   console.log(resultado)

  // };

  const sumarTotales = (services : Service[]) : Total[] => {

    const result = services.reduce((acc: Record<string, Total>, service)=>{

      const { mes, congregacion, asistencia} = service;

      // Si el mes no existe en el acumulador, lo inicializamos.
      if(!acc[mes]){
        acc[mes] = {
          mes, huanta: 0, ctogrande:0
        };
      }

      // Acumulamos la asistencia segun la congregacion
      if(congregacion === "Huanta"){
        acc[mes].huanta += asistencia;
      }else if(congregacion === "Canto Grande"){
        acc[mes].ctogrande += asistencia;
      }
      return acc;
    },{});

    //convertimos el objeto acumulador en un arrau de totales
    console.log(result)
    return Object.values(result);

  }

  useEffect(()=>{
    setDataChart(sumarTotales(data))
  },[])


  return (
    <Card>
      <CardHeader>
        <CardTitle>Asistencias</CardTitle>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={dataChart}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="mes"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <ChartLegend content={<ChartLegendContent />} />
            <Bar dataKey="huanta" fill="var(--color-huanta)" radius={4}>
                {/* <LabelList
                    position="insideTop"
                    offset={12}
                    className="font-bold text-lg fill-foreground"
                    fontSize={12}
                  /> */}
            </Bar>
            <Bar dataKey="ctogrande" fill="var(--color-ctogrande)" radius={4}>
                  {/* <LabelList
                    position="insideTop"
                    offset={12}
                    className="font-bold text-lg fill-foreground"
                    fontSize={12}
                  /> */}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  )
}

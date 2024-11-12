import { useServices } from "@/hooks/useServices";
import { AreaChartMultiple, BarChartMultiple, CardAssistsCtoGrande, CardAssistsGlobal, CardAssistsHuanta, CardOfferingGlobal } from "../Dashboard";

export function Home() {
  const { data: services } = useServices();

  return (
    <div className="h-full p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-2">
                <CardOfferingGlobal />
                <CardAssistsGlobal />

                <CardAssistsHuanta />

                <CardAssistsCtoGrande />

                
                
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 p-2">
        {services && (
          <BarChartMultiple data={services} />
        )}
        

        <AreaChartMultiple />
      </div>
    </div>
  )
}

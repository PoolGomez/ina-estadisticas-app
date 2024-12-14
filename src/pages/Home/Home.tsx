import { useServices } from "@/hooks/useServices";
import { AreaChartMultiple, BarChartMultiple, CardAssistsCtoGrande, CardAssistsGlobal, CardAssistsHuanta, CardOfferingGlobal } from "../Private/Dashboard";

export default function Home() {
  const { data: response } = useServices();

  return (
    <div className="h-full p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 p-2">
      {response && (
          <>
          <CardOfferingGlobal data={response.data} />
          <CardAssistsGlobal data={response.data} />
          <CardAssistsHuanta data={response.data} />
          <CardAssistsCtoGrande data={response.data} />
          </>
        )}

                
                
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2 p-2">
      {response && (
          <>
          <BarChartMultiple data={response.data} />
          <AreaChartMultiple data={response.data}/>
          </>
        )}
        

        
      </div>
    </div>
  )
}


// import { useItems } from "@/hooks/useItems";
import { BarChartMultiple } from "./BarChartMultiple";
import { AreaChartMultiple } from "./AreaChartMultiple/AreaChartMultiple";
import { useServices } from "@/hooks/useServices";
import { CardAssistsGlobal } from "./CardAssistsGlobal";
import { CardOfferingGlobal } from "./CardOfferingGlobal";
import { CardAssistsHuanta } from "./CardAssistsHuanta";
import { CardAssistsCtoGrande } from "./CardAssistsCtoGrande/CardAssistsCtoGrande";


export default function Dashboard() {

  // const { data: items, isLoading, error } = useItems();
  // const tokenState = useSelector((store: AppStore) => store.token);
  const { data: services } = useServices();

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error loading data</p>;

  // const labels = items?.map((item) => item.name) || [];
  // const dataValues = items?.map((item) => item.value) || [];
    
   


  return (
    <div>
     {/* <div className="w-screen p-4 mt-12 items-center justify-center"> */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 p-2">
                <CardOfferingGlobal />
                <CardAssistsGlobal />

                <CardAssistsHuanta />

                <CardAssistsCtoGrande />

                
                
      </div>

      <div className="grid gap-4 grid-cols-1 lg:grid-cols-2 p-2">
        {services && (
          <>
          <BarChartMultiple data={services} />
          <AreaChartMultiple data={services}/>
          </>
        )}
        

       
      </div>
              
     {/* </div> */}
    </div>
  )
}

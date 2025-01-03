import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Service } from "@/models";

type PropCardAssistsCtoGrande = {
  data: Service[] 
}

export function CardAssistsCtoGrande(props: PropCardAssistsCtoGrande) {
    const {data} = props;
    const total = data?.reduce( (acc, service) =>  acc + (service.congregacion === "Canto Grande" ? service.asistencia : 0), 0 );
  return (
    <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      Asistencia
                    </CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                    {/* <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-muted-foreground"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg> */}
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                        {/* +573 */}
                        {total}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {/* +201 since last hour */}
                      Congregación Canto Grande
                    </p>
                  </CardContent>
                </Card>
  )
}

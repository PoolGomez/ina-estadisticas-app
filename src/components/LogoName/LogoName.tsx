import { Label } from "../ui/label";

export default function LogoName() {
  return (
    <div className="flex gap-2 items-center justify-start">
            <img alt="logo" src="/logo.ico" width={32} height={32} />
            <Label>INA Estadisticas</Label>
          </div>
  )
}

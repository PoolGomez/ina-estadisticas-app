import { UserInfo } from "@/models";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { UpdateUser } from "./UpdateUser";

export const columns: ColumnDef<UserInfo>[] = [
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Email
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className="lowercase text-center">{row.getValue("email")}</div>
    ),
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nombre
            <ArrowUpDown />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "rol",
    header: ({ column }) => (
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rol
          <ArrowUpDown />
        </Button>
      </div>
    ),
    cell: ({ row }) => <div className="lowercase">{row.getValue("rol")}</div>,
  },

  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const row_user = row.original;

      return (
        <div className="flex items-center justify-end gap-2">
          <UpdateUser id={row_user.id} />
        </div>
      );
    },
  },
];

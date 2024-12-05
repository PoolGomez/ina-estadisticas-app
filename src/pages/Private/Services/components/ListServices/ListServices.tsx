
import * as React from "react"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
// import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"


import { DeleteService } from "./DeleteService"
import { UpdateService } from "./UpdateService"
import { Service } from "@/models"


const columns: ColumnDef<Service>[] = [
//   {
//     id: "select",
//     header: ({ table }) => (
    
//       <Checkbox
//         checked={
//           table.getIsAllPageRowsSelected() ||
//           (table.getIsSomePageRowsSelected() && "indeterminate")
//         }
//         onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//         aria-label="Select all"
//       />
//     ),
//     cell: ({ row }) => (
//       <Checkbox
//         checked={row.getIsSelected()}
//         onCheckedChange={(value) => row.toggleSelected(!!value)}
//         aria-label="Select row"
//       />
//     ),
//     enableSorting: false,
//     enableHiding: false,
//   },
  
  {
    accessorKey: "boleta",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Boleta
          <ArrowUpDown />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase text-center">{row.getValue("boleta")}</div>,
  },
  {
    accessorKey: "congregacion",
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Congregación
          <ArrowUpDown />
        </Button>
        </div>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("congregacion")}</div>,
  },
  {
    accessorKey: "fecha",
    header: ({column}) => <div className="flex items-center justify-center">
    <Button variant="outline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                            Fecha
                            <ArrowUpDown />
                        </Button>
                        </div>,
    // <div className="text-center">Fecha</div>,
    cell: ({ row }) => (
      <div className="capitalize text-center">{row.getValue("fecha")}</div>
    ),
  },
  {
    accessorKey: "ofrenda",
    header: ({column}) => <div className="flex items-center justify-center">
    <Button variant="outline" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                            Ofrenda
                            <ArrowUpDown />
                        </Button>
                        </div>,
    // <div className="text-center">Ofrenda</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("ofrenda"))

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount)

      return <div className="text-center font-medium lg:mr-8">{formatted}</div>
    },
  },
 
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const service = row.original

      return (
<div className="flex items-center justify-end gap-2">
<UpdateService id={service.id} />
<DeleteService id={service.id} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="h-8 w-8 p-0 bg-primary-foreground">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(service.boleta)}
            >
              Copiar Nro Boleta
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator />
            <DropdownMenuItem>
               View customer 
             
              
              
              
            </DropdownMenuItem>
            <DropdownMenuItem>
              View payment details 
              
              
            </DropdownMenuItem> */}
           </DropdownMenuContent>
         </DropdownMenu>
         </div>
      )
    },
  },
]

export function ListServices({services}:{services: Service[] }) {

  
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const table = useReactTable({
    data: services,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },

  })

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Buscar..."
        //   value={(table.getColumn("congregacion")?.getFilterValue() as string) ?? ""}
        //   onChange={(event) =>
        //     table.getColumn("congregacion")?.setFilterValue(event.target.value)
        //   }
        value={(table.getState().globalFilter as string) ?? ""}
        onChange={(event) => table.setGlobalFilter(event.target.value)}

          className="max-w-sm"
        />
        {/* <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu> */}
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button";


export interface Training {
    id: string;
    date: string;
    duration: string;
    activity: string;
    customer: string;
}

export const columns: ColumnDef<Training>[] = [
    {
        accessorKey: 'date',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Date</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'duration',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Duration</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'activity',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Activity</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'customer',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Customer</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
]
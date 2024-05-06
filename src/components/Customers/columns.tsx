import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button";

export interface Customer {
    id: string;
    firstname: string;
    lastname: string;
    streetaddress: string;
    postcode: string;
    city: string;
    email: string;
    phone: string;
}

export const columns: ColumnDef<Customer>[] = [
    {
        accessorKey: 'firstname',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Firstname</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'lastname',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Lastname</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'streetaddress',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Streetaddress</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'postcode',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Postcode</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'city',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">City</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Email</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
    {
        accessorKey: 'phone',
        header: ({ column }) => {
            return (
              <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                <div className="text-lg font-bold">Phone</div>
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            )
        },
    },
]
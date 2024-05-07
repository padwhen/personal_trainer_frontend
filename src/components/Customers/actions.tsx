import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "../ui/button"
import { MoreHorizontal } from "lucide-react"
import { Customer } from "./columns"
import { Link } from "react-router-dom"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from "../ui/alert-dialog"
import { AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"
import axios from "axios"

interface ActionsProps {
    customer: Customer
}

export const Actions = ({ customer }: ActionsProps) => {
    const handleDelete = async () => {
        try {
            await axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${customer.id}`);
            window.location.reload()
        } catch (error) {
            console.error('Error deleting customer: ', error)
        }
    }
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <Link to={`/edit/${customer.id}`}>
                    <DropdownMenuItem className="text-lg">Edit</DropdownMenuItem>
                </Link>
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <div className="text-lg ml-2 cursor-pointer">Delete</div>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogTitle className="text-lg font-bold">Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete youraccount and remove your data from our servers.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
                <Link to={`${customer.id}/trainings`}>
                    <DropdownMenuItem className="text-lg">Edit training</DropdownMenuItem>
                </Link>
            </DropdownMenuContent>
          </DropdownMenu>
    )
}
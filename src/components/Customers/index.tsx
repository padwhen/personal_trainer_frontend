import { useEffect, useState } from "react";
import { Customer, columns } from "./columns";
import { DataTable } from "./data-table";

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers')
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json()
            const customersWithIds = await Promise.all(data._embedded.customers.map(async (customer: any) => {
                const id = customer._links.self.href.split('/').pop()
                return { ...customer, id };
            }))
            setCustomers(customersWithIds)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    })
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={customers} />
        </div>
    )
}
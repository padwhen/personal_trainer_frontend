import { useEffect, useState } from "react";
import { Training, columns } from "./columns";
import { DataTable } from "./data-table";
import { format } from 'date-fns'

export default function Trainings() {
    const [trainings, setTrainings] = useState<Training[]>([])
    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings')
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            const data = await response.json()
            const trainingsWithIds = await Promise.all(data._embedded.trainings.map(async (training: any) => {
                const id = training._links.self.href.split('/').pop()
                const formattedDate = format(new Date(training.date), "dd/MM/yyyy");
                const customerResponse = await fetch(training._links.customer.href)
                if (!customerResponse.ok) {
                    throw new Error('Failed to fetch customer data')
                }
                const customerData = await customerResponse.json()
                const customer = `${customerData.firstname} ${customerData.lastname}`
                const durationWithUnit = `${training.duration} minutes`
                return {...training, id, date: formattedDate, customer, duration: durationWithUnit}
            }))
            setTrainings(trainingsWithIds)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        fetchData()
    }, [])
    return (
        <div className="container mx-auto py-10">
            <DataTable columns={columns} data={trainings} />
        </div>
    )
}
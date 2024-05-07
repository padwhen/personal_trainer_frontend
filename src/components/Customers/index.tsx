import { useEffect, useState } from "react";
import axios from "axios";
import { Customer, columns } from "./columns";
import { DataTable } from "./data-table";
import { Button } from "../ui/button";
import { Dialog, DialogClose, DialogContent, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Customers() {
    const [customers, setCustomers] = useState<Customer[]>([])
    const [formData, setFormData] = useState<Customer>({
        id: Math.floor(1000 + Math.random() * 9000).toString(),
        firstname: "",
        lastname: "",
        streetaddress: "",
        postcode: "",
        city: "",
        email: "",
        phone: "",
    });

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
    }, [])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('https://customerrestservice-personaltraining.rahtiapp.fi/api/customers', formData);
            console.log("Customer added successfully:", response.data);
            setFormData({
                id: Math.floor(1000 + Math.random() * 9000).toString(),
                firstname: "",
                lastname: "",
                streetaddress: "",
                postcode: "",
                city: "",
                email: "",
                phone: "",
            });
            fetchData();
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className="container mx-auto py-10">
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">Add customer</Button>
                </DialogTrigger>
                <DialogContent className="w-[425px]">
                    <DialogTitle>Add a customer</DialogTitle>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="firstname" className="text-right">First Name</Label>
                            <Input id="firstname" name="firstname" value={formData.firstname} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="lastname" className="text-right">Last Name</Label>
                            <Input id="lastname" name="lastname" value={formData.lastname} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="streetaddress" className="text-right">Street Address</Label>
                            <Input id="streetaddress" name="streetaddress" value={formData.streetaddress} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="postcode" className="text-right">Postcode</Label>
                            <Input id="postcode" name="postcode" value={formData.postcode} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="city" className="text-right">City</Label>
                            <Input id="city" name="city" value={formData.city} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="email" className="text-right">Email</Label>
                            <Input id="email" name="email" value={formData.email} className="col-span-3" onChange={handleInputChange} />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="phone" className="text-right">Phone</Label>
                            <Input id="phone" name="phone" value={formData.phone} className="col-span-3" onChange={handleInputChange} />
                        </div>
                    </div>
                    <Button variant="default" onClick={handleSubmit}>Add</Button>
                </DialogContent>
            </Dialog>
            <DataTable columns={columns} data={customers} />
        </div>
    )
}

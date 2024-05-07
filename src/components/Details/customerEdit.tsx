import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Customer } from "../Customers/columns"
import { Navigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface UpdatedCustomer extends Customer {}

export function EditCustomer() {
    const { id } = useParams()
    const [customer, setCustomer] = useState<Customer | null>(null)
    const [updatedCustomer, setUpdatedCustomer] = useState<UpdatedCustomer | null>(null)
    const [redirect, setRedirect] = useState(false)

    useEffect(() => {
        axios.get(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}`)
        .then(response => {
            setCustomer(response.data);
            setUpdatedCustomer(response.data); 
        })
        .catch(error => console.error("Error fetching customer: ", error))
    }, [id])

    if (!customer || !updatedCustomer) {
        return <div>Loading....</div>
    }

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUpdatedCustomer(prevState => ({
            ...prevState!,
            [name]: value
        }));
    };    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await axios.put(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}`, updatedCustomer, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            setRedirect(true)
        } catch (error) {
            console.error('Error updating customer:', error);
        }
    };

    const handleCancel = () => {
        setRedirect(true)
    };

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="flex items-center justify-center h-screen">
            <Card className="w-[650px] h-[680px]">
                <CardHeader>
                    <CardTitle className='text-lg'>Edit profile for {customer.firstname} {customer.lastname}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <div className="grid w-full items-center gap-4">
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="firstname">First Name</Label>
                                <Input id="firstname" name="firstname" value={updatedCustomer.firstname} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="lastname">Last Name</Label>
                                <Input id="lastname" name="lastname" value={updatedCustomer.lastname} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" value={updatedCustomer.email} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="phone">Phone</Label>
                                <Input id="phone" name="phone" value={updatedCustomer.phone} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="streetaddress">Street Address</Label>
                                <Input id="streetaddress" name="streetaddress" value={updatedCustomer.streetaddress} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="postcode">Postcode</Label>
                                <Input id="postcode" name="postcode" value={updatedCustomer.postcode} onChange={handleInputChange} />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="city">City</Label>
                                <Input id="city" name="city" value={updatedCustomer.city} onChange={handleInputChange} />
                            </div>
                        </div>
                        <CardFooter className="flex justify-between pt-10">
                            <Button type="button" variant="outline" onClick={handleCancel}>Cancel</Button>
                            <Button type="submit">Save Changes</Button>
                        </CardFooter>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

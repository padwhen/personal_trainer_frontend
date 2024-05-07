    import axios from "axios";
    import { useEffect, useState } from "react";
    import { useParams } from "react-router-dom";
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
    import { format } from 'date-fns'
    import { CalendarIcon } from "@radix-ui/react-icons"
    import { Label } from "../ui/label";
    import { Input } from "../ui/input";
    import { Calendar } from "../ui/calendar";
    import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
    import { Button } from "../ui/button";
    import { cn } from "@/lib/utils";
    import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter } from "../ui/alert-dialog"
    import { AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog"


    interface Training {
        id: string;
        activity: string;
        date: string;
        duration: string
    }

    export const EditTraining = () => {
        const { id } = useParams();
        const [pastTrainings, setPastTrainings] = useState<Training[]>([]);
        const [futureTrainings, setFutureTrainings] = useState<Training[]>([]);
        const [newTraining, setNewTraining] = useState<Partial<Training>>({ activity: '', date: '', duration: ''})
        const [date, setDate] = useState<Date>()

        const handleNewTrainingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            const { name, value }= event.target
            setNewTraining(prevState => ({ ...prevState, [name]: value }))
        }

        const handleNewTrainingSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            try {
                const customerRefLink = `https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}`;
                const newTrainingWithCustomerRef = {
                    date: newTraining.date,
                    activity: newTraining.activity,
                    duration: newTraining.duration,
                    customer: customerRefLink
                };
                await axios.post(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings`, newTrainingWithCustomerRef, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setNewTraining({ activity: '', date: '', duration: '' });
                window.location.reload();
            } catch (error) {
                console.error('Error adding new training: ', error);
            }
        };

        const handleDelete = async (trainingId: string) => {
            try {
                await axios.delete(`https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings/${trainingId}`);
                window.location.reload()
            } catch (error) {
                console.error('Error deleting customer: ', error)
            }
        }
    
        useEffect(() => {
            axios.get(`https://customerrestservice-personaltraining.rahtiapp.fi/api/customers/${id}/trainings`)
                .then(response => {
                    const trainings: Training[] = response.data._embedded.trainings.map((training: any) => {
                        const trainingId = training._links.self.href.split('/').pop();
                        return {
                            ...training,
                            id: trainingId
                        };
                    });
                    const currentDate = new Date();

                    const past = trainings.filter((training: Training) => new Date(training.date) < currentDate);
                    const future = trainings.filter((training: Training) => new Date(training.date) >= currentDate);

                    setPastTrainings(past);
                    setFutureTrainings(future);
                })
                .catch(error => {
                    console.error("Error fetching trainings:", error);
                });
        }, [id]);

        useEffect(() => {
            if (date) {
                setNewTraining(prevState => ({ ...prevState, date: date.toISOString() }));
            }
        }, [date]);
        

        if (!pastTrainings || !futureTrainings) {
            return <div>Loading...</div>;
        }

        return (
            <div className="flex items-center justify-center h-screen">
                <div>
                    <h1 className="text-2xl font-bold">Past Trainings</h1>
                    {pastTrainings.map(training => (
                        <Card key={training.id} className="w-[350px] mb-4 mt-5">
                            <CardHeader>
                                <CardTitle className="text-xl">{training.activity}</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col gap-2">
                                <div className="text-lg">Date: {format(new Date(training.date), 'dd/MM/yyyy')}</div>
                                <div className="text-lg">Duration: {training.duration} minutes</div>
                                <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant={"default"}>Delete</Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogTitle className="text-lg font-bold">Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete youraccount and remove your data from our servers.
                                                </AlertDialogDescription>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(training.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                            </CardContent>
                        </Card>
                    ))}
                    {futureTrainings.length > 0 ? (
                        <div>
                            <h1 className="text-2xl font-bold mt-5">Future trainings</h1>
                            {futureTrainings.map(training => (
                                <Card key={training.id} className="w-[350px] mb-4 mt-5">
                                    <CardHeader>
                                        <CardTitle className="text-xl">{training.activity}</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex flex-col gap-2">
                                        <div className="text-lg">Date: {format(new Date(training.date), 'dd/MM/yyyy')}</div>
                                        <div className="text-lg">Duration: {training.duration} minutes</div>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild><Button variant={"default"}>Delete</Button></AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogTitle className="text-lg font-bold">Are you absolutely sure?</AlertDialogTitle>
                                                <AlertDialogDescription>
                                                    This action cannot be undone. This will permanently delete youraccount and remove your data from our servers.
                                                </AlertDialogDescription>
                                                <AlertDialogFooter>
                                                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                                                    <AlertDialogAction onClick={() => handleDelete(training.id)}>Continue</AlertDialogAction>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                        </AlertDialog>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : null}
                </div>
                <div className="ml-10">
                    <h1 className="text-2xl font-bold">
                        <span className="border-2 p-2 rounded-lg">Add new training</span>
                    </h1>
                        <form onSubmit={handleNewTrainingSubmit}>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex gap-2 mt-5">
                                    <Label htmlFor="activity" className="text-lg min-w-[80px]">Activity</Label>
                                    <Input type="text" id="activity" name="activity" value={newTraining.activity} onChange={handleNewTrainingChange} />
                                </div>
                                <div className="flex gap-2 mt-5">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button variant={"outline"} className={cn("w-[240px] justify-start text-left font-normal")}>
                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                {date ? format(date, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="flex gap-2">
                                    <Label htmlFor="duration" className="text-lg min-w-[80px]">Duration</Label>
                                    <Input type="text" id="duration" name="duration" value={newTraining.duration} onChange={handleNewTrainingChange} />
                                </div>
                                <div className="flex gap-2">
                                    <Button variant={"default"}>Submit</Button>
                                </div>
                            </div>
                        </form>
                </div>
            </div>
        );
    };

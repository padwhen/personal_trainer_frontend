import { useEffect, useState } from "react";
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

export const CalendarPage = () => {
    const [trainings, setTrainings] = useState([]);

    const fetchData = async () => {
        try {
            const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings');
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const data = await response.json();
            const trainingsWithIds = data._embedded.trainings.map((training: any) => {
                const id = training._links.self.href.split('/').pop();
                return {
                    id,
                    title: training.activity,
                    start: new Date(training.date),
                    end: new Date(new Date(training.date).getTime() + training.duration * 60000) // Convert duration to milliseconds
                };
            });
            setTrainings(trainingsWithIds);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            {trainings.length > 0 && (
                <FullCalendar
                    plugins={[dayGridPlugin]}
                    initialView="dayGridMonth"
                    weekends={true}
                    events={trainings}
                />
            )}        
        </div>
    );
};

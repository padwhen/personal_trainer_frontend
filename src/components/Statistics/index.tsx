import { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";
import _ from "lodash";

export const StatisticsPage = () => {
    const [trainings, setTrainings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://customerrestservice-personaltraining.rahtiapp.fi/api/trainings');
                if (!response.ok) {
                    throw new Error(response.statusText);
                }
                const data = await response.json();
                setTrainings(data._embedded.trainings);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const calculateStatistics = () => {
        const groupedData = _.groupBy(trainings, 'activity');
        const statistics = Object.keys(groupedData).map(activity => {
            const totalDuration = _.sumBy(groupedData[activity], 'duration');
            return { activity, totalDuration };
        });
        return statistics;
    };

    const statisticsData = calculateStatistics();
    console.log(statisticsData)
    return (
        <div>
            <h1>Statistics</h1>
            <BarChart
                width={1400}
                height={600}
                data={statisticsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="activity" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="totalDuration" fill="#8884d8" />
            </BarChart>
        </div>
    );
};


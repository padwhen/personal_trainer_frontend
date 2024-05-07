// ExportButton.tsx
import React from 'react';
import { saveAs } from 'file-saver';
import { Button } from './components/ui/button';

interface ExportButtonProps {
    customers: Customer[];
}

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

const ExportButton: React.FC<ExportButtonProps> = ({ customers }) => {
    const exportToCSV = () => {
        const csvData = customers.map(customer => ({
            firstname: customer.firstname,
            lastname: customer.lastname,
            streetaddress: customer.streetaddress,
            postcode: customer.postcode,
            city: customer.city,
            email: customer.email,
            phone: customer.phone,
        }));

        const csvContent = [
            Object.keys(csvData[0]).join(','),
            ...csvData.map(customer => Object.values(customer).join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });
        saveAs(blob, 'customers.csv');
    };

    return (
        <Button variant="default" onClick={exportToCSV}>
            Export to CSV
        </Button>
    );
};

export default ExportButton;

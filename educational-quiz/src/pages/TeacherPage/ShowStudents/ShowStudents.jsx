import React, { useEffect, useState } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import { Button, Dialog, TextField, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { connection } from '../../../connection'

const columns = [
    { field: 'name', headerName: 'Full name', width: 130 },
    { field: 'email', headerName: 'Email', width: 200 },
];



export default function ShowStudents() {
    const [tableData, setTableData] = useState([]);
    const [count, setCount] = useState(0);

    const getAllStudents = () => {
        const baseURL = connection.baseURL + 'student';

        const reqMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                setTableData(data.data)
            })
    }

    useEffect(() => {
        setCount(100)
        getAllStudents();
    }, [count]);

    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={tableData} columns={columns} pageSize={5} />
        </div>
    );
}
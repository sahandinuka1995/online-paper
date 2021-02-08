import React, { Component, useState, useEffect } from 'react'
import {
    Button, Grid, Paper, Typography, Fab, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Checkbox, List, ListItem,
    ListItemIcon, ListItemText, Toolbar, IconButton, Card, CardContent,
    FormControl, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core'
import { Add } from '@material-ui/icons';
import { connection } from '../../connection'
import CloseIcon from '@material-ui/icons/Close';
import { Link } from 'react-router-dom'
import StudentFullPaper from './StudentFullPaper/StudentFullPaper'

export default function StudentPaperList() {
    const [paperData, setPaperData] = useState([]);
    const [count, setCount] = useState(0);

    const getAllPapers = () => {
        const baseURL = connection.baseURL + 'paper';

        const reqMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                setPaperData(data.data)
            })
    }

    useEffect(() => {
        setCount(100)
        getAllPapers();
    }, [count]);

    return (
        <div style={styles.root}>
            <Grid container spacing={3}>
                {paperData.map(paper =>
                    <Grid item xs={4}>
                        <Paper style={styles.paper}>
                            <p style={styles.title}>
                                {paper.name}
                            </p>
                            <Typography style={styles.desc}>
                                No Of Questions : {paper.noofq}
                            </Typography>
                            <Typography style={styles.desc}>
                                Duration : {paper.duration} hours
                            </Typography>

                            <StudentFullPaper paperId={paper.pid} paperName={paper.name} />
                        </Paper>
                    </Grid>
                )}
            </Grid>
        </div>
    );
}

const styles = {
    root: {
        flexGrow: 1,
        padding:20
    },
    paper: {
        textAlign: 'center',
        padding: 20,
    },
    desc: {
        fontSize: 15
    },
    title: {
        marginBottom: 10,
        fontWeight: 'bold',
        fontSize: 20
    },
    btnSee: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
}
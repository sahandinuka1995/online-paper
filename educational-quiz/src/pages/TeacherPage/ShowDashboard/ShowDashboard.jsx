import React, { useEffect, useState } from 'react'
import { Paper, Avatar } from '@material-ui/core'
import { DeveloperBoard, Assessment, SupervisedUserCircle, CardGiftcard, ExpandLess, ExpandMore } from '@material-ui/icons';
import { Doughnut, Line } from 'react-chartjs-2'
import { connection } from '../../../connection'

const data = {
    labels: [
        'Papers',
        'Completed',
        'All'
    ],
    datasets: [{
        data: [300, 50, 100],
        backgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ],
        hoverBackgroundColor: [
            '#FF6384',
            '#36A2EB',
            '#FFCE56'
        ]
    }]
};

function Dashboard() {
    const [count, setCount] = useState(0);
    const [cards, setCards] = useState({
        allPapers: 0,
        allStudents: 0
    })

    const getCardData = () => {
        const baseURL = connection.baseURL + 'dashboard/topcard';

        const reqMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                setCards({
                    allPapers: data.data.allpapers,
                    allStudents: data.data.allStudents
                })
            })
    }

    useEffect(() => {
        getCardData()
    }, [count]);

    return (
        <div className='container'>
            <div className='row'>
                <Paper elevation={3} className='col-sm' style={styles.card}>
                    <div className='row'>
                        <div className='col-6'>
                            <Avatar style={styles.icnOrder}><Assessment /></Avatar>
                        </div>
                        <div className='col-6'>
                            <span>Papers</span>
                            <h4>{cards.allPapers}</h4>
                        </div>
                    </div>
                    <div style={styles.cardDesc}>
                        <ExpandLess />
                        <span style={styles.cardPrecen}>10%</span>
                        <span style={styles.cardPrecen1}>Since last Month</span>
                    </div>
                </Paper>

                <Paper elevation={3} className='col-sm' style={styles.card}>
                    <div className='row'>
                        <div className='col-6'>
                            <Avatar style={styles.icnItem}><DeveloperBoard /></Avatar>
                        </div>
                        <div className='col-6'>
                            <span>Students</span>
                            <h4>{cards.allStudents}</h4>
                        </div>
                    </div>
                    <div style={styles.cardDesc}>
                        <ExpandMore />
                        <span style={styles.cardPrecenLow}>5%</span>
                        <span style={styles.cardPrecen1}>Since last second</span>
                    </div>
                </Paper>

                <Paper elevation={3} className='col-sm' style={styles.card}>
                    <div className='row'>
                        <div className='col-6'>
                            <Avatar style={styles.icnCustomer}><SupervisedUserCircle /></Avatar>
                        </div>
                        <div className='col-6'>
                            <span>Teachers</span>
                            <h4>1</h4>
                        </div>
                    </div>
                    <div style={styles.cardDesc}>
                        <ExpandLess />
                        <span style={styles.cardPrecen}>10%</span>
                        <span style={styles.cardPrecen1}>Since last second</span>
                    </div>
                </Paper>

                <Paper elevation={3} className='col-sm' style={styles.card}>
                    <div className='row'>
                        <div className='col-6'>
                            <Avatar style={styles.icnTotal}><CardGiftcard /></Avatar>
                        </div>
                        <div className='col-6'>
                            <span>Attendance</span>
                            <h4>13%</h4>
                        </div>
                    </div>
                    <div style={styles.cardDesc}>
                        <ExpandLess />
                        <span style={styles.cardPrecen}>43%</span>
                        <span style={styles.cardPrecen1}>Since last second</span>
                    </div>
                </Paper>
            </div>
            <div className='row'>
                <div className='col-sm'>
                    <Paper elevation={3} style={styles.cardMedium}>
                        <h5>Weekly Report</h5>
                        <Doughnut data={data} />
                    </Paper>
                </div>
                <div className='col-sm'>
                    <Paper elevation={3} style={styles.cardMedium}>
                        <h5>Daily Progress</h5>
                        <Line data={data} />
                    </Paper>
                </div>
            </div>
        </div>
    );
}

const styles = {
    card: {
        margin: 5,
        borderRadius: 10,
        padding: 20
    },
    icnOrder: {
        backgroundColor: '#F23A62'
    },
    icnItem: {
        backgroundColor: '#FD563F'
    },
    icnCustomer: {
        backgroundColor: '#51A260'
    },
    icnTotal: {
        backgroundColor: '#1E76ED'
    },
    cardPrecen: {
        fontSize: 10,
        color: 'green'
    },
    cardPrecen1: {
        fontSize: 10,
        marginLeft: 5
    },
    cardPrecenLow: {
        color: 'red',
        fontSize: 10
    },
    cardMedium: {
        padding: 15,
        borderRadius: 10,
        marginTop: 20
    },
    cardDesc: {
        textAlign: 'center'
    }
}

export default Dashboard;
import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar } from '@material-ui/core';
import { Tabs, Tab, Typography, Box, Button } from '@material-ui/core';
import ShowStudents from './ShowStudents/ShowStudents'
import ShowPapers from './ShowPapers/ShowPapers'
import ShowDashboard from './ShowDashboard/ShowDashboard'
import { Link } from 'react-router-dom';
import { Dashboard } from '@material-ui/icons'

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        height: '100vh'
    },
}));

export default function SimpleTabs() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Teacher Dashboard
                    </Typography>

                    <Link to="/" style={{ position: 'absolute', right: 30 }}>
                        <Button variant="contained" >Back</Button>
                    </Link>
                </Toolbar>
            </AppBar>

            <AppBar position="static">
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab label="Dashboard" {...a11yProps(0)} />
                    <Tab label="Students" {...a11yProps(1)} />
                    <Tab label="Papers" {...a11yProps(2)} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
                <ShowDashboard />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <ShowStudents />
            </TabPanel>
            <TabPanel value={value} index={2}>
                <ShowPapers />
            </TabPanel>
        </div>
    );
}
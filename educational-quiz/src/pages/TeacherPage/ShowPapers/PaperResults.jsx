import React, { useEffect, useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import {
    Button, Dialog, DialogActions, DialogContent,
    DialogTitle, Slide, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper
} from '@material-ui/core';
import {connection} from '../../../connection'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
    table: {
        minWidth: 500,
    },
});

export default function PaperResults(props) {
    const [count, setCount] = useState(0);
    const [result, setResult] = useState([]);

    useEffect(() => {
        getMarks()
    }, [count])

    const getMarks = () => {
        const baseURL = connection.baseURL + 'student/' + props.paperId;

        const reqMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                setResult(data.data)
            })
    }

    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button style={styles.btnSee} variant="contained" onClick={handleClickOpen}>
                View Results
      </Button>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={handleClose}
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle id="alert-dialog-slide-title">Results of {props.paperName}</DialogTitle>
                <DialogContent>

                    <TableContainer component={Paper}>
                        <Table className={classes.table} aria-label="customized table">
                            <TableHead>
                                <TableRow>
                                    <StyledTableCell>Student Name</StyledTableCell>
                                    <StyledTableCell align="right">Email</StyledTableCell>
                                    <StyledTableCell align="right">Marks</StyledTableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {result.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell component="th" scope="row">
                                            {row.name}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{row.email}</StyledTableCell>
                                        <StyledTableCell align="right">{row.studentmark}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const styles = {
    btnSee: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
}
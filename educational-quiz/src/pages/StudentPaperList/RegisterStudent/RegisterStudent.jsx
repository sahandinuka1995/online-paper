import React, { useState } from 'react';
import { DialogContent, DialogActions, Button, TextField, Dialog, DialogTitle, DialogContentText } from '@material-ui/core';
import { connection } from '../../../connection'

export default function RegisterStudent(props) {
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    function checkSaveStudentFields() {
        if (email !== '') {
            if (name !== '') {
                return true
            }
        }
    }

    const saveStudent = () => {
        if (checkSaveStudentFields()) {
            const baseURL = connection.baseURL + 'student';
            const data = {
                email: email,
                name: name
            };

            const reqMetadata = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            };

            fetch(baseURL, reqMetadata)
                .then(res => res.json())
                .then(data => {
                    if (data.message === "Success") {
                        saveAnswers()
                    }
                })
        }
    }

    const [openn, setOpenn] = React.useState(false);

    const handleClickOpenn = () => {
        setOpenn(true);
    };

    const handleClosen = () => {
        setOpenn(false);
    };

    const saveAnswers = () => {
        const baseURL = connection.baseURL + 'student/answers';
        const data = {
            email: email,
            pid: props.paperId[0].paper.pid,
            answers: props.answers
        };

        const reqMetadata = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                if (data.message === "Success") {
                    handleClose()
                    props.closeMethod()
                } else if (data.data === "You already submitted this paper") {
                    setOpenn(true);
                }
            })
    }

    function gotoPapers() {
        props.closeMethod()
    }


    return (
        <div>
            <Button variant="contained" color="primary" onClick={handleClickOpen}>
                Submit
      </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Please enter your details"}</DialogTitle>
                <DialogContent>
                    <TextField
                        style={styles.txtBox}
                        id="email"
                        label="Email Address"
                        fullWidth
                        value={email}
                        onChange={e => setEmail(e.target.value)} />

                    <TextField
                        style={styles.txtBox}
                        id="name"
                        label="Full Name"
                        fullWidth
                        value={name}
                        onChange={e => setName(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={function () { saveStudent() }} color="primary" autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog
                open={openn}
                onClose={handleClosen}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"You already Submitted this paper"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Thank you for your attendance, your results will send you soon.
          </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={function () { gotoPapers() }} color="primary" autoFocus>
                        Ok
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

const styles = {
    txtBox:{
        marginBottom:10,
    }
}
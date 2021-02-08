import React, { Component, useState, useEffect } from 'react'
import {
    Button, Typography, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle,
    Checkbox, Card, CardContent,
    FormControl, FormControlLabel, Radio
} from '@material-ui/core'
import { connection } from '../../../connection'
import RegisterStudent from '../RegisterStudent/RegisterStudent'
import Timer from '../../Timer/Timer'

export default function StudentFullpaper(props) {
    const [open, setOpen] = React.useState(false);
    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpen = (scrollType) => () => {
        setOpen(true);
        setScroll(scrollType);
        getFullPaper(props.paperId)
    };

    const handleClose = () => {
        setOpen(false);
    };

    const descriptionElementRef = React.useRef(null);
    React.useEffect(() => {
        if (open) {
            const { current: descriptionElement } = descriptionElementRef;
            if (descriptionElement !== null) {
                descriptionElement.focus();
            }
        }
    }, [open]);

    const [paperQuestion, setPaperQuestion] = useState([]);

    const getFullPaper = (pid) => {
        const baseURL = connection.baseURL + 'paper/' + pid;

        const reqMetadata = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        };

        fetch(baseURL, reqMetadata)
            .then(res => res.json())
            .then(data => {
                setPaperQuestion(data.data.listOfQuestionsAndAnswers)
            })
    }

    const [state, setState] = React.useState([]);
    const resultArray = [];

    const handleChange = (event, pid, qid, aid) => {
        //console.log(event.target.name + " " + event.target.checked)
        //setState({ ...state, [event.target.name]: event.target.checked });

        let found = false;

        if (event.target.checked) {
            if (resultArray.length <= 0) {
                resultArray.push({
                    qid: qid,
                    aid: aid
                })

                return
            }
            for (let i of resultArray) {
                if (i.qid === qid) {
                    i.aid = aid
                    found = true
                }

            }
            if (!found) {
                resultArray.push({
                    qid: qid,
                    aid: aid
                })
            }
        }
    };

    return (
        <>
            <Button onClick={handleClickOpen('paper')} variant="contained" color="primary" style={styles.btnSee}>
                Start Paper
            </Button>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
                fullScreen
            >
                <DialogTitle id="scroll-dialog-title">{props.paperName}</DialogTitle>
                <div style={{position: 'absolute', right:10, padding:5, textAlign:'center'}}>
                    Remaining Time <Timer initialMinute={60} initialSeconds={0} />
                </div>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >

                        {paperQuestion.map((item, index) =>
                            <Card>
                                <CardContent>
                                    <Typography>
                                        {item.ques}
                                    </Typography>

                                    <CardContent>
                                        <FormControl component="fieldset">
                                            {item.answers.map((itm, i) =>
                                                <FormControlLabel
                                                    control={<Checkbox onChange={e => handleChange(e, item.paper.pid, item.qid, itm.aid)} name="answers" />}
                                                    label={itm.answer}
                                                />
                                            )}
                                        </FormControl>
                                    </CardContent>
                                </CardContent>
                            </Card>
                        )}


                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Leave
                    </Button>

                    <RegisterStudent closeMethod={handleClose} paperId={paperQuestion} answers={resultArray} />
                </DialogActions>
            </Dialog>
        </>
    )
}

const styles = {
    btnSee: {
        marginTop: 20,
        marginLeft: 5,
        marginRight: 5
    },
}
import React, { Component, useState, useEffect } from 'react'
import {
    Button, Grid, Paper, Typography, Fab, TextField, Dialog, DialogActions,
    DialogContent, DialogContentText, DialogTitle, Checkbox, List, ListItem,
    ListItemIcon, Toolbar, IconButton, AppBar, Slide,
    Card, CardContent, ListItemText, Badge
} from '@material-ui/core'
import { Add, LineStyle } from '@material-ui/icons';
import { connection } from '../../../connection'
import CloseIcon from '@material-ui/icons/Close';
import PaperResults from './PaperResults'

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ShowPapers() {
    const [open, setOpen] = React.useState(false);
    const [count, setCount] = useState(0);
    const [paperData, setPaperData] = useState([]);

    const [openq, setOpenq] = React.useState(false);

    const handleClickOpenq = () => {
        setOpenq(true);
    };

    const handleCloseq = () => {
        setOpenq(false);
    };


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

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

    ///////////////////////////////////////////////////////
    const [pName, setPname] = useState('');
    const [pDuration, setPduration] = useState('');
    const [pQuestion, setPquestion] = useState('');

    const [paperId, setPaperId] = useState(0);
    const [paperName, setPaperName] = useState('');

    const [noofq, setNoofq] = useState(0);
    const [noofq1, setNoofq1] = useState([]);

    const [checked, setChecked] = React.useState([0]);

    const b = [];

    const [iQues, setIQues] = useState('');
    const [iQuesNo, setIQuesNo] = useState('');

    const [iAns1, setIans1] = useState('');
    const [iAns2, setIans2] = useState('');
    const [iAns3, setIans3] = useState('');
    const [iAns4, setIans4] = useState('');
    const [iAns5, setIans5] = useState('');

    const [icAns1, setIcans1] = useState(false);
    const [icAns2, setIcans2] = useState(false);
    const [icAns3, setIcans3] = useState(false);
    const [icAns4, setIcans4] = useState(false);
    const [icAns5, setIcans5] = useState(false);

    const [paperQuestion, setPaperQuestion] = useState([]);

    function checkSavePaperFields() {
        if (pName !== '') {
            if (pDuration !== '') {
                if (pQuestion !== '') {
                    return true;
                }
            }
        }
    }

    const savePaper = () => {
        if (checkSavePaperFields()) {
            const baseURL = connection.baseURL + 'paper';
            const data = {
                name: pName,
                duration: pDuration,
                noofq: pQuestion
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
                        handleClose();
                        setPname('')
                        setPduration('')
                        setPquestion('')
                        getAllPapers();
                    }
                })
        }
    }

    function a(id, q) {
        setPaperId(id)
        setNoofq(q)

        for (let index = 0; index < q; index++) {
            b.push(index)
        }
        setNoofq1(b)

        handleClickOpenq()
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    function checkSaveQuestionFields() {
        if (iQuesNo !== '') {
            if (iQues !== '') {
                if (iAns1 !== '') {
                    if (iAns2 !== '') {
                        if (iAns3 !== '') {
                            if (iAns4 !== '') {
                                if (iAns5 !== '') {
                                    return true;
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    const saveQuestion = () => {
        if (checkSaveQuestionFields()) {
            const baseURL = connection.baseURL + 'paper/question';
            const data = {
                qid: paperId + iQuesNo,
                ques: iQues,
                paper: {
                    pid: paperId
                }
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
                        saveAnswer()
                    }
                })
        }
    }

    const saveAnswer = () => {
        const baseURL = connection.baseURL + 'paper/answer';
        const data = [{
            answer: iAns1,
            canswer: icAns1,
            question: {
                qid: paperId + iQuesNo
            }
        },
        {
            answer: iAns2,
            canswer: icAns2,
            question: {
                qid: paperId + iQuesNo
            }
        },
        {
            answer: iAns3,
            canswer: icAns3,
            question: {
                qid: paperId + iQuesNo
            }
        },
        {
            answer: iAns4,
            canswer: icAns4,
            question: {
                qid: paperId + iQuesNo
            }
        },
        {
            answer: iAns5,
            canswer: icAns5,
            question: {
                qid: paperId + iQuesNo
            }
        }];

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
                    setIQuesNo('')
                    setIQues('')
                    setIans1('')
                    setIans2('')
                    setIans3('')
                    setIans4('')
                    setIans5('')

                    setIcans1(false)
                    setIcans2(false)
                    setIcans3(false)
                    setIcans4(false)
                    setIcans5(false)

                    setNoofq(noofq - 1)

                    if (noofq === 1) {
                        handleCloseq()
                    }
                }
            })
    }

    const viewPaper = (pid, pname) => {
        handleClickOpenPaper()
        setPaperId(pid);
        setPaperName(pname);
        getFullPaper(pid)
    }

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

    const [openFullPaper, setOpenFullPaper] = React.useState(false);

    const [scroll, setScroll] = React.useState('paper');

    const handleClickOpenPaper = (scrollType) => {
        setOpenFullPaper(true);
        setScroll(scrollType);
    };

    const handleClosePaper = () => {
        setOpenFullPaper(false);
    };

    const toggleCheckbox1 = () => {
        if (icAns1 === false) {
            setIcans1(true)
        } else {
            setIcans1(false)
        }
    }

    const toggleCheckbox2 = () => {
        if (icAns2 === false) {
            setIcans2(true)
        } else {
            setIcans2(false)
        }
    }

    const toggleCheckbox3 = () => {
        if (icAns3 === false) {
            setIcans3(true)
        } else {
            setIcans3(false)
        }
    }

    const toggleCheckbox4 = () => {
        if (icAns4 === false) {
            setIcans4(true)
        } else {
            setIcans4(false)
        }
    }

    const toggleCheckbox5 = () => {
        if (icAns5 === false) {
            setIcans5(true)
        } else {
            setIcans5(false)
        }
    }

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

                            <Button variant="contained" color="primary" style={styles.btnSee} onClick={function () { viewPaper(paper.pid, paper.name) }}>
                                View Paper
                            </Button>

                            <Button variant="contained" color="secondary" style={styles.btnSee} onClick={function () { a(paper.pid, paper.noofq) }}>
                                Add Questions
                            </Button>

                            <PaperResults paperId={paper.pid} paperName={paper.name} />
                        </Paper>
                    </Grid>
                )}

            </Grid>

            <Fab color="primary" aria-label="add" style={styles.fab} onClick={handleClickOpen}>
                <Add />
            </Fab>

            <Dialog maxWidth="xs" fullWidth={false} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title"><LineStyle /> Add New Paper</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To add new paper, please fill all details
                    </DialogContentText>

                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Paper Name"
                        type="text"
                        fullWidth
                        value={pName}
                        onChange={event => setPname(event.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="name"
                        label="Duration (hours)"
                        type="number"
                        fullWidth
                        value={pDuration}
                        onChange={event => setPduration(event.target.value)}
                    />

                    <TextField
                        margin="dense"
                        id="name"
                        label="No Of Questions"
                        type="number"
                        fullWidth
                        value={pQuestion}
                        onChange={event => setPquestion(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={() => savePaper()} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ////////////////////////////////////////////////// */}

            <Dialog
                open={openq}
                onClose={handleCloseq}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth="xs"
                fullWidth={true}
            >
                <DialogTitle id="alert-dialog-title">Add questions for paper id {paperId}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        You have to add
                        <Badge style={styles.qBadge} badgeContent={noofq} color="primary">
                        </Badge> questions for this paper
                    </DialogContentText>

                    <List>
                        <TextField
                            autoFocus
                            style={{ width: 50, marginRight: 10 }}
                            label={"No"}
                            type="number"
                            value={iQuesNo}
                            onChange={event => setIQuesNo(event.target.value)}
                        />
                        <TextField
                            label={"Question"}
                            type="text"
                            value={iQues}
                            onChange={event => setIQues(event.target.value)}
                        />
                        <ListItem style={{ marginTop: 20 }}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={icAns1}
                                    onClick={() => toggleCheckbox1()}
                                />
                            </ListItemIcon>
                            <TextField
                                label="Answer 1"
                                type="text"
                                value={iAns1}
                                onChange={event => setIans1(event.target.value)}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={icAns2}
                                    onClick={() => toggleCheckbox2()}
                                />
                            </ListItemIcon>
                            <TextField
                                label="Answer 2"
                                type="text"
                                value={iAns2}
                                onChange={event => setIans2(event.target.value)}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={icAns3}
                                    onClick={() => toggleCheckbox3()}
                                />
                            </ListItemIcon>
                            <TextField
                                label="Answer 3"
                                type="text"
                                value={iAns3}
                                onChange={event => setIans3(event.target.value)}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={icAns4}
                                    onClick={() => toggleCheckbox4()}
                                />
                            </ListItemIcon>
                            <TextField
                                label="Answer 4"
                                type="text"
                                value={iAns4}
                                onChange={event => setIans4(event.target.value)}
                            />
                        </ListItem>

                        <ListItem>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={icAns5}
                                    onClick={() => toggleCheckbox5()}
                                />
                            </ListItemIcon>
                            <TextField
                                label="Answer 5"
                                type="text"
                                value={iAns5}
                                onChange={event => setIans5(event.target.value)}
                            />
                        </ListItem>
                    </List>

                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseq} color="primary">
                        Cancel
                    </Button>
                    <Button variant="contained" onClick={function () { saveQuestion() }} color="primary">
                        Save
                    </Button>
                </DialogActions>
            </Dialog>

            {/* ////////////////////////////////////////////////////// */}

            <Dialog scroll={scroll} fullScreen open={openFullPaper} onClose={handleClosePaper} TransitionComponent={Transition}>
                <AppBar>
                    <Toolbar>
                        <IconButton edge="start" color="inherit" onClick={handleClosePaper} aria-label="close">
                            <CloseIcon />
                        </IconButton>
                        <Typography variant="h6">
                            View Paper {paperName}
                        </Typography>
                    </Toolbar>
                </AppBar>

                <Card style={styles.paperHeader}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {paperName}
                        </Typography>
                        <Typography style={styles.pos} color="textSecondary">
                            Duration 2 hours
                            </Typography>
                        <Typography variant="body2" component="p">
                            No of Questions 10
                            </Typography>
                    </CardContent>
                </Card>
                <hr />

                <div>
                    {
                        paperQuestion.map(itm =>
                            <div style={styles.ques}>
                                <h5>{itm.ques}</h5>
                                <ol>
                                    {itm.answers.map(subitm =>
                                        <li>{subitm.canswer === 'true' ? <b><u>{subitm.answer}</u></b> : <span>{subitm.answer}</span>}</li>
                                    )}
                                </ol>
                            </div>
                        )
                    }
                </div>

            </Dialog>
        </div>
    );
}

const styles = {
    root: {
        flexGrow: 1
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
    fab: {
        position: 'fixed',
        right: 50,
        bottom: 50
    },
    pos: {
        marginBottom: 12,
    },
    paperHeader: {
        marginTop: 70,
        textAlign: 'center'
    },
    questionCard: {
        marginBottom: 50
    },
    ques: {
        marginLeft: 20,
        marginBottom: 20
    },
    ans: {
        marginLeft: 30
    },
    qBadge: {
        marginLeft: 20,
        marginRight: 20
    }
}
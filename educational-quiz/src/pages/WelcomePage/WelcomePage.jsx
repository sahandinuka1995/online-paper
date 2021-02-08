import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import HeaderImage from '../../assets/header.jpg'
import BackgroundImage from '../../assets/background.jpg'
import { Brightness1 } from '@material-ui/icons';

const useStyles = makeStyles({
    root: {
        maxWidth: 500,
        marginTop: '8%',
        textAlign: 'center',
        marginLeft: 20,
        marginRight: 20
    },
    media: {
        height: 200
    },
    btnSection: {
        padding: 20,
        justifyContent: 'center'
    },
    link: {
        textDecoration: 'none'
    },
    body: {
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(https://png.pngtree.com/thumb_back/fw800/background/20200907/pngtree-graduation-cap-school-supplies-blackboard-education-background-image_397993.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    }
});

export default function WelcomePage() {
    const classes = useStyles();

    return (
        <div className={classes.body}>
            <Grid container direction="column" justify="center" alignItems="center">
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                            className={classes.media}
                            image={HeaderImage}
                            title="Educational Paper" />

                        <CardContent>
                            <Typography gutterBottom variant="h5" component="h5">
                                Welcome to Quiz
                    </Typography>

                            <Typography variant="body2" color="textSecondary" component="p">
                            Keeping yourself entertained and educated is just a quiz away. 
                            Whether you want to have some fun or learn about a specific topic, 
                            quizzes are an excellent source of knowledge and entertainment. 
                            Browse through some of the most popular quizzes curated to learn 
                            while having fun!
                    </Typography>
                        </CardContent>
                    </CardActionArea>

                    <CardActions className={classes.btnSection}>

                        <Link to="/student" className={classes.link}>
                            <Button variant="contained" color="primary">I'm a Student</Button>
                        </Link>

                        <Link to="/teacher" className={classes.link}>
                            <Button variant="contained" color="secondary">I'm a Teacher</Button>
                        </Link>
                    </CardActions>
                </Card>
            </Grid>
        </div>
    );
}
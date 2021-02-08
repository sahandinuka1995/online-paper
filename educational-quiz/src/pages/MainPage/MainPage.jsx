import { makeStyles, Card, CardActionArea, CardMedia, CardContent, Typography, CardActions, Button, Grid } from '@material-ui/core';
import HeaderImage from '../../assets/header.jpg'
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom'
import StudentPage from '../StudentPage/StudentPage'
import TeacherPage from '../TeacherPage/TeacherPage'
import WelcomePage from '../WelcomePage/WelcomePage'

export default function MainPage() {

    return (
        <BrowserRouter>


            <Switch>
                <Route path="/student">
                    <StudentPage />
                </Route>

                <Route path="/teacher">
                    <TeacherPage />
                </Route>

                <Route path="/">
                    <WelcomePage />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}
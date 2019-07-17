import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import DebtList from './components/debts/DebtList';
import Dashboard from "./components/dashboard/Dashboard";
import PersonList from "./components/persons/PersonList";
import PersonCreate from "./components/persons/PersonCreate";
import DebtCreate from "./components/debts/DebtCreate";
import SignInForm from "./components/auth/SignIn";
import SignUpForm from "./components/auth/SignUp";
import Logout from "./components/auth/Logout";
import {PrivateRouter, NonPrivateRouter} from "./CustomRouters";
import {useDispatch, useSelector} from "react-redux";
import * as types from "./store/sagas/auth/ActionTypes";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";


const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(4),
    },
}));

const App = () => {
    const authChecked = useSelector(state=> state.auth.authChecked);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: types.IS_AUTHENTICATED_REQUEST});
    }, []);


    const classes = useStyles();
    if (!authChecked) {
        return  <CircularProgress className={classes.progress} root={classes.progress}/>;
    } else {
        return (
            <BrowserRouter>
                <AppBar color="primary" position="static">
                    <Toolbar>
                        <TypoGraphy variant="h5" color="inherit">
                            Debts Manager
                        </TypoGraphy>
                        <Navbar/>
                    </Toolbar>
                </AppBar>
                <Switch>
                    <NonPrivateRouter exact path="/signIn" component={SignInForm}/>
                    <NonPrivateRouter exact path="/signUp" component={SignUpForm}/>
                    <PrivateRouter exact path="/" component={Dashboard}/>
                    <PrivateRouter exact path="/debts" component={DebtList}/>
                    <PrivateRouter exact path="/persons" component={PersonList}/>
                    <PrivateRouter exact path="/persons/create" component={PersonCreate}/>
                    <PrivateRouter exact path="/persons/edit/:id" component={PersonCreate}/>
                    <PrivateRouter exact path="/debts/create" component={DebtCreate}/>
                    <PrivateRouter exact path="/debts/edit/:id" component={DebtCreate}/>
                    <PrivateRouter exact path="/logout" component={Logout}/>
                </Switch>
            </BrowserRouter>
        );
    }
};

export default App;

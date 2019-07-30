import React, {useEffect} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar'
import TypoGraphy from '@material-ui/core/Typography'
import {useDispatch, useSelector} from "react-redux";
import * as types from "./store/sagas/auth/ActionTypes";
import CircularProgress from "@material-ui/core/CircularProgress";
import makeStyles from "@material-ui/core/styles/makeStyles";
import AppRouter from "./components/AppRouter";


const useStyles = makeStyles(theme => ({
    progress: {
        margin: theme.spacing(4),
        position: 'absolute',
        left: '50%',
        top: '40%',
        marginRight: 20
    },
}));

const App = () => {
    const authChecked = useSelector(state=> state.auth.authChecked);
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch({type: types.IS_AUTHENTICATED_REQUEST});
    }, [dispatch]);


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
                <AppRouter/>
            </BrowserRouter>
        );
    }
};

export default App;

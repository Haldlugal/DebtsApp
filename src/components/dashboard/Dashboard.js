import React, {useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import * as types from "../../store/sagas/debts/ActionTypes";
import {useDispatch, useSelector} from "react-redux";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles(theme => ({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20
    },
    dashboardContainer: {
        marginLeft:30
    },
    progress: {
        margin: theme.spacing(4),
        position: 'absolute',
        left: '50%',
        top: '40%',
        marginRight: 20
    },
    error: {
        marginLeft: 40,
        marginTop: 40,
        padding: 20,
        width: 400,
        border: '1px solid red'
    }
}));
const Dashboard = () =>  {
    const dispatch = useDispatch();
    const myDebts = useSelector((state)=>state.debts.myDebts);
    const fetching = useSelector(state => state.debts.fetching);
    const theirDebts = useSelector((state)=>state.debts.theirDebts);
    const error = useSelector(state=>state.debts.error);

    useEffect( () => {
        dispatch({type: types.GET_STATISTICS_REQUEST});
    }, [dispatch]);

    const classes= useStyles();
    if (fetching) {
        return (<CircularProgress size={40} className={classes.progress}/>);
    } else if (error) {
        return <div className={classes.error}>{error}</div>
    }
    else return (
    <Container className={classes.dashboardContainer}>
        <Typography className={classes.title} >
            Statistics
        </Typography>
        <div>
            My debt: {myDebts?myDebts.rub*(-1)+" RUB":""}
            {myDebts?myDebts.eur*(-1)!==0?" / "+myDebts.eur*(-1) +" EUR":"" :""}
            {myDebts?myDebts.usd*(-1)!==0?" / "+myDebts.usd*(-1) +" DOL":"" :""}

        </div>
        <div>
            Their debt: {theirDebts?theirDebts.rub+"RUB":""}
            {theirDebts?theirDebts.eur*1!==0?" / "+theirDebts.eur*1+" EUR":"":""}
            {theirDebts?theirDebts.usd*1!==0?" / "+theirDebts.usd*1+" DOL":"":""}
        </div>
    </Container>
    )
};

export default Dashboard;
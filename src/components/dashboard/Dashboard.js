import React, {useEffect} from 'react';
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";
import {Container} from "@material-ui/core";
import * as types from "../../store/sagas/debts/ActionTypes";
import {useDispatch, useSelector} from "react-redux";


const useStyles = makeStyles({
    title: {
        fontSize: 28,
        marginTop: 20,
        marginBottom:20
    },
    dashboardContainer: {
        marginLeft:30
    }
});
const Dashboard = () =>  {
    const dispatch = useDispatch();
    const myDebts = useSelector((state)=>state.debts.myDebts);
    const theirDebts = useSelector((state)=>state.debts.theirDebts);

    useEffect( () => {
        dispatch({type: types.GET_STATISTICS_REQUEST});
    }, []);

    const classes= useStyles();
    return (
    <Container className={classes.dashboardContainer}>
        <Typography className={classes.title} >
            Statistics
        </Typography>
        <div>
            My debt: {myDebts?myDebts.rub*(-1)+" RUB / ":""}
            {myDebts?myDebts.eur*(-1)+" EUR / ":""}
            {myDebts?myDebts.usd*(-1)+" DOL / ":""}
        </div>
        <div>
            Their debt: {theirDebts?theirDebts.rub*(-1)+" RUB / ":""}
            {theirDebts?theirDebts.eur*(-1)+" EUR / ":""}
            {theirDebts?theirDebts.usd*(-1)+" DOL / ":""}
        </div>
    </Container>
    )
};

export default Dashboard;
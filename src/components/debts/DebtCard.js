import React from 'react';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {NavLink} from "react-router-dom";
import red from '@material-ui/core/colors/red';
import moment from "moment";

const useStyles = makeStyles(theme => ({
    paper: {
        padding: theme.spacing(2),
        margin: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        marginTop:theme.spacing(2)

    },
    money: {
        display: 'flex',
        alignItems: 'center'
    },
    deadlineAlert: {
        color: red[500]
    }
}));

const DebtCard = (props) => {

    const dateCreated = new Date(props.debt.field_creation_date);
    const dateCreatedFormatted = dateCreated.getDate() + "/" + (dateCreated.getMonth() + 1) + "/" + dateCreated.getFullYear();
    const paymentDate = new Date(props.debt.field_expiration_date);
    const paymentDateFormatted = paymentDate.getDate() + "/" + (paymentDate.getMonth() + 1) + "/" + paymentDate.getFullYear();

    const classes = useStyles();
    return(
        <NavLink to={"/debts/edit/"+props.debt.Nid}>
            <Paper className={classes.paper}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm container>
                        <Grid item xs container direction="column" spacing={2}>
                            <Grid item xs>
                                <Typography gutterBottom variant="subtitle1">
                                    {props.debt.Name}
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    Taken at: {dateCreatedFormatted}
                                </Typography>
                                <Typography variant="body2">
                                    <span
                                        className={(moment(props.debt.field_expiration_date) < moment())?classes.deadlineAlert:''}>
                                        Deadline: {paymentDateFormatted}
                                    </span>
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.money}>
                            <Typography variant="subtitle1"><span>{props.debt.Currency+" "}</span>{Math.abs(props.debt.Debt)}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Paper>
        </NavLink>
    )
}

export default DebtCard